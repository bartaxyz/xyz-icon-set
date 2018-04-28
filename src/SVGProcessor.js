import fs from 'fs';
import config from './config';
import BaseProcessor from './BaseProcessor';

const primaryColor = '#1d4477'; // '#333333';
const gradientColorPrimary = '#00adef'; // '#CCCCCC';
const gradientColorSecondary = '#00adef'; // '#EEEEEE';

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
        console.log(names, contents);
        const styles = `<html><head><title>Test Output</title><meta name="viewport" content="width=device-width, initial-scale=1"></head><style>
        body {
            margin: auto;
            padding: 32px;
            display: flex;
            flex-wrap: wrap;
            max-width: 1100px;
            background: whitesmoke;
        }
        * {
            box-sizing: border-box;
        }
        hr {
            border: none;
            height: 1px;
            background: ${primaryColor};
            margin: 16px 0;
        }
        .box {
            width: 33%;
            padding: 16px;
        }
        .icon {
            display: block;
            background: white;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            padding: 16px;
            font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
        .icon svg {
            margin-right: 16px;
            vertical-align: -6px;
        }
        .icon * {
            vertical-align: middle;
        }
        </style>`;
        let concatenatedContents = '';

        const wrapSVG = (svg, name) => {
            const startTag = '<div class="box"><div class="icon">';
            const endTag = `${name}</div></div>`;

            return startTag + svg.replace('<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">', '') + endTag;
        };

        for (let i = 0; i < contents.length; ++i) {
            if (names[i].indexOf('.regular.') === -1) {
                continue;
            }
            concatenatedContents += wrapSVG(contents[i], names[i]);
        }

        concatenatedContents += `<hr />`;

        for (let i = 0; i < contents.length; ++i) {
            if (names[i].indexOf('.thin.') === -1) {
                continue;
            }
            concatenatedContents += wrapSVG(contents[i]);
        }

        concatenatedContents += `<hr />`;

        for (let i = 0; i < contents.length; ++i) {
            if (names[i].indexOf('.filled.') === -1) {
                continue;
            }
            concatenatedContents += wrapSVG(contents[i]);
        }

        concatenatedContents += `<hr />`;

        for (let i = 0; i < contents.length; ++i) {
            if (names[i].indexOf('.real.') === -1) {
                continue;
            }
            concatenatedContents += wrapSVG(contents[i]);
        }

        fs.writeFileSync('./dist/test_output.html', styles + concatenatedContents);
    }
};
