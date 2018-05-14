import { readFileSync, writeFileSync } from 'fs';
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
            .replace(/#(000|000000|333|333333)/g, primaryColor)
            .replace(/rgb\(51,51,51\)/g, primaryColor)
            .replace(/#(666|666666)/g, gradientColorPrimary)
            .replace(/#(fff|FFF|ffffff|FFFFFF)/g, gradientColorSecondary)
            .replace(/id="/g, `id="file:${icon.category}.${icon.theme}.${icon.name}_id:`)
            .replace(/url\(\#/g, `url(#file:${icon.category}.${icon.theme}.${icon.name}_id:`)
            .replace(/\n/g, '');
    }

    run() {
        const icons: Icon[] = this.getIcons();
        
        const fileContent = readFileSync(`./src/templates/icons.js`, { encoding: 'utf-8' });
        writeFileSync('./dist/index.js', compile(fileContent)({ icons }));


        const typesFileContent = readFileSync(`./src/templates/icons.d.ts`, { encoding: 'utf-8' });
        writeFileSync('./dist/index.d.ts', compile(typesFileContent)({ icons }));

        // TODO: typescript typings
        // writeFileSync() 
    }
};
