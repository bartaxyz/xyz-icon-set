
import config from './config';
import fs from 'fs';

import PNGProcessor from './PNGProcessor';
import SVGProcessor from './SVGProcessor';

const getIconFiles = (type) => {};

const processorsMap = {
    svg: new SVGProcessor(),
    png: new PNGProcessor(),
};

const processorsList = Object.keys(processorsMap);

processorsList.forEach((processorName) => {
    processorsMap[processorName].run();
});
