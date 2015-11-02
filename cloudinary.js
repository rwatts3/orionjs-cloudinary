/**
 * Cloudinary Configuration
 * Set the fields belo
 */

orion.config.add('CLOUDINARY_CLOUD_NAME', 'cloudinary', {public: true});
orion.config.add('CLOUDINARY_FOLDER', 'cloudinary', {public: true});
orion.config.add('CLOUDINARY_UNSIGNED_ID', 'cloudinary', {public:true});
orion.config.add('CLOUDINARY_API_KEY', 'cloudinary', {public: true, secret: true});
orion.config.add('CLOUDINARY_API_SECRET', 'cloudinary', {secret: true});

if (Meteor.isClient) {
  $.cloudinary.config({
    cloud_name: orion.config.get('CLOUDINARY_CLOUD_NAME'),
    api_key: orion.config.get('CLOUDINARY_API_KEY'),
    folder: orion.config.get('CLOUDINARY_FOLDER')
  });
  
  orion.filesystem.providerUpload = function(options, success, failure, progress) {
      cloudinary.openUploadWidget({ 
          cloud_name: orion.config.get('CLOUDINARY_CLOUD_NAME'), 
          upload_preset: orion.config.get('CLOUDINARY_UNSIGNED_ID'),
          folder: orion.config.get('CLOUDINARY_FOLDER')
      },
          function(error, result) { 
              if (error) {
                  failure(new Meteor.Error('cloudinary-error', i81n('filesystem.messages.errorUploading')));
              } else {
                  success(result[0].url);
              }
          }
      );
};

  orion.filesystem.providerRemove = function(file, success, failure)  {
    
  };
}

if (Meteor.isServer) {
    
}