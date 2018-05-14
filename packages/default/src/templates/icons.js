const icons = {};

{{#icons}}
if (!icons['{{{name}}}']) {
    icons['{{{name}}}'] = {};
}
icons['{{{name}}}']['{{{theme}}}'] = {
    name: '{{{name}}}',
    source: '{{{source}}}',
    category: '{{{category}}}',
    theme: '{{{theme}}}',
};
{{/icons}}

module.exports.icons = icons;