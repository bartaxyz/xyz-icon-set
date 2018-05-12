
export type IconTheme = 'regular' | 'thin';

export interface Icon {
    name: string;
    svg(options: {
        color: string,
        theme: IconTheme,
    }): string;
}

// example icon object
const ExampleIcon: Icon = {
    name: 'icon',
    svg({ color = '#000', theme = 'regular' }) {
        return `<svg />`;
    },
};

const icons: { [iconName: string]: Icon } = {
    ExampleIcon,
};

console.log(icons);

export default {
    ...icons,
}

