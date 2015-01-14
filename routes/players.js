var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('lsmdb', server);

db.open(function(err, db) {
    if(!err) {
        db.collection('players', {strict:true}, function(err, collection) {
            if (err) {
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    db.collection('players', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('players', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addPlayer = function(req, res) {
    var player = req.body;
    db.collection('players', function(err, collection) {
        collection.insert(player, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(result[0]);
            }
        });
    });
}

exports.updatePlayer = function(req, res) {
    var id = req.params.id;
    var player = req.body;
    db.collection('players', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, player, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(player);
            }
        });
    });
}

exports.deletePlayer = function(req, res) {
    var id = req.params.id;
    db.collection('players', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist..
var populateDB = function() {

    var players = [
        {
            firstname: "John",
            lastname: "Smith",
            email: "jsmith@gmail.com",
            teamid: null,
            rating: "10"
        },
        {
            firstname: "Mike",
            lastname: "Davis",
            email: "mdavis@gmail.com",
            teamid: null,
            rating: "7"
        }];

    db.collection('players', function(err, collection) {
        collection.insert(players, {safe:true}, function(err, result) {});
    });

};