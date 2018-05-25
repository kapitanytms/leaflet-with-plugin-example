var express = require("express");
var myParser = require("body-parser");
var app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



app.use(myParser.json());


app.get('/geojson', function (request, response) {

    function getRandomInRange(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
        // .toFixed() returns string, so ' * 1' is a trick to convert to number
    }

    function getRandomLocations(num) {
        var locations = [];
        var temp = ["customer", "wallet"];
        for (var i = 0; i < num; i++) {
            locations.push(
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [getRandomInRange(-180, 180, 3), getRandomInRange(-90, 90, 3)]
                    },
                    properties: {
                        title: temp[Math.floor(Math.random() * temp.length)]
                    }
                }
            )
        }
        return locations;
    }

    var features = {
        type: 'FeatureCollection',
        features: getRandomLocations(10)
    };
    var json = JSON.stringify(features);
    // console.log(json);
    response.end(json);
});

//RECENT LOCATION
app.get( '/locations', function ( request, response ) {
    var json = JSON.stringify(
        {
            locations: [
                'Hamburg, Germany',
                'Szeged, Hungary',
                'Barcelona, Spain',
                'Rome, Italy',
                'Los Angeles, US',
                'New York, US',
                'Pennsilvania, US',
                'Stockholm, Sweden',
                'London, United Kingdom',
                'Sydney, Australia'
            ]
        }
    );
    response.end(json);
});

//CUSTOMERS TOTAL
app.get( '/customers-total', function ( request, response ) {
    var res = "23 893 802";
    response.end(res);
});
//ACTIONS TOTAL
app.get( '/actions-total', function ( request, response ) {
    var res = "32 485 853 494";
    response.end(res);
});

//ACTIVE CUSTOMERS
app.get( '/active-customers', function ( request, response ) {
    var res = "376 362";
    response.end(res);
});

//OPENED WALLETS
app.get( '/opened-wallets', function ( request, response ) {
    var res = "1 078 922";
    response.end(res);
});

app.listen(8100);