const moment = require("moment");
const appRoot = require("app-root-path");
const Timing = require(appRoot + "/src/models/timing");
const User = require(appRoot + "/src/models/user");

module.exports = {
  // In this method we will build query to get events
  buildQuery: async (params) => {
    try {
      let query = {};
      if (params.name) {
        query = {
          ...query,
          name: { $regex: params.name.trim(), $options: "i" },
        };
      }
      if (params.is_verified) {
        const findVerifiedUsers = await User.find({
          is_verified: params.is_verified,
        }).distinct("_id");
        query = {
          ...query,
          user_id: { $in: findVerifiedUsers },
        };
      }
      if (params.lat) {
        query = {
          ...query,
          lat: { $gte: params.lat },
        };
      }
      if (params.lng) {
        query = {
          ...query,
          lng: { $gte: params.lng },
        };
      }
      // if (params.address || params.city || params.state) {
      //     const orCondition = [{address: {$regex: new RegExp("^" + params.address.toLowerCase(), "i")}}]
      //     if (params.city) {
      //         orCondition.push({city: {$regex: new RegExp("^" + params.city.toLowerCase(), "i")}})
      //     }
      //     if (params.state) {
      //         orCondition.push({state: {$regex: new RegExp("^" + params.state.toLowerCase(), "i")}})
      //     }
      //     query = {
      //         ...query,
      //         $or: orCondition,
      //     };
      // }
      return query;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  populateData: async (mosques) => {
    try {
      for (const mosque of mosques) {
        let timings = await Timing.findOne({ mosque_id: mosque._id });
        mosque.timings = timings;
      }
      return mosques;
    } catch (error) {
      return mosques;
    }
  },
};
