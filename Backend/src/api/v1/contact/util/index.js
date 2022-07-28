const moment = require('moment');
const appRoot = require('app-root-path');
const Timing = require(appRoot + '/src/models/timing');

module.exports = {
    // In this method we will build query to get events
    buildQuery: async (params) => {
        try {
            let query = {};
            if (params.type) {
                query = {
                    ...query,
                    type: params.type,
                };
            }
            return query;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

}