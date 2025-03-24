/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const xrpl = require("xrpl");

module.exports = {
    create: function(req, res) {

        let name = req.param('name');
        let lastname = req.param('lastname');
        let email = req.param('email');
        let password = req.param('password');

        if (name, lastname, email, password) {
            start(); //
        } else {
            return res.status(500).json({
                status: 'error',
                message: 'Required parameters are not present (name, lastname, email, password)'
            });
        }

        async function start() {
            try {
                // Define the network client
                const client = new xrpl.Client(sails.config.custom.xrpl_client);
                await client.connect();

                // let fund_result = await client.fundWallet();
                let fund_result = await client.fundWallet(null, {faucetHost: 'faucet.devnet.rippletest.net' })
                let wallet = fund_result.wallet;

                // Disconnect when done (If you omit this, Node.js won't end the process)
                client.disconnect();

                let user = await User.create({
                    name: name,
                    lastname: lastname,
                    email: email,
                    password: password,
                    wallet: wallet,
                    account: wallet.classicAddress
                }).fetch();

                return res.status(200).json({
                    status: 'success',
                    user: user
                });
            } catch (error) {
                return res.serverError(error);
            }

        }
    }
};

