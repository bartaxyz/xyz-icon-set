import BaseProcessor from './processors/base';
import SVGProcessor from './processors/svg';

const processorsMap: { [key: string]: BaseProcessor } = {
  svg: new SVGProcessor(),
};

const  processorsList: string[] = Object.keys(processorsMap);
processorsList.forEach((processorName: string) => (
    processorsMap[processorName].run()
));
