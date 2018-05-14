type ThemeType = 'regular' | 'thin' | 'filled' | 'real';

declare interface IconInterface {
    name: string;
    source: string;
    category: 'basic' | 'object' | 'weather' | 'social' | 'ui';
    theme: ThemeType;
}

declare interface IconSetInterface {
    regular
}

declare namespace icons {
    {{#icons}}
}


