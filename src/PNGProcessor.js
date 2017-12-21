import config from './config';
import BaseProcessor from './BaseProcessor';
import fs from 'fs';

export default class PNGProcessor extends BaseProcessor {
    constructor() {
        super();
        this.iconDirectory = config.pngIconDirectory;
    }

    run() {
        // console.log(this.getIconFileNames());
    }
};
