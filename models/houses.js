/**
 * Created by mansi on 15/11/15.
 */
var Sequelize = require('sequelize');
//var sequelize = new Sequelize('postgres://rdpenjpi:YkKrx4t3SxVm3F54KGYIQ8ASfZ6_uy0g@pellefant.db.elephantsql.com:5432/rdpenjpi');
var dbConf=require('../config/dbconfig');
var sequelize=dbConf.sequelize;
var Houses = sequelize.define('houses', {
    id:{
        field:'house_id',
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    address: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip: Sequelize.STRING,
    status: {
        type:   Sequelize.ENUM,
        values: ['pending', 'completed']
    },
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
Houses.sync();
module.exports=Houses;
module.exports.sequelize=sequelize;