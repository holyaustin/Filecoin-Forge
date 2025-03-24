/**
 * CampaignController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 const axios = require('axios').default;
 const xrpl = require("xrpl");
 const { XummSdk } = require('xumm-sdk');
 const Sdk = new XummSdk(sails.config.custom.xumm_api_key, sails.config.custom.xumm_api_secret);
 
 //
 
 const { Web3Storage, File } = require('web3.storage');
 
 module.exports = {
 
      auth: function(req, res) {
            start();
   
            async function start() {
               try {
                  let data = { 
                        txjson: {
                           TransactionType: 'SignIn'
                        }
                  };
   
                  let config = {
                        method: 'post',
                        url: `${sails.config.custom.xumm_api}/payload`,
                        headers: { 
                           'Content-Type': 'application/json', 
                           'X-API-Key': `${sails.config.custom.xumm_api_key}`, 
                           'X-API-Secret': `${sails.config.custom.xumm_api_secret}`
                        },
                        data: data
                  };
   
                  let response = await axios(config);
   
                  return res.status(200).json({
                        status: 'success',
                        data: response.data
                  });
               } catch (error) {
                  return res.serverError(error);
               }
            }
      },
   
      account: function(req, res) {
            var payload = req.param('payload');
   
            if (payload) {
               start();
            } else {
               return res.status(401).json({
                  status: 'error',
                  message: 'Required parameters are not present (payload) or header'
               });
            }
   
            async function start() {
               try {
                  const user = await Sdk.payload.get(payload);
                  
                  if (user) {
                        let account = user.response.account;
   
                        // Define the network client
                        const client = new xrpl.Client(sails.config.custom.xrpl_client);
                        await client.connect();
      
                        // ... custom code goes here
                        // Get info from the ledger about the address we just funded
                        const response = await client.request({
                           "command": "account_info",
                           "account": account,
                           "ledger_index": "validated"
                        })
                        // Disconnect when done (If you omit this, Node.js won't end the process)
                        client.disconnect();

                     //  let account = await User.findOne({
                     //     id: '6217213596010d6cfd1f6294'
                     //  });
   
                        return res.status(200).json({
                           status: 'success',
                           address: response.result.account_data.Account
                        });
                  } else {
                        return res.status(401).json({
                           status: 'error',
                           user: 'expired'
                        });
                  }
               } catch (error) {
                  return res.serverError(error);
               }
            }
      },
   
      user: function(req, res) {
            var account = req.param('account');
   
            if (account) {
               start();
            } else {
               return res.status(401).json({
                  status: 'error',
                  message: 'Required parameters are not present (account) or header'
               });
            }
   
            async function start() {
               try {
                  // Define the network client
                  const client = new xrpl.Client(sails.config.custom.xrpl_client);
                  await client.connect();
   
                  // ... custom code goes here
                  // Get info from the ledger about the address we just funded
                  const response = await client.request({
                        "command": "account_info",
                        "account": account,
                        "ledger_index": "validated"
                  })
                  // Disconnect when done (If you omit this, Node.js won't end the process)
                  client.disconnect();
   
                  return res.status(200).json({
                        status: 'success',
                        user: response
                  });
               } catch (error) {
                  return res.serverError(error);
               }
            }
      },
   
      socket: function(req, res) {
            start();
   
            async function start() {
   
               sails.sockets.broadcast('5963de684bb804b6e139cdec', 'address', 'xrpl_address');
   
               return res.status(200).json({
                  status: 'success'
               });
            }
      },
   
      webhook: function(req, res) {
            start();
   
            async function start() {
               try {
                  console.log('body', req.body);
   
                  return res.status(200).json({
                        status: 'success',
                  });
               } catch (error) {
                  return res.serverError(error);
               }
            }
      },
   
      userCampaigns: function(req, res) {
            let account = req.param('account');
   
            if (account) {
               start(); //
            } else {
               return res.status(500).json({
                  status: 'error',
                  message: 'Required parameters are not present (account)'
               });
            }
   
            async function start() {
               try {
                  let campaigns = await Campaign.find({
                        account: account
                  }).populate('players');
   
                  return res.status(200).json({
                        status: 'success',
                        campaigns
                  });
               } catch (error) {
                  return res.serverError(error);
               }
            }
   
      },
   
      getCampaign: function(req, res) {
            let id = req.param('id');
            let account = req.param('account');
   
            if (id, account) {
               start(); //
            } else {
               return res.status(500).json({
                  status: 'error',
                  message: 'Required parameters are not present (id, account)'
               });
            }
   
            async function start() {
               try {
                  let campaign = await Campaign.findOne({
                        id: id,
                        account: account,
                  }).populate('players');
   
                  return res.status(200).json({
                        status: 'success',
                        campaign
                  });
               } catch (error) {
                  return res.serverError(error);
               }
            }
      },
   
      addPlayer: function(req, res) {
            let account = req.param('account');
            let id_campaign = req.param('campaign');
            let name = req.param('name');
            let email = req.param('email');

            if (account, id_campaign, name, email) {
               start(); //
            } else {
               return res.status(500).json({
                  status: 'error',
                  message: 'Required parameters are not present (account, campaign, name, email)'
               });
            }
   
            async function start() {
               try {
                  let campaign = await Campaign.findOne({
                        id: id_campaign
                  });
   
                  if (campaign && campaign.active === true) {
                        let findPlayer = await Player.findOne({
                           account: account,
                           campaign: id_campaign
                        });

                        if (!findPlayer) {
                           let player = await Player.create({
                              account: account,
                              name: name,
                              email: email,
                              campaign: id_campaign,
                           }).fetch();
      
                           return res.status(200).json({
                              status: 'success',
                              campaign,
                              player
                           });
                        } else {
                           return res.status(200).json({
                              status: 'error',
                              message: 'Player already part of the campaign'
                           });
                        }

                        
                  } else {
                        return res.status(401).json({
                           status: 'error',
                           message: 'Campaign Inactive'
                        });
                  }
               } catch (error) {
                  return res.serverError(error);
               }
            }
      },
   
      create: function(req, res) {
            let account = req.param('account');
            let title = req.param('title');
            let description = req.param('description');
            let prize = req.param('prize');
            let winners = req.param('winners');
            let end_date = req.param('end_date');
            let active = req.param('active');
            let file = req.file('file');

            if (account, title, description, prize, winners, end_date, file, active) {
               uploadImage(); //
            } else {
               return res.status(500).json({
                  status: 'error',
                  message: 'Required parameters are not present (account, title, description, prize, winners, end_date, file, active)'
               });
            }
   
            async function uploadImage() {
               try {
                  var cloudinary = await sails.helpers.uploadImage.with({
                        file: file,
                        folder: `vortex/`,
                        id: 1
                  }).tolerate('issues', (error)=>{
                        sails.log.warn(error);
                  });
   
                  if (cloudinary) {
   
                        let image = cloudinary.secure_url;
                        start(image);
   
                  } else {
                        return res.status(200).json({
                           status: 'error',
                           message: `Couldn't upload image`
                        });
                  }
               } catch (error) {
                  return res.serverError(error);
               }
            }
   
            async function start(image) {
               try {
                  let campaign = await Campaign.create({
                        account: account,
                        title: title,
                        description: description,
                        prize: prize,
                        winners: winners,
                        end_date: end_date,
                        image: image,
                        active: active,
                  }).fetch();

                  console.log(`:: Campaign created`);

                  ipfs(campaign);
   
                  // return res.status(200).json({
                  //       status: 'success',
                  //       campaign
                  // });
   
               } catch (error) {
                  return res.serverError(error);
               }
            }

            async function ipfs(campaign) {
               const token = sails.config.custom.web3_storage;

               if (!token) {
                  return console.error('A token is needed. You can create one on https://web3.storage');
               }

               console.log(`:: Storing IPFS`);

               const storage = new Web3Storage({ token });

               const response = await axios.get(campaign.image,  { responseType: 'arraybuffer' })
               const buffer = Buffer.from(response.data, "base64");

               let filename = campaign.image;
               filename = filename.split('/');
               filename = filename[filename.length - 1];

               let img = new File([buffer], filename);

               console.log(`Uploading files`);
               let cid = await storage.put([img]);
               console.log('Content added with CID:', cid);

               mint(cid, campaign);
            }

            async function mint(cid, campaign) {
               try {
                  
                  console.log(`:: Minting...`);

                  let user = await User.findOne({
                     account: account
                  });

                  //  Define the network client
                  const wallet = xrpl.Wallet.fromSeed(user.wallet.seed);
                  const client = new xrpl.Client(sails.config.custom.xrpl_client);
                  await client.connect();

                  const transactionBlob = {
                     TransactionType: "NFTokenMint",
                     Account: wallet.classicAddress,
                     URI: xrpl.convertStringToHex(`ipfs://${cid}`),
                     Flags: parseInt(8),
                     TokenTaxon: 0
                  }

                  const tx = await client.submitAndWait(transactionBlob, {
                     wallet: wallet
                  });

                  const nfts = await client.request({
                     method: "account_nfts",
                     account: wallet.classicAddress  
                  });

                  console.log(nfts);

                  console.log("Transaction result:", tx.result.meta.TransactionResult);
                  console.log("Balance changes:",
                  JSON.stringify(tx.result.meta));

                  let nft;

                  if (tx.result.meta.AffectedNodes[1].CreatedNode) {
                     console.log(`:: First Token for the account.`);
                     let { CreatedNode } = tx.result.meta.AffectedNodes[1];
                     let NonFungibleTokens = CreatedNode.NewFields.NonFungibleTokens;
                     nft = NonFungibleTokens[NonFungibleTokens.length - 1].NonFungibleToken;
                  }

                  if (tx.result.meta.AffectedNodes[1].ModifiedNode) {
                     console.log(`:: New Token for the account.`);
                     let { ModifiedNode } = tx.result.meta.AffectedNodes[1];
                     let NonFungibleTokens = ModifiedNode.FinalFields.NonFungibleTokens;
                     nft = NonFungibleTokens[NonFungibleTokens.length - 1].NonFungibleToken;
                  }

                  // Disconnect when done (If you omit this, Node.js won't end the process)
                  client.disconnect();

                  console.log(`:: Update Campaign with NFT Data`);

                  let nft_detail = nfts.result.account_nfts;
                  nft_detail = nft_detail[nft_detail.length - 1];

                  nft_detail.URI = xrpl.convertHexToString(nft_detail.URI);

                  let uc = await Campaign.update({
                     id: campaign.id
                  }, {
                     nft: nft,
                     nft_detail: nft_detail
                  }).fetch();

                  console.log(uc);

                  return res.status(200).json({
                     status: 'success',
                     campaign: uc[0],
                  });

               } catch (error) {
                  return res.serverError(error);
               }
            }
   
      },
   
      mint: function(req, res) {
            let id = req.param('id');
            let account = req.param('account');
   
            if (id, account) {
               start(); //
            } else {
               return res.status(500).json({
                  status: 'error',
                  message: 'Required parameters are not present (id, account, file)'
               });
            }
   
            async function start() {
               try {
                  let campaign = await Campaign.findOne({
                        id: id,
                        account: account,
                  }).populate('players');
                  
                  const token = sails.config.custom.web3_storage;
   
                  if (!token) {
                     return console.error('A token is needed. You can create one on https://web3.storage');
                  }
   
                  const storage = new Web3Storage({ token });

                  const response = await axios.get(campaign.image,  { responseType: 'arraybuffer' })
                  const buffer = Buffer.from(response.data, "base64");

                  let filename = campaign.image;
                  filename = filename.split('/');
                  filename = filename[filename.length - 1];

                  let img = new File([buffer], filename);

                  console.log(`Uploading files`);
                  let cid = await storage.put([img]);
                  console.log('Content added with CID:', cid);
   
                  mint(cid);
               } catch (error) {
                  return res.serverError(error);
               }
            }

            async function mint(cid) {
               try {
                  let user = await User.findOne({
                     account: account
                  });

                  //  Define the network client
                  const wallet = xrpl.Wallet.fromSeed(user.wallet.seed);
                  const client = new xrpl.Client(sails.config.custom.xrpl_client);
                  await client.connect();

                  const transactionBlob = {
                     TransactionType: "NFTokenMint",
                     Account: wallet.classicAddress,
                     URI: xrpl.convertStringToHex(`ipfs://${cid}`),
                     Flags: parseInt(8),
                     TokenTaxon: 0
                  }

                  const tx = await client.submitAndWait(transactionBlob, {
                     wallet: wallet
                  });

                  const nfts = await client.request({
                     method: "account_nfts",
                     account: wallet.classicAddress  
                  })

                  console.log(nfts);

                  console.log("Transaction result:", tx.result.meta.TransactionResult);
                  console.log("Balance changes:",
                  JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2));

                  // Disconnect when done (If you omit this, Node.js won't end the process)
                  client.disconnect();

                  return res.status(200).json({
                     status: 'success',
                     nfts
                  });

               } catch (error) {
                  return res.serverError(error);
               }
            }
      },

      getAccountNfts: function(req, res) {
            let account = req.param('account');
   
            if (account) {
               start(); //
            } else {
               return res.status(500).json({
                  status: 'error',
                  message: 'Required parameters are not present (account)'
               });
            }

            async function start() {
               try {
                  let user = await User.findOne({
                     account: account
                  });

                  //  Define the network client
                  const wallet = xrpl.Wallet.fromSeed(user.wallet.seed);
                  const client = new xrpl.Client(sails.config.custom.xrpl_client);
                  await client.connect();

                  const nfts = await client.request({
                     method: "account_nfts",
                     account: wallet.classicAddress  
                  })

                  // Disconnect when done (If you omit this, Node.js won't end the process)
                  client.disconnect();

                  nfts.result.account_nfts.forEach(nft => {
                     nft.URI = xrpl.convertHexToString(nft.URI);
                  });

                  return res.status(200).json({
                     status: 'success',
                     nfts
                  });

               } catch (error) {
                  return res.serverError(error);
               }
            }
   
      },

      createOffer: function(req, res) {
         let account = req.param('account');
         let tokenid = req.param('tokenid');

         if (account, tokenid) {
            start(); //
         } else {
            return res.status(500).json({
               status: 'error',
               message: 'Required parameters are not present (account, tokenid)'
            });
         }

         async function start() {
            try {
               let user = await User.findOne({
                  account: account
               });

               //  Define the network client
               const wallet = xrpl.Wallet.fromSeed(user.wallet.seed);
               const client = new xrpl.Client(sails.config.custom.xrpl_client);
               await client.connect();
               console.log("Connected to Sandbox");

                // Prepare transaction -------------------------------------------------------
               const transactionBlob = {
                  TransactionType: 'NFTokenCreateOffer',
                  Account: wallet.classicAddress,
                  TokenID: tokenid,
                  Amount: '0',
                  Flags: 1
               }

               console.log(transactionBlob);
               console.log(wallet);

               const tx = await client.submitAndWait(transactionBlob, {wallet});

               console.log('here');

               let nftSellOffers;

               nftSellOffers = await client.request({
                  method: 'nft_sell_offers',
                  tokenid: tokenid
               });

               console.log(nftSellOffers);
               console.log("Transaction result:", JSON.stringify(tx.result.meta.TransactionResult, null, 2))

               client.disconnect()

               //

               

               return res.status(200).json({
                  status: 'success',
                  response: tx.result.meta.TransactionResult
               });
            } catch (error) {
               return res.serverError(error);
            }
         }

         async function xstart() {
            let data = { 
               txjson: {
                  TransactionType: 'NFTokenCreateOffer',
                  Account: account,
                  TokenID: tokenid,
                  Amount: '0',
                  Flags: 1
               }
            };

            let config = {
                  method: 'post',
                  url: `${sails.config.custom.xumm_api}/payload`,
                  headers: { 
                     'Content-Type': 'application/json', 
                     'X-API-Key': `${sails.config.custom.xumm_api_key}`, 
                     'X-API-Secret': `${sails.config.custom.xumm_api_secret}`
                  },
                  data: data
            };

            let response = await axios(config);

            return res.status(200).json({
               status: 'success',
               data: response.data
            });
         }

      },

      acceptOffer: function(req, res) {
         let account = req.param('account');
         let index = req.param('index');

         if (account, index) {
            xstart(); //
         } else {
            return res.status(500).json({
               status: 'error',
               message: 'Required parameters are not present (account, index)'
            });
         }

         async function start() {
            try {
               let user = await User.findOne({
                  account: account
               });

               //  Define the network client
               const wallet = xrpl.Wallet.fromSeed(user.wallet.seed);
               const client = new xrpl.Client(sails.config.custom.xrpl_client);
               await client.connect();
               console.log("Connected to Sandbox");

                // Prepare transaction -------------------------------------------------------
                const transactionBlob = {
                  TransactionType: "NFTokenAcceptOffer",
                  Account: wallet.classicAddress,
                  SellOffer: index,
               }

               const tx = await client.submitAndWait(transactionBlob, {wallet});

               const nfts = await client.request({
                  method: "account_nfts",
                  account: wallet.classicAddress
                 })
               console.log(JSON.stringify(nfts,null,2))

               console.log("Transaction result:", JSON.stringify(tx.result.meta.TransactionResult, null, 2));

               client.disconnect()

               return res.status(200).json({
                  status: 'success',
                  response: tx.result.meta.TransactionResult
               });
            } catch (error) {
               return res.serverError(error);
            }
         }

         async function xstart() {
            let data = { 
               txjson: {
                  TransactionType: 'NFTokenAcceptOffer',
                  Account: account,
                  SellOffer: index,
               }
            };

            let config = {
                  method: 'post',
                  url: `${sails.config.custom.xumm_api}/payload`,
                  headers: { 
                     'Content-Type': 'application/json', 
                     'X-API-Key': `${sails.config.custom.xumm_api_key}`, 
                     'X-API-Secret': `${sails.config.custom.xumm_api_secret}`
                  },
                  data: data
            };

            let response = await axios(config);

            return res.status(200).json({
               status: 'success',
               data: response.data
            });
         }

      },

      winner: function(req, res) {
         let account = req.param('account');
         let id_campaign = req.param('campaign');

         if (account, id_campaign) {
            start(); //
         } else {
            return res.status(500).json({
               status: 'error',
               message: 'Required parameters are not present (account, campaign)'
            });
         }

         async function start() {
            try {
               let campaign = await Campaign.findOne({
                     id: id_campaign,
               });

               let findPlayer = await Player.findOne({
                  account: account,
                  campaign: id_campaign
               });

               if (campaign) {
                  let uc = await Campaign.update({
                     id: id_campaign
                  }, {
                     winner: account
                  }).fetch();

                  console.log(`Campaign Updated...`);

                  createSellOffer(uc[0]);
               } else {
                  return res.status(200).json({
                     status: 'error',
                     message: 'Could not find campaign'
                  });
               }
            } catch (error) {
               return res.serverError(error);
            }
         }

         async function createSellOffer(campaign) {
            try {
               let user = await User.findOne({
                  account: campaign.account
               });

               //  Define the network client
               const wallet = xrpl.Wallet.fromSeed(user.wallet.seed);
               const client = new xrpl.Client(sails.config.custom.xrpl_client);
               await client.connect();
               console.log("Connected to Sandbox");

                // Prepare transaction -------------------------------------------------------
               const transactionBlob = {
                  TransactionType: 'NFTokenCreateOffer',
                  Account: wallet.classicAddress,
                  TokenID: campaign.nft.TokenID,
                  Amount: '0',
                  Flags: 1
               }

               console.log(transactionBlob);
               console.log(wallet);

               console.log(`Creating Sell Offer...`);

               const tx = await client.submitAndWait(transactionBlob, {wallet});

               let nftSellOffers;

               nftSellOffers = await client.request({
                  method: 'nft_sell_offers',
                  tokenid: campaign.nft.TokenID
               });

               console.log(nftSellOffers);
               console.log("Transaction result:", JSON.stringify(tx.result.meta.TransactionResult, null, 2));

               let uc = await Campaign.update({
                  id: campaign.id
               }, {
                  nftSellOffers: nftSellOffers,
                  active: false
               }).fetch();

               client.disconnect();

               //

               return res.status(200).json({
                  status: 'success',
                  response: tx.result.meta.TransactionResult
               });
            } catch (error) {
               return res.serverError(error);
            }
         }
      },

      getPlayerCampaigns: function(req, res) {
         let account = req.param('account');

         if (account) {
            start(); //
         } else {
            return res.status(500).json({
               status: 'error',
               message: 'Required parameters are not present (account)'
            });
         }

         async function start() {
            try {
               let campaigns = await Campaign.find({
                  winner: account
               });

               return res.status(200).json({
                  status: 'success',
                  campaigns
               });

            } catch (error) {
               return res.serverError(error);
            }
         }

      },

      nftTransfered: function(req, res) {
         let account = req.param('account');
         let id_campaign = req.param('campaign');

         if (account, id_campaign) {
            start(); //
         } else {
            return res.status(500).json({
               status: 'error',
               message: 'Required parameters are not present (account, campaign)'
            });
         }

         async function start() {
            try {
               let campaign = await Campaign.update({
                  id: id_campaign,
                  winner: account,
               }, {
                  transfered: true
               }).fetch();

               if (campaign.length > 0) {
                  return res.status(200).json({
                     status: 'success',
                     campaign: campaign[0]
                  });
               } else {
                  return res.status(500).json({
                     status: 'error',
                     message: `Couldn't find any Campaign with id ${id_campaign} or winner ${account}`
                  });
               }
            } catch (error) {
               return res.serverError(error);
            }
         }

      },
 
 };