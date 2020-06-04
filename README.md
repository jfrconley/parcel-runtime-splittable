# parcel-bundler-splitable
***It's splitsville baby!***

## Description
Bundler plugin for Parcel 2 that allows splitting bundles on arbitrary files

## Usage
**Add as a dev dependency**

```yarn add -D parcel-bundler-splitable```

**Set as bundler in .parcelrc**
```json
{
  "extends": "@parcel/config-default",
  "bundler": "parcel-bundler-splitable"
}
```
**Set the "bundleSplits" property in your package.json**
```json
...
"bundleSplits": [
    "dist/dependencies.js"
]
...
```
