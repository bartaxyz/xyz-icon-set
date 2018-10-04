Browser all icons at [XYZ Icon Set Website](https://ondrejbarta.xyz/xyz-icon-set).

It is recommended to use implementation packages for use with [Vue](https://github.com/bartaxyz/xyz-icon-set-vue) and [React](https://github.com/bartaxyz/xyz-icon-set-react). Alternatively check out project [wiki](https://github.com/bartaxyz/xyz-icon-set/wiki) for usage with vanilla JS.

## Usage

### Installation with NPM

```bash
npm install xyz-icon-set
```

### Icon API Reference

> Note: This reference tries to define the specs for v1. So far it is not completely done and is subject to change.

> Note: Examples are shown with ES6 syntax

You can import icons selectively by its name with suffix "Icon" (to prevent variable name collisions and misuse of keywords in cases such as `return` or `copy` icons).

Example of importing the paper plane icon object

```typescript
import { PaperPlaneIcon } from 'xyz-icon-set';
```

or import as default export

```typescript
import XYZIconSet from 'xyz-icon-set';

const { PaperPlaneIcon } = XYZIconSet;
```

### `.name`

Icon name in camel-case format.

```typescript
PaperPlaneIcon.name === 'PaperPlane';
```

### `.category`

Semantic category of the icon. Used mostly for showcase purposes.

```typescript
PaperPlaneIcon.category === 'social';
```

### `.toSVG(options)`

Returns SVG string representation of the icon.

#### Parameters

`options`

Object describing visuals of the icon.

- `theme`

  Theme is either `regular` or `thin`. For icon visual reference, visit [XYZ Icon Set Website](https://ondrejbarta.xyz/xyz-icon-set).

  **Default value: `regular`**

- `fillOpacity`

    Opacity of the transparent fill inside of the icon. Accepts values between `0` and `1`. It is not recommended to use higher values than `0.5` as it could break the legibility and recognizability of the icon.

    **Default value: `0`**

#### Returns

String of the icon in SVG format.

#### Example

```typescript
PaperPlaneIcon.toSVG({
    theme: 'thin',
    fillOpacity: 0.25,
});
// "<svg width=\"24\" height=\"24\" view..."
```

### `.toDOM(options)` (browser only)

Returns DOM representation of the icon. This method is browser only, if you try to run it without browser `document` object in the global scope, it throws an error.

#### Parameters

`options`

Object describing visuals of the icon.

- `theme`

  Theme is either `regular` or `thin`. For icon visual reference, visit [XYZ Icon Set Website](https://ondrejbarta.xyz/xyz-icon-set).

  **Default value: `regular`**

- `fillOpacity`

    Opacity of the transparent fill inside of the icon. Accepts values between `0` and `1`. It is not recommended to use higher values than `0.5` as it could break the legibility and recognizability of the icon.

    **Default value: `0`**

#### Returns

Virtual DOM object of the icon.

#### Example

```typescript
PaperPlaneIcon.toDOM({
    theme: 'thin',
    fillOpacity: 0.25,
});
// <svg width="24" height="24" view...
```

## FAQ

### Why is icon font not supported?

Generally text rendering is different to graphics rendering. There are many issues with icon fonts caused by the technology misuse. Eg. It could cause that the experience will be broken when certain accesibility options are on in the web browser.

## Contributing

There's public [Figma project](https://www.figma.com/file/aL6uKzwVzrTG3sTE2pbN4gOb/XYZ-Icon-Set) which contains always the most recent changes. If you don't find the icon you were looking for, please search through [issues](https://github.com/bartaxyz/xyz-icon-set/issues) or [file a new one](https://github.com/bartaxyz/xyz-icon-set/issues/new). There are no plans on allowing direct contributions to icon files.

## License

XYZ Icon Set is licensed under the MIT License.

## Authors

Ondřej Bárta &middot; [website](https://ondrejbarta.xyz) &middot; [twitter](https://twitter.com/bartaxyz)
