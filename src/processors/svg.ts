import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { compile } from 'handlebars';
import { JSDOM } from 'jsdom';
import { iconDirectory } from '../config';
import BaseProcessor, { Icon } from './base';

const primaryColor = 'currentColor';
const gradientColorPrimary = 'gradientColorPrimary';
const gradientColorSecondary = 'gradientColorSecondary';

export default class SVGProcessor extends BaseProcessor {
	constructor() {
		super();
		this.iconDirectory = iconDirectory;
		this.iconFileExtension = 'svg';
	}

	processIconContent(icon: Icon) {
		const dom = new JSDOM(icon.source);
		const svg = dom.window.document.querySelector('svg');

		const size = icon.theme !== 'real' ? '24px' : '48px';

		svg.setAttribute('width', size);
		svg.setAttribute('height', size);
		svg.setAttribute('viewBox', '0 0 24 24');

		return svg.outerHTML
			.replace(/#(000000|000|333333|333)/g, primaryColor)
			.replace(/"black"/g, `"${primaryColor}"`)
			.replace(/rgb\(51,51,51\)/g, primaryColor)
			.replace(/#(666|666666)/g, gradientColorPrimary)
			.replace(/#(fff|FFF|ffffff|FFFFFF)/g, gradientColorSecondary)
			.replace(
				/id="/g,
				`id="file:${icon.category}.${icon.theme}.${icon.name}_id:`,
			)
			.replace(
				/url\(\#/g,
				`url(#file:${icon.category}.${icon.theme}.${icon.name}_id:`,
			)
			.replace(/\n/g, '');
	}

	run() {
		const iconsList: Icon[] = this.getIcons();

		const getIconComponentName = (icon: Icon) => {
			return (
				icon.name.charAt(0).toUpperCase() + icon.name.substr(1) + 'Icon'
			);
		};

		const icons = iconsList.reduce((accumulator, icon) => {
			const iconComponentName = getIconComponentName(icon);
			if (!accumulator[iconComponentName]) {
				accumulator[iconComponentName] = {
					[icon.theme]: icon,
				};
			} else {
				accumulator[iconComponentName][icon.theme] = icon;
			}

			return accumulator;
		}, {});

		if (!existsSync('./dist/icons')) {
			mkdirSync('./dist/icons');
		}

		this.getIcons().filter((icon: Icon) => {
			writeFileSync(
				`./dist/icons/${icon.category}.${icon.theme}.${icon.name}.ts`,
				`export default ${JSON.stringify(icon)};`,
			);
		});

		const templateOptions = {
			encoding: 'utf-8',
		};

		const iconNames = iconsList.reduce((accumulator, icon) => {
			if (accumulator.indexOf(icon.name) === -1) {
				accumulator.push(getIconComponentName(icon));
			}

			return accumulator;
		}, []);

		const iconCategories = iconsList.reduce((accumulator, icon) => {
			if (accumulator.indexOf(icon.category) === -1) {
				accumulator.push(icon.category);
			}

			return accumulator;
		}, []);

		const iconComponentNames = iconsList.reduce((accumulator, icon) => {
			const iconComponentName = getIconComponentName(icon);

			if (accumulator.indexOf(iconComponentName) === -1) {
				accumulator.push(iconComponentName);
			}

			return accumulator;
		}, []);

		const templateVariables = {
			icons,
			iconsList,
			iconNames,
			iconCategories,
			iconComponentNames,
		};

		writeFileSync(
			'./dist/index.ts',
			compile(
				readFileSync('./src/templates/index.template', templateOptions),
			)(templateVariables),
		);
	}
}
