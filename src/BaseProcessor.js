import config from './config';
import fs from 'fs';

export class IconConfig {};

export default class BaseProcessor {
    constructor() {
        this.iconDirectory = null;
        this.iconFileExtension = null;
    }

    getIconNames() {
        if (!this.iconDirectory) {
            throw new Error('Please implement `this.iconDirectory` property');
        }

        if (!this.iconFileExtension) {
            throw new Error('Please implement `this.iconFileExtension` property');
        }

        const iconFiles = fs.readdirSync(this.iconDirectory);

        return iconFiles.map((filename) => {
            return filename.replace(new RegExp(`.${this.iconFileExtension}$`), '');
        });
    }

    getIconContents() {
        const iconFiles = this.getIconNames();
        const icons = [];

        iconFiles.forEach((iconFile) => {
            if (iconFile.indexOf('.') === 0) {
                return false;
            }

            const fileContent = fs.readFileSync(`${this.iconDirectory}/${iconFile}.${this.iconFileExtension}`, { encoding: 'utf-8' });

            icons.push(this.processIconContent(iconFile, fileContent));
        });

        return icons;
    }

    processIconContent(fileName, fileContent) {
        return fileContent;
    }

    run() {
        throw new Error('Please implement run() method as override of this one in your class');
    }
};
