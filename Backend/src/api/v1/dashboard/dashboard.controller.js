const appRoot = require('app-root-path');
const Contact = require(appRoot + '/src/models/contact');
const User = require(appRoot + '/src/models/user');
const Mosques = require(appRoot + '/src/models/mosque');
const appConstants = require(appRoot + '/src/constants/app-constants');
const {status, messages} = appConstants;
const moment = require('moment')
const datesArrayUtil = require('./util/stats-common-util/date-range');
const dashboardCommonUtil = require('./util/stats-common-util/format-date');

class DashboardController {

    getAdminDashboardStats = async (req, res) => {
        try {
            const startOfDate = moment().startOf('month').toString()
            const endOfDate = moment().endOf('month').toString()
            const query = {
                createdAt: {$gte: startOfDate, $lte: endOfDate}
            };
            const totalMosques = await Mosques.countDocuments(query);
            const totalContact = await Contact.countDocuments({ ...query, type: 'contact' });
            const totalComplains = await Contact.countDocuments({ ...query, type: 'complain' });
            const totalUsers = await User.countDocuments({});
            let mosquesArray = [];
            const startYear = moment(new Date()).startOf('year')
            const endYear = moment(new Date()).endOf('year')
            const dates = await datesArrayUtil.dateRange(startYear, endYear);
            const getMosques = dates.map(async (date) => {
                const finishDate = moment(date).endOf('month')
                const bookings = await Mosques.find({
                   createdAt: { $gte: date, $lte: finishDate }
                });
                const formateDate = await dashboardCommonUtil.formatDate(date);
                const dailyUser = {}
                dailyUser.x = formateDate;
                dailyUser.y = bookings;
                return dailyUser;
            });
            mosquesArray = await Promise.all(getMosques);
            const dataToReturn = {
                totalMosques,
                totalContact,
                totalUsers,
                mosquesArray,
                totalComplains,
            }
            return res.status(status.success).json({
                message: 'Stats found Successfully.',
                data: dataToReturn,
            });
        } catch (err) {
            console.log(err);
            return res.status(status.serverError).json({
                message: messages.serverErrorMessage
            });
        }
    }
}


module.exports = new DashboardController();
