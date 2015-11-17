/**
 * Created by mansi on 15/11/15.
 */
var country = require('countryjs');
var cities = require('cities');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('config/helperdata.properties');

exports.getStates=function(req,res){
    var states=country.states(properties.get('country'));
    var stateJsonArr=[{"text":"----select----","value":"-1"}];
    states.forEach(function(state){
        stateJsonArr.push({"text":state,"value":state});
    });
    res.send(stateJsonArr);
}

exports.getCities=function(req,res){
    var cityArr = cities.findByState(req.params.state);
    var cityJsonArr=[{"text":"----select----","value":"-1"}];
    cityArr.forEach(function(city){
        cityArr.push({"text":city,"value":city});
    });
    res.send(cityArr);
}