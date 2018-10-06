export type IconTheme = 'regular' | 'thin';

export interface IconOptions {
	fillOpacity?: number;
}

export interface IconContstructorOptions {
	theme?: IconTheme;
}

export class Icon {
	static category: string;
	theme: IconTheme;
	source: {
		[key: string]: string;
	};

	iconOptions: IconOptions;
	iconSVGElement: SVGElement;

	constructor({ theme }: IconContstructorOptions = {}) {
		this.theme = theme || 'regular';
	}

	toString({ fillOpacity = 0 }: IconOptions = {}): string {
		return this.source[this.theme].replace(
			/fill\-opacity\=\"0\.1\"/g,
			`fill-opacity="${fillOpacity}"`,
		);
	}

	toSVGElement(iconOptions?: IconOptions): SVGElement {
		if (!this.iconSVGElement) {
			let documentFragmentIcon: DocumentFragment;

			try {
				documentFragmentIcon = document
					.createRange()
					.createContextualFragment(this.source[this.theme]);
			} catch (e) {
				throw new Error(
					'Document object is not in your global scope. This method can be executed in browser only.',
				);
			}

			this.iconSVGElement = documentFragmentIcon.querySelector('svg');
		}

		this.setIconOptions(iconOptions);

		return this.iconSVGElement;
	}

	updateFillOpacity(newFillOpacity?: IconOptions['fillOpacity']) {
		if (!newFillOpacity) return;
		if (this.iconOptions.fillOpacity === newFillOpacity) return;

		this.iconOptions.fillOpacity = newFillOpacity;

		const backgroundElements = this.iconSVGElement.querySelectorAll(
			'[fill-opacity]',
		);

		for (let i = 0; i < backgroundElements.length; ++i) {
			backgroundElements[i].setAttribute(
				'fill-opacity',
				`${this.iconOptions.fillOpacity}`,
			);
		}
	}

	setIconOptions(iconOptions?: IconOptions): SVGElement {
		if (!this.iconSVGElement) return this.toSVGElement(iconOptions);
		if (!iconOptions) return this.iconSVGElement;

		this.updateFillOpacity(iconOptions.fillOpacity);

		return this.iconSVGElement;
	}
}
