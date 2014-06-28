var request = require('request');
var htmlparser = require("htmlparser");
var _ = require('underscore');

const ISRAEL_POST_URL = 'http://www.israelpost.co.il/zip_data1.nsf/SearchZip?OpenAgent&';

function objToParams(obj) {
    return Object.keys(obj).map(function (key) {
        return (!_.isEmpty(obj[key]))? key + '=' + encodeURIComponent(obj[key]) : '';
    }).join('&');
}


function getZipCode(city, street, houseNumber, entrance, callback) {

    var uri = ISRAEL_POST_URL + objToParams({
        Location: city,
        Street: street,
        House: houseNumber,
        Entrance: entrance
    });

    request.get(uri, {}, function(err, response, body) {
        if(err) return callback(err);

        new htmlparser.Parser(new htmlparser.DefaultHandler(function (error, dom) {
            if (error) return callback(err);

            try{
                var zipcode = parseInt(dom[0].children[3].children[0].data.substring(5));
                if (zipcode > 999999 && zipcode < 10000000) {
                    callback(undefined, zipcode);
                }
            } catch(err) {
                callback("Error getting zipcode");
            }

        })).parseComplete(body);
    });
}


function example() {
    var city = 'תל אביב';
    var street = 'פרישמן';
    var house = 16;

    getZipCode(city, street, house, undefined, function(err, zipcode){
        console.log(zipcode);
    })
}

module.exports = getZipCode;


