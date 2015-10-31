if (Meteor.isClient) {
  orion.filesystem.providerUpload = function(options, success, failure, progress) {
    var before = _.pluck(Cloudinary.collection.find().fetch(), '_id');
	
    Cloudinary.upload(options.fileList,{
      folder: orion.config.get('CLOUDINARY_FOLDER'),
    }, function(error, result) {
      if (error) {
        failure(new Meteor.Error('cloudinary-error', i18n('filesystem.messages.errorUploading')));
      } else {
        success(result.secure_url, { cloudinaryPath: result.url });
      }
      Cloudinary.collection.remove({});
    });
    

    var after = _.pluck(Cloudinary.collection.find().fetch(), '_id');
    var difference = _.difference(after, before);
    var id = difference.length > 0 ? difference[0] : '';

    Tracker.autorun(function () {
      var file = Cloudinary.collection.findOne(id);
      if (file) {
        progress(file.percent_uploaded);
      }
    });
  };

  orion.filesystem.providerRemove = function(file, success, failure)  {
    Cloudinary.delete(file.meta.cloudinaryPath, function(error, result) {
      if (error) {
        failure(new Meteor.Error('cloudinary-error', i18n('filesystem.messages.errorRemoving')));
      } else {
        success();
      }
    });
  };
}

orion.config.add('CLOUDINARY_CLOUD_NAME', 'cloudinary', {public: true});
orion.config.add('CLOUDINARY_FOLDER', 'cloudinary', {public: true});
orion.config.add('CLOUDINARY_API_KEY', 'cloudinary', {secret: true});
orion.config.add('CLOUDINARY_API_SECRET', 'cloudinary', {secret: true});

if (Meteor.isServer) {
  Cloudinary.config = {
    cloud_name: orion.config.get('CLOUDINARY_CLOUD_NAME'),
    api_key: orion.config.get('CLOUDINARY_API_KEY'),
    api_secret: orion.config.get('CLOUDINARY_API_SECRET')
  };
}
