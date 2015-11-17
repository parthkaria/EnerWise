/**
 * Created by mansi on 15/11/15.
 */
var Sequelize = require('sequelize');
//var sequelize = new Sequelize('postgres://rdpenjpi:YkKrx4t3SxVm3F54KGYIQ8ASfZ6_uy0g@pellefant.db.elephantsql.com:5432/rdpenjpi');
var Houses=require('../models/houses');
var dbConf=require('../config/dbconfig');
var sequelize=dbConf.sequelize;
var HouseInfo = sequelize.define('house_info', {
    primary: {
        type: Sequelize.INTEGER,

        references: {
            // This is a reference to another model
            model: Houses,

            // This is the column name of the referenced model
            key: 'house_id',

            // This declares when to check the foreign key constraint. PostgreSQL only.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    houses_of_interest:Sequelize.ARRAY({
        type: Sequelize.INTEGER,

        references: {
            // This is a reference to another model
            model: Houses,

            // This is the column name of the referenced model
            key: 'house_id',

            // This declares when to check the foreign key constraint. PostgreSQL only.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }),
    number_of_adults:{
        type:Sequelize.INTEGER,
        allowNull: true
    },
    number_of_children:{
        type:Sequelize.INTEGER,
        allowNull: true
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
HouseInfo.sync();
module.exports=HouseInfo;