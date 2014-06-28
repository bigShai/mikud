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
        if(err) return callback("Error calling israelpost");

        var res = body.substring(body.indexOf('RES'), body.indexOf('</body>'));
        if (res.indexOf('RES8') == 0) {
            callback(undefined, res.substring(4));
        } else {
            callback('Unrecognized address');
        }
    });
}

module.exports = getZipCode;


