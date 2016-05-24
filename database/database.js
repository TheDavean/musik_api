var pg =require ('pg');
//Cadena de conexion
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:dd197358@localhost:5432/musikDB';

//Cliente de postgres
var pgClient = new pg.Client(connectionString);

//Se inicia el cliente
pgClient.connect();

var query = pgClient.query('CREATE TABLE Artists(artist_id INTEGER NOT NULL,artist_name VARCHAR(30) NULL,artist_last_name VARCHAR(30) NULL,artist_genre VARCHAR(30) NULL,artist_rating NUMERIC(10) );');
var query = pgClient.query('CREATE TABLE Albums(album_id INTEGER NOT NULL,album_name VARCHAR(30) NULL,album_rating NUMERIC(10) NULL,album_record_label VARCHAR(18) NULL,artist_id INTEGER NULL);');
var query = pgClient.query('CREATE TABLE Songs(album_id INTEGER NOT NULL,song_name VARCHAR(30) NULL,song_duration NUMERIC(10) NULL,song_advisory VARCHAR(30) NULL,song_rating NUMERIC(10));');
var query = pgClient.query('ALTER TABLE Albums ADD CONSTRAINT XPKAlbums PRIMARY KEY (album_id);');
var query = pgClient.query('ALTER TABLE Artists ADD CONSTRAINT XPKArtists PRIMARY KEY (artist_id);');
var query = pgClient.query('ALTER TABLE Songs ADD CONSTRAINT XPKSongs PRIMARY KEY (album_id);');
var query = pgClient.query('ALTER TABLE Albums ADD CONSTRAINT R_9 FOREIGN KEY (artist_id) REFERENCES Artists (artist_id);');
var query = pgClient.query('ALTER TABLE Songs ADD CONSTRAINT R_6 FOREIGN KEY (album_id) REFERENCES Albums (album_id);');
var query = pgClient.query('ALTER TABLE Artists ADD CONSTRAINT CH_1 CHECK (artist_rating>=0 AND artist_rating<=100);');
var query = pgClient.query('ALTER TABLE Albums ADD CONSTRAINT CH_1 CHECK (album_rating>=0 AND album_rating<=100);');
var query = pgClient.query('ALTER TABLE Songs ADD CONSTRAINT CH_1 CHECK (song_rating>=0 AND song_rating<=100);');

query. on('end', function(){
  pgClient.end();
});
