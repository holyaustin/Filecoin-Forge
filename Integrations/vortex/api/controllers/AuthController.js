/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    index:  function (req, res) {
        let email = req.param('email');
        let password = req.param('password');

        if (email && password) {
            start();
        } else {
            return res.status(500).json({
                status: 'error',
                message: 'Required parameters are not present (email, password)'
            });
        }

        async function start() {
            try {
                console.log(':: ⏳ Auth thinking');
    
                var user = await User.findOne({
                    email: email, 
                });
    
                if (user) {
                    validate(user);
                } else {
                    return res.status(200).json({
                        status: 'success',
                        message: `Could not found any User with Email ${email}`
                    });
                }
            } catch (error) {
                return res.serverError(error);
            }
        }

        async function validate(user) {
            try {
                User.comparePassword(password, user, function (error, valid) {
                    if (error) {
                        return res.serverError(error);
                    }
            
                    if (!valid) {
                        return res.json(401, {
                            status: 'error',
                            error: 'Invalid Email or Passoword',
                        });
                    } else {
                        return res.status(200).json({
                            status: 'success',
                            account: user.wallet.classicAddress,
                            token: jwToken.issue({
                                id: user.id,
                                name: user.name,
                                lastname: user.lastname,
                                email: user.email,
                                wallet: user.wallet,
                            }),
                        });
                    }
                });
            } catch (error) {
                return res.serverError(error);
            }
        }
    },

};

