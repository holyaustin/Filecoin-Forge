/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

var CronJob = require('cron').CronJob;

module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  sails.io.on('connection', function (socket) {
    socket.on('subscribe', function (data) {
      sails.sockets.join(socket, data.room, function (err) {

        if (!err) {
          console.log('>> ' + socket.id + ' subscribed to room ' + data.room);
        } else {
          console.log('>> error subscribing socket');
        }

      });
    });

    socket.on('update', function (data) {
      sails.sockets.broadcast(data.room, data.event, data.payload);
    });

  });

};
