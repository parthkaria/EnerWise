/**
 * Created by mansi on 14/11/15.
 */
var Sequelize = require('sequelize');
//var sequelize = new Sequelize('postgres://rdpenjpi:YkKrx4t3SxVm3F54KGYIQ8ASfZ6_uy0g@pellefant.db.elephantsql.com:5432/rdpenjpi');
var dbConf=require('../config/dbconfig');
var sequelize=dbConf.sequelize;
var User = sequelize.define('user', {
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    createdAt: {
        field         : 'created_at',
        type          : Sequelize.DATE
    },
    updatedAt: {
        field         : 'updated_at',
        type          : Sequelize.DATE
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

//User.sync();
module.exports=User;