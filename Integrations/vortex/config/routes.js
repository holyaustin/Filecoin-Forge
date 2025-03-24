/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  'POST /login': { controller: 'Auth', action: 'index' },

  'GET /auth': { controller: 'Campaign', action: 'auth' },

  'POST /webhook': { controller: 'Campaign', action: 'webhook' },

  'GET /account/:payload': { controller: 'Campaign', action: 'account' },

  'GET /user/:account': { controller: 'Campaign', action: 'user' },

  'GET /user/:account/nfts': { controller: 'Campaign', action: 'getAccountNfts' },

  'GET /socket': { controller: 'Campaign', action: 'socket' },
 
  'POST /campaign/create': { controller: 'Campaign', action: 'create' },

  'POST /campaign/mint': { controller: 'Campaign', action: 'mint' },

  'POST /campaign/create-offer': { controller: 'Campaign', action: 'createOffer' },

  'POST /campaign/accept-offer': { controller: 'Campaign', action: 'acceptOffer' },

  'POST /user/create': { controller: 'User', action: 'create' },

  'GET /user/:account/campaign': { controller: 'Campaign', action: 'userCampaigns' },

  'GET /user/:account/campaign/:id': { controller: 'Campaign', action: 'getCampaign' },

  'POST /campaign/player': { controller: 'Campaign', action: 'addPlayer' },

  'POST /campaign/winner': { controller: 'Campaign', action: 'winner' },

  'GET /player/:account': { controller: 'Campaign', action: 'getPlayerCampaigns' },

  'POST /player/nft-transfered': { controller: 'Campaign', action: 'nftTransfered' },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
