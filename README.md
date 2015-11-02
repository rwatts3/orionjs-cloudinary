# Orionjs Cloudinary
![](https://img.shields.io/badge/Version-0.1.0-orange.svg)![](https://img.shields.io/badge/License-MIT-blue.svg)   

This package brings the `Cloudinary` Image Management System to Orion CMS.

This package is an extension of **Orion** and requires the following packages in order to work. 
`orionjs:filesystem` and `orionjs:image-attribute` or `orionjs:file-attribute`.

## Instructions
1. Install the package by adding `rwatts:orionjs-cloudinary` to your project.
2. Navigate to the **config** section of your admin panel.
3. Define your **Cloudinary** configuration settings by navigating to the **Cloudinary** Tab.

## Tips
For best use I advise setting each client with a folder relative to their name if you plan on using the same Cloudinary account for your projects. This allows for better organization of the uploaded files.

## How to read and manipulate *Credits lepozepo:cloudinary*
All of Cloudinary's manipulation options are available in the c.url helper. You can access an image by passing a cloudinary public_id and format:

``` handlebars
<img src="{{c.url public_id format=format}}">
```

You can manipulate an image by adding parameters to the helper
``` handlebars
<img width="250" src="{{c.url public_id format=format effect='blur:300' angle=10}}">
```

Obs: If you want to resize your image in a smaller size you will need to pass the `crop` parameter 
``` handlebars
<img src="{{c.url public_id width=250 height=250 crop="fill"}}">
```
For more information see the cloudinary's documentation:
[http://cloudinary.com/documentation/image_transformations#crop_modes](http://cloudinary.com/documentation/image_transformations#crop_modes)

## Compatibility
You can use the collection-hooks package to hook up to the offline collection `Cloudinary.collection`.

Here are all the transformations you can apply:
[http://cloudinary.com/documentation/image_transformations#reference](http://cloudinary.com/documentation/image_transformations#reference)

