var express = require('express');
var app = express();//Instancia del servidor Express
var bodyParser = require('body-parser');
var pg = require('pg');

//Cadena de conexion
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:dd197358@localhost:5432/musikDB';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Puerto del servidor
var port = process.env.PORT || 5000;

var pg = require('pg');

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT * FROM Artists ORDER BY artist_id ASC;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
  res.send('Mi Api');
	//res.render('index');
});
/*Artistas*/
app.get('/Artists',function(req, res){
  var Artists = [];

  pg.connect(connectionString, function(error, client, done){
    if (error){
      done();
      console.error('Error en la obtencion de listado de Artistas', error);
      return res.status(500).json({
        success:false,
        message:error
      });
    }

    var query = client.query('SELECT * FROM Artists ORDER BY artist_id ASC;');

    query.on('row', function(row){
      Artists.push(row);
    });

    query.on('end',function(){
      done();
      return res.json(Artists);
    });
  });
});

app.post('/Artists',function(req, res){
  var Artists = {
    "artist_id": 226594,
    "artist_name": "David",
    "artist_last_name": "Duarte",
    "artist_genre": "Rock",
    "artist_rating": 75
  };
  pg.connect(connectionString, function(error, client, done){
    //manejo de errores de conexion
    if(error){
      done();
      console.log(error);
      res.status(500).json({"success" : false, "message": error});
    }

    var query = client.query('INSERT INTO Artists (artist_id, artist_name, artist_last_name, artist_genre, artist_rating) values($1, $2, $3 ,$4, $5)', [Artists.artist_id, Artists.artist_name, Artists.artist_last_name,Artists.artist_genre,Artists.artist_rating]);

    query.on('end', function(){
      done();
      res.status(201).json(Artists);
    });
  });
});

app.post('/Artists',function(req, res){
  var Artists = {
    "artist_id": req.body.artist_id,
    "artist_name": req.body.artist_name,
    "artist_last_name": req.body.artist_last_name,
    "artist_genre": req.body.artist_genre,
    "artist_rating": req.body.artist_rating
  };
  pg.connect(connectionString, function(error, client, done){
    //manejo de errores de conexion
    if(error){
      done();
      console.log(error);
      res.status(500).json({"success" : false, "message": error});
    }

    var query = client.query('INSERT INTO Artists (artist_id, artist_name, artist_last_name, artist_genre, artist_rating) values($1, $2, $3 ,$4, $5)', [Artists.artist_id, Artists.artist_name, Artists.artist_last_name,Artists.artist_genre,Artists.artist_rating]);

    query.on('end', function(){
      done();
      res.status(201).json(Artists);
    });
  });
});

/*Albums*/

app.get('/Albums',function(req, res){
  var Albums = [];

  pg.connect(connectionString, function(error, client, done){
    if (error){
      done();
      console.error('Error en la obtencion de listado de Albums', error);
      return res.status(500).json({
        success:false,
        message:error
      });
    }

    var query = client.query('SELECT * FROM Albums ORDER BY album_id ASC;');

    query.on('row', function(row){
      Albums.push(row);
    });

    query.on('end',function(){
      done();
      return res.json(Albums);
    });
  });
});

app.post('/Albums',function(req, res){
  var Albums = {
    "album_id": 46549,
    "album_name": "Grace",
    "album_rating": 85,
    "album_record_label": "Jhonson",
    "artist_id": 226594
  };
  pg.connect(connectionString, function(error, client, done){
    //manejo de errores de conexion
    if(error){
      done();
      console.log(error);
      res.status(500).json({"success" : false, "message": error});
    }

    var query = client.query('INSERT INTO Albums (artist_id, album_id, album_name, album_rating, album_record_label) values($1, $2, $3 ,$4, $5)', [Albums.artist_id,Albums.album_id,Albums.album_name,Albums.album_rating, Albums.album_record_label]);

    query.on('end', function(){
      done();
      res.status(201).json(Albums);
    });
  });
});

app.post('/Albums',function(req, res){
  var Albums = {
    "album_id": req.body.album_id,
    "album_name": req.body.album_name,
    "album_rating": req.body.album_rating,
    "album_record_label": req.body.album_record_label,
    "artist_id": req.body.artist_id
  };
  pg.connect(connectionString, function(error, client, done){
    //manejo de errores de conexion
    if(error){
      done();
      console.log(error);
      res.status(500).json({"success" : false, "message": error});
    }

    var query = client.query('INSERT INTO Albums (artist_id, album_id, album_name, album_rating, album_record_label) values($1, $2, $3 ,$4, $5)', [Albums.artist_id,Albums.album_id,Albums.album_name,Albums.album_rating, Albums.album_record_label]);

    query.on('end', function(){
      done();
      res.status(201).json(Albums);
    });
  });
});

/*Songs*/

app.get('/Songs',function(req, res){
  var Songs = [];

  pg.connect(connectionString, function(error, client, done){
    if (error){
      done();
      console.error('Error en la obtencion de listado de Albums', error);
      return res.status(500).json({
        success:false,
        message:error
      });
    }

    var query = client.query('SELECT * FROM Songs ORDER BY album_id ASC;');

    query.on('row', function(row){
      Songs.push(row);
    });

    query.on('end',function(){
      done();
      return res.json(Songs);
    });
  });
});

app.post('/Songs',function(req, res){
  var Songs = {
    "album_id": 46549,
    "song_name": "Perfect Love",
    "song_rating": 80,
    "song_duration": 7,
    "song_advisory": "None"
  };
  pg.connect(connectionString, function(error, client, done){
    //manejo de errores de conexion
    if(error){
      done();
      console.log(error);
      res.status(500).json({"success" : false, "message": error});
    }

    var query = client.query('INSERT INTO Songs (album_id, song_name, song_rating, song_duration, song_advisory) values($1, $2, $3 ,$4, $5)', [Songs.album_id, Songs.song_name, Songs.song_rating, Songs.song_duration, Songs.song_advisory]);

    query.on('end', function(){
      done();
      res.status(201).json(Songs);
    });
  });
});

app.post('/Songs',function(req, res){
  var Songs = {
    "album_id": req.body.album_id,
    "song_name": req.body.song_name,
    "song_rating": req.body.song_rating,
    "song_duration": req.body.song_duration,
    "song_advisory": req.body.song_advisory
  };
  pg.connect(connectionString, function(error, client, done){
    //manejo de errores de conexion
    if(error){
      done();
      console.log(error);
      res.status(500).json({"success" : false, "message": error});
    }

    var query = client.query('INSERT INTO Songs (album_id, song_name, song_rating, song_duration, song_advisory) values($1, $2, $3 ,$4, $5)', [Songs.album_id, Songs.song_name, Songs.song_rating, Songs.song_duration, Songs.song_advisory]);

    query.on('end', function(){
      done();
      res.status(201).json(Songs);
    });
  });
});



var server = app.listen(port, function(){
  //var port = server.address().port;
  console.log('Api en ejecucion:', port);
  console.log('Base de Datos:',connectionString);

});
