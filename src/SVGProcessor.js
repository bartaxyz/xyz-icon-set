import fs from 'fs';
import config from './config';
import BaseProcessor from './BaseProcessor';

const primaryColor = '#33333';
const gradientColorPrimary = '#CCCCCC';
const gradientColorSecondary = '#EEEEEE';

export default class SVGProcessor extends BaseProcessor {
    constructor() {
        super();
        this.iconDirectory = config.svgIconDirectory;
        this.iconFileExtension = 'svg';
    }

    processIconContent(name, content) {
        return content
            .replace('width="100%" height="100%"', name.indexOf('.real.') === -1 ?'width="24px" height="24px"' : 'width="48px" height="48px"')
            .replace(/#(000|000000|333|333333)/g, primaryColor)
            .replace(/#(666|666666)/g, gradientColorPrimary)
            .replace(/#(fff|FFF|ffffff|FFFFFF)/g, gradientColorSecondary)
            .replace(/id="/g, `id="file:${name}_id:`)
            .replace(/url\(\#/g, `url(#file:${name}_id:`);
    }

    run() {
        const names = this.getIconNames();
        const contents = this.getIconContents();
        let concatenatedContents = '';

        for (let i = 0; i < contents.length; ++i) {
            if (names[i].indexOf('.regular.') === -1) {
                continue;
            }

            concatenatedContents += contents[i].replace('<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">', '');
        }

        concatenatedContents += `<hr style="border:none;height:1px;bacground:${primaryColor};margin:16px 0;" />`;

        for (let i = 0; i < contents.length; ++i) {
            if (names[i].indexOf('.thin.') === -1) {
                continue;
            }

            concatenatedContents += contents[i].replace('<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">', '');
        }

        concatenatedContents += `<hr style="border:none;height:1px;bacground:${primaryColor};margin:16px 0;" />`;

        for (let i = 0; i < contents.length; ++i) {
            if (names[i].indexOf('.real.') === -1) {
                continue;
            }

            concatenatedContents += contents[i].replace('<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">', '');
        }

        fs.writeFileSync('./lib/test_output.html', concatenatedContents);
    }
};
