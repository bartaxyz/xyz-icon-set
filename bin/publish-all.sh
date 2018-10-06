

XYZ_ICON_SET_VERSION=$(npm version minor --force --no-git-tag-version)
npm publish

echo $XYZ_ICON_SET_VERSION

cd ../xyz-icon-set-vue
npm version $XYZ_ICON_SET_VERSION --force --no-git-tag-version
npm install xyz-icon-set@$XYZ_ICON_SET_VERSION
npm publish

cd ../xyz-icon-set-react
npm version $XYZ_ICON_SET_VERSION --force --no-git-tag-version
npm install xyz-icon-set@$XYZ_ICON_SET_VERSION
npm publish


