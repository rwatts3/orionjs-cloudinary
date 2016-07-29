// config
if (Meteor.isClient) {
	orion.filesystem.providerUpload = function (options, success, failure, progress) {
		files = options.fileList;

		Cloudinary.upload(files, {
			folder: Meteor.settings.public.cloudinary.folder,
      fields: {}
		}, function (error, result) {
			if (error) {
				failure(new Meteor.Error('rwatts:orionjs-cloudinary', i18n('filesystem.messages.errorUploading')));
			} else {
				success(result.url, result);
			}
			Cloudinary.collection.remove({});
		});

		Tracker.autorun(function () {
			var file = Cloudinary.collection.findOne();
			if (file) {
				progress(file.percent_uploaded || 0);
			}
		});
	};

	orion.filesystem.providerRemove = function (file, success, failure) {
		Cloudinary.delete(file.meta.public_id, function (error, result) {
			if (error) {
				failure(new Meteor.Error('rwatts:orionjs-cloudinary', i18n('filesystem.messages.errorRemoving')));
			} else {
				success();
			}
		});
	};
}

if (Meteor.isServer) {
	Meteor.startup(function() {
		if (Meteor.settings.private && Meteor.settings.private.cloudinary) {
			Cloudinary.config({
				cloud_name: Meteor.settings.private.cloudinary.cloud_name,
				api_key: Meteor.settings.private.cloudinary.api_key,
				api_secret: Meteor.settings.private.cloudinary.api_secret
			});
		}
	});
}
if (Meteor.isClient) {
	let cloud_name = Meteor.settings.public.cloudinary.cloud_name;

	$.cloudinary.config({
		cloud_name: cloud_name
	});
}
