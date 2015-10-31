Package.describe({
	name: 'rwatts:orionjs-cloudinary',
	summary: 'Cloudinary storage for orionjs:filesystem',
	version: '0.1.0',
	git: 'https://github.com/rwatts3/orionjs-cloudinary'
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');

	api.use([
		'orionjs:core@1.6.0',
		'orionjs:filesystem@1.6.0',
		'orionjs:config@1.6.0',
		'lepozepo:cloudinary@4.0.3'
	]);

	api.addFiles([
		'cloudinary.js',
	]);

});

Package.onTest(function(api) {
	api.use(['rwatts:orionjs-cloudinary', 'mike:mocha-package', 'orionjs:filesystem']);
	api.addFiles(['tests/orionjs-cloudinary-tests.js']);
});
