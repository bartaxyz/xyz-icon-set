import { iconDirectory } from '../config';
import { readdirSync, readFileSync } from 'fs';

export interface Icon {
    name: string;
    source: string;
}

export default class BaseProcessor {
    iconDirectory: string;
    iconFileExtension: string;

    constructor() {
        this.iconDirectory = iconDirectory;
    }

    filterIconFilenames(filenames: string[]): string[] {
        return filenames.filter((filename: string) =>
            filename.indexOf('.') !== 0
        );
    }

    getIconNames(): string[] {
        if (!this.iconDirectory) {
            throw new Error('Please implement `this.iconDirectory` property');
        }

        if (!this.iconFileExtension) {
            throw new Error('Please implement `this.iconFileExtension` property');
        }

        const filenames = readdirSync(this.iconDirectory);
        const iconFilenames: string[] = this.filterIconFilenames(filenames);

        return iconFilenames.map(filename =>
            filename.replace(new RegExp(`.${this.iconFileExtension}$`), '')
        );
    }

    getIconContents(): string[] {
        const iconFiles: string[] = this.getIconNames();
        const icons: string[] = [];

        iconFiles.forEach((iconFile: string) => {
            if (iconFile.indexOf('.') === 0) {
                return false;
            }

            const fileContent = readFileSync(`${this.iconDirectory}/${iconFile}.${this.iconFileExtension}`, { encoding: 'utf-8' });

            icons.push(this.processIconContent(iconFile, fileContent));
        });

        return icons;
    }

    getIcons(): Icon[] {
        const iconNames: string[] = this.getIconNames();
        const icons: Icon[] = [];

        iconNames.forEach((iconName: string) => {
            const fileContent = readFileSync(`${this.iconDirectory}/${iconName}.${this.iconFileExtension}`, {
                encoding: 'utf-8',
            });
            icons.push({
                name: iconName,
                source: this.processIconContent(iconName, fileContent),
            });
        });

        return icons;
    }

    processIconContent(fileName: string, fileContent: string) {
        return fileContent;
    }

    run() {
        throw new Error('Please implement run() method as override of this one in your class');
    }
};
