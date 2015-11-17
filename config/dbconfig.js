/**
 * Created by mansi on 15/11/15.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://rdpenjpi:YkKrx4t3SxVm3F54KGYIQ8ASfZ6_uy0g@pellefant.db.elephantsql.com:5432/rdpenjpi');
module.exports.sequelize=sequelize;