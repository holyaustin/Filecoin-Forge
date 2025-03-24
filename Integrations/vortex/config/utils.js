module.exports.utils = {

    campaigns: async function(cb) {
        // Get User Effect Account
        var user = await User.findOne({
            id: '61c1ff4e1a6b691ad4d94d70'
        });

        var client = await sails.helpers.connect.with({
            private_key: user.effect_account.privateKey,
        }).tolerate('issues', (error)=>{
            sails.log.warn(error);
        });

        console.log(':: Loading...');

        const all_campaigns = await client.force.getCampaigns(null, 100);
        var campaigns = [];

        console.log(':: Got it');

        // campaigns = all_campaigns.rows.filter(campaign => campaign.owner[1] === user.effect_account.accountName);

        // console.log(campaigns.length);

        all_campaigns.rows.forEach(async campaign => {
            campaign.id_effect_network = campaign.id,
            delete campaign.id;

            let get_campaign = await Campaign.findOne({
                id_effect_network: campaign.id_effect_network
            });

            if (get_campaign) {
                let update_campaign = await Campaign.update({
                    id_effect_network: campaign.id_effect_network
                }, campaign);
            } else {
                let new_campaign = await Campaign.create(campaign);
            }
        });

        console.log(`:: 🥇  Campaigns Saved`);

        return cb(null, true);
    },

    batches: async function(cb) {
        try {
            // Get User Effect Account
            var user = await User.findOne({
                id: '61c1ff4e1a6b691ad4d94d70'
            });

            var client = await sails.helpers.connect.with({
                private_key: user.effect_account.privateKey,
            }).tolerate('issues', (error)=>{
                sails.log.warn(error);
            });

            console.log(':: Loading...');
            
            const batches = await client.force.getBatches('', -1);

            console.log(':: Got Batches from SDK');

            console.log(':: Saving Records...');

            batches.rows.forEach(async batch => {
                batch.id_effect_network = batch.id,
                delete batch.id;

                let get_batch = await Batch.findOne({
                    batch_id: batch.batch_id
                });

                if (get_batch) {
                    let update_batch = await Batch.update({
                        batch_id: batch.batch_id
                    }, batch);
                } else {
                    let new_batch = await Batch.create(batch);
                }

            });

            console.log(':: Batches Saved');

            return cb(null, true);

        } catch (error) {
            return cb(error);
        }
    }

}