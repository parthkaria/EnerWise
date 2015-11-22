/**
 * Created by mansi on 18/11/15.
 */

var Houses=require('../models/houses');
var UserHouse=require('../models/user_house');
var User=require('../models/user');
var HouseInfo=require('../models/house_info');

exports.createHome=function(homeObj){
    Houses.build({
        address:homeObj.address,
        city:homeObj.city,
        state:homeObj.state.value,
        zip:homeObj.zip,
        status:'pending'
    }).save().then(function(response){
        console.log("House saved successfully-"+response);
        createHouseInfo(response);

    }).catch(function(error){
        console.log("oops!"+error);
    });
};

createHouseInfo=function(houseObj){
    HouseInfo.build({
        primary: houseObj
    }).save().then(function(response){
        console.log('House Info saved');
        createUserHouse(response);
    }).catch(function(error){
        console.log('error saving House Info-'+error);
    });
};

createUserHouse=function(houseInfoObj){
    UserHouse.build({
        user_id: User.build({id:9}),
        home_info_id:houseInfoObj
     }).save().then(function(response){
        console.log('User House saved');
     }).catch(function(error){
        console.log('Error saving User House-'+error);
     });
}
