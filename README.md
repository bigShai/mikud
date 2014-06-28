Mikud - מיקוד
=========

Gets an israeli zipcode by address. lightweight & simple.

Usage
--------------

```sh
npm install mikud
```
```sh
var mikud = require('mikud');
mikud({
    city: 'תל אביב',
    street: 'פרישמן',
    houseNumber: 7,
    entrance: 1
}, function(err, zipcode){
    if (!err) console.log(zipcode);
});
```
