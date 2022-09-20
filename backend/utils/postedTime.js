'use strict';

const moment = require('moment');
moment.locale('fr');

/* GET TIME IN FR FORMAT */
module.exports = () => {
  const time = moment.now();
  return moment(time).format('LLLL');
};
