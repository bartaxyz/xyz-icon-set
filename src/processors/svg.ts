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

		return svg.outerHTML
			.replace(/#(000|000000|333|333333|black)/g, primaryColor)
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

		// { iconName: { regular: Icon, thin: Icon} }

		const icons = iconsList.reduce((accumulator, icon) => {
			if (!accumulator[icon.name]) {
				accumulator[icon.name] = {
					[icon.theme]: icon,
				};
			} else {
				accumulator[icon.name][icon.theme] = icon;
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
				accumulator.push(icon.name);
			}

			return accumulator;
		}, []);

		const iconCategories = iconsList.reduce((accumulator, icon) => {
			if (accumulator.indexOf(icon.category) === -1) {
				accumulator.push(icon.category);
			}

			return accumulator;
		}, []);

		const templateVariables = {
			icons,
			iconsList,
			iconNames,
			iconCategories,
		};

		writeFileSync(
			'./dist/index.ts',
			compile(
				readFileSync('./src/templates/index.template', templateOptions),
			)(templateVariables),
		);
	}
}
