var express = require('express'),
    player = require('./routes/players');

    //team = require('./routes/teams'),
    //tournament = require('./routs/tournaments');

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
});

app.get('/players', player.findAll);
app.get('/players/:id', player.findById);
//app.get('/players/:teamid', player.findByTeamId);

//app.get('/teams', team.findAll);
//app.get('/teams/:id', team.findById);

//app.get('/tournaments', team.findAll);
//app.get('/tournaments/:id', team.findById);

app.post('/players', player.addPlayer);
//app.post('/teams', team.addTeam);
//app.post('/tournaments', tournament.addTournament);

app.put('/players/:id', player.updatePlayer);
//app.put('/teams/:id', team.updateTeam);
//app.put('/tournaments/:id', tournament.updateTournament);

app.delete('/players/:id', player.deletePlayer);
//app.delete('/teams/:id', team.deleteTeam);
//app.delete('/tournaments/:id', tournament.deleteTournament);

app.listen(3000);