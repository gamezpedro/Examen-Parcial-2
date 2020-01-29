let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require( './config' );
let{ bookmarkList } = require('./model');


let app = express();

let server;

/* Tu código va aquí */
app.put( '/api/bookmarks/:id',jsonParser, ( req, res ) => {
	let id = req.body.id;
	let id2 = req.params.id;
	let title = req.body.title;
	let description = req.body.description;
	let url = req.body.url;

	if(!id){
		res.statusMessage = "Missing Field ID";
		return res.status( 406 ).send();
	}
	else if(id !== id2){
		res.statusMessage = "ID's do not Match";
		return res.status( 409 ).json();
	}
	else if (!title && !description && !url){
		res.statusMessage = "No changed Data";
		return res.status( 406 ).json();
	}
	bookmarkList.put({ id : id }, req.body)
       .then(bookmark => {
           res.status(202).json(bookmark);
       })
       .catch(err => {
           res.statusMessage = "Missing field in body";
           return res.status(500).json({
           });
       });
});


function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}