import { iconDirectory } from '../config';
import { readdirSync, readFileSync } from 'fs';

export interface Icon {
	name: string;
	source: string;
	theme: string;
	category: string;
}

export default class BaseProcessor {
	iconDirectory: string;
	iconFileExtension: string;

	constructor() {
		this.iconDirectory = iconDirectory;
	}

	filterIconFilenames(filenames: string[]): string[] {
		return filenames.filter(
			(filename: string) => filename.indexOf('.') !== 0,
		);
	}

	getIconNames(): string[] {
		if (!this.iconDirectory) {
			throw new Error('Please implement `this.iconDirectory` property');
		}

		if (!this.iconFileExtension) {
			throw new Error(
				'Please implement `this.iconFileExtension` property',
			);
		}

		const filenames = readdirSync(this.iconDirectory);
		const iconFilenames: string[] = this.filterIconFilenames(filenames);

		return iconFilenames.map(filename =>
			filename.replace(new RegExp(`.${this.iconFileExtension}$`), ''),
		);
	}

	getIcons(): Icon[] {
		const iconNames: string[] = this.getIconNames();
		const icons: Icon[] = [];

		iconNames.forEach((iconName: string) => {
			const fileContent = readFileSync(
				`${this.iconDirectory}/${iconName}.${this.iconFileExtension}`,
				{
					encoding: 'utf-8',
				},
			);
			const iconNameChunks: string[] = iconName.split('.');
			const icon: Icon = {
				source: fileContent,
				category: iconNameChunks[0],
				theme: iconNameChunks[1],
				name: iconNameChunks[2],
			};
			icon.source = this.processIconContent(icon);
			icons.push(icon);
		});

		return icons;
	}

	processIconContent(icon: Icon) {
		return icon.source;
	}

	run() {
		throw new Error(
			'Please implement run() method as override of this one in your class',
		);
	}
}
