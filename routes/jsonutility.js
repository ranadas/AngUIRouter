var _string = require("underscore.string");

module.exports = {
    cleanText: function (text) {
        // clean it and return
        console.log('in CLean Text *** ' + _string(text).trim().capitalize().value());
    },
    isWithinRange: function (text, min, max) {
        // check if text is between min and max length
        console.log(_string.sprintf('***%s  in isWithinRange?', text));
    },

    // credit : http://techslides.com/how-to-parse-and-search-json-in-javascript
    //return an array of objects according to key, value, or key and value matching
    getObjects: getObjects,
    //return an array of values that match on a certain key
    getValues: getValues,
    //return an array of keys that match on a certain value
    getKeys: getKeys
};


function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == '') {
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1) {
                objects.push(obj);
            }
        }
    }
    return objects;
}

function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}

function getKeys(obj, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getKeys(obj[i], val));
        } else if (obj[i] == val) {
            objects.push(i);
        }
    }
    return objects;
}