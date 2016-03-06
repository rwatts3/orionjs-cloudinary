Package.describe({
	name: 'rwatts:orionjs-cloudinary',
	summary: 'Cloudinary storage for orionjs:filesystem',
	version: '1.0.1',
	git: 'https://github.com/rwatts3/orionjs-cloudinary'
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@1.3-beta.12');

	api.use([
		'meteor-base',
		'jquery',
		'orionjs:core@1.6.0',
		'orionjs:filesystem@1.6.0',
		'orionjs:config@1.6.0',
		'lepozepo:cloudinary@4.1.3',
		'ecmascript'
	]);
	
	api.addFiles([
		'cloudinary.js'
	]);
	
	api.mainModule("cloudinary.js", "client");
	api.export(['orion', 'Cloudinary']);
});
