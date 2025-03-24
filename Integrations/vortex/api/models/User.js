/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    name: {
      type: 'string',
    },

    lastname: {
      type: 'string',
    },

    email: {
      type: 'string',
    },

    password: {
      type: 'string',
    },

    wallet: {
      type: 'json',
    },

    account: {
      type: 'string',
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

  // Here we encrypt password before creating a User
  beforeCreate: function (values, callback) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return callback(err);
      bcrypt.hash(values.password, salt, function (err, hash) {
        if (err) return callback(err);
        values.password = hash;
        callback();
      });
    });
  },

  comparePassword: function (password, user, callback) {
    bcrypt.compare(password, user.password, function (err, match) {
      if (err) callback(err);
      if (match) {
        callback(null, true);
      } else {
        callback(err);
      }
    });
  },

};

