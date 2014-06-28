var request = require('request');
var htmlparser = require("htmlparser");
var _ = require('underscore');

const ISRAEL_POST_URL = 'http://www.israelpost.co.il/zip_data1.nsf/SearchZip?OpenAgent&';

function objToParams(obj) {
    return Object.keys(obj).map(function (key) {
        return (!_.isEmpty(obj[key]))? key + '=' + encodeURIComponent(obj[key]) : '';
    }).join('&');
}


function getZipCode(address, callback) {

    var uri = ISRAEL_POST_URL + objToParams({
        Location: address.city,
        Street: address.street,
        House: address.houseNumber,
        Entrance: address.entrance
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

module.exports = getZipCode;


