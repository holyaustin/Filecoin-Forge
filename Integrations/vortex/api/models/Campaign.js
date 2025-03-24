/**
 * Campaign.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    account: {
      type: 'string'
    },

    title: {
      type: 'string'
    },

    description: {
      type: 'string',
    },

    prize: {
      type: 'string',
    },

    winners: {
      type: 'number',
    },

    end_date: {
      type: 'ref', columnType: 'datetime'
    },

    image: {
      type: 'string'
    },

    active: {
      type: 'boolean'
    },

    nft: {
      type: 'json'
    },

    winner: {
      type: 'string'
    },

    transfered: {
      type: 'boolean'
    },

    nftSellOffers: {
      type: 'json'
    },

    nft_detail: {
      type: 'json'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    players: {
      collection: 'player',
      via: 'campaign'
    }

  },

};

