/**
 * Created by mansi on 15/11/15.
 */
var Sequelize = require('sequelize');
//var sequelize = new Sequelize('postgres://rdpenjpi:YkKrx4t3SxVm3F54KGYIQ8ASfZ6_uy0g@pellefant.db.elephantsql.com:5432/rdpenjpi');
var User=require('../models/user');
var HouseInfo=require('../models/house_info');
var dbConf=require('../config/dbconfig');
var sequelize=dbConf.sequelize;

var UserHouse = sequelize.define('user_house', {
    user_id:{
        type: Sequelize.INTEGER,

        references: {
            // This is a reference to another model
            model: User,

            // This is the column name of the referenced model
            key: 'id',

            // This declares when to check the foreign key constraint. PostgreSQL only.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    home_info_id:{
        type: Sequelize.INTEGER,

        references: {
            // This is a reference to another model
            model: HouseInfo,

            // This is the column name of the referenced model
            key: 'id',

            // This declares when to check the foreign key constraint. PostgreSQL only.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
});

UserHouse.sync();
module.exports=UserHouse;