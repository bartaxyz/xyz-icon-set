import SVGProcessor from './processors/svg';

const processorsMap = {
    svg: new SVGProcessor(),
};

const processorsList: string[] = Object.keys(processorsMap);

processorsList.forEach((processorName: string): void =>
    processorsMap[processorName].run()
);
