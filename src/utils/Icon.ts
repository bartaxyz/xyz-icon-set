export type IconTheme = 'regular' | 'thin';

export interface GetIconInput {
	source: string;
	category: string;
	theme: IconTheme;
	name: string;
}

export interface IconOptions {
	fillOpacity?: number;
}

export interface IconContstructorOptions {
	theme?: IconTheme;
}

export class Icon {
	name: string;
	category: string;
	theme: IconTheme;
	source: {
		[key: string]: string;
	};

	constructor({ theme }: IconContstructorOptions = {}) {
		this.theme = theme || 'regular';
	}

	toString({ fillOpacity = 0 }: IconOptions = {}): string {
		return this.source[this.theme].replace(
			/fill\-opacity\=\"0\.1\"/g,
			`fill-opacity="${fillOpacity}"`,
		);
	}

	toDocumentFragment({ fillOpacity }: IconOptions = {}): DocumentFragment {
		if (!document) {
			throw new Error(
				'Document object is not in your global scope. This method can be executed in browser only.',
			);
		}

		return document
			.createRange()
			.createContextualFragment(this.source[this.theme]);
	}
}
