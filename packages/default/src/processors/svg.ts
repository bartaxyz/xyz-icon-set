import { writeFileSync } from 'fs';
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

    processIconContent(name: string, content: string) {
        return content
            .replace('width="100%" height="100%"', name.indexOf('.real.') === -1 ?'width="24px" height="24px"' : 'width="48px" height="48px"')
            .replace(/#(000|000000|333|333333)/g, primaryColor)
            .replace(/rgb\(51,51,51\)/g, primaryColor)
            .replace(/#(666|666666)/g, gradientColorPrimary)
            .replace(/#(fff|FFF|ffffff|FFFFFF)/g, gradientColorSecondary)
            .replace(/id="/g, `id="file:${name}_id:`)
            .replace(/url\(\#/g, `url(#file:${name}_id:`);
    }

    wrapIcon(icon) {}

    run() {
        const icons: Icon[] = this.getIcons();
        console.log(icons[5]);
        const regularIconNames: string[] = this.getIconNames().filter(name => name.indexOf('.regular.') !== -1);
        const thinIconNames: string[] = this.getIconNames().filter(name => name.indexOf('.thin.') !== -1);

        const regularIcons: Icon[] = [];
        const thinIcons: Icon[] = [];

        // icons.filter()

        // writeFileSync('./icons.js', regularIcons[0]);
        // TODO: typings
        // writeFileSync() 
    }
};
