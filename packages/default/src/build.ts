
import SVGProcessor from './processors/svg';
import BaseProcessor from './processors/base';

const processorsMap: { [key: string]: BaseProcessor } = {
  svg: new SVGProcessor(),
};

const  processorsList: string[] = Object.keys(processorsMap);
processorsList.forEach((processorName: string) => (
    processorsMap[processorName].run()
));
