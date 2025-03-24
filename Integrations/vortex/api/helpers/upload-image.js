var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'gettechnologies',
    api_key: '661152114375518',
    api_secret: 'MvKC5Uyt_jNdnN9oM824CcWRAQc'
});

module.exports = {


  friendlyName: 'Upload image',


  description: 'Use this helper if you need to upload an image to Cloudinary',


  inputs: {

    file: {
      type: 'ref',
      example: 'file',
      description: 'File to Upload',
      required: true,
    },

    folder: {
      type: 'string',
      example: 'https://cloudinary.com',
      description: 'Cloudinary Folder',
      required: true,
    },

    id: {
      type: 'string',
      example: '27',
      description: 'Any ID',
      required: true,
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

    issues: {
      description: 'Error'
    }

  },


  fn: async function (inputs, exits) {
    
    var file = inputs.file;
    var folder = inputs.folder;
    var id = inputs.id;

    file.upload({dirname: require('path').resolve(sails.config.appPath, 'assets/images')}, 
      function (err, uploadedFiles) {
          if (err) {
              return res.status(200).json({
                  status: 'error',
                  message: 'Error 103 Uplading Image',
                  error: err
              });
          }

          if (uploadedFiles.length > 0) {
              cloudinary.v2.uploader.upload(uploadedFiles[0].fd,
              { folder:  folder },
              function(error, result) {
                  if (error) {
                    return exits.issues(error);
                  }

                  return exits.success(result);
              });
          } else {
            return exits.issues(`Couldn't find any file, helper error 70`);
          }
      });

  }


};

