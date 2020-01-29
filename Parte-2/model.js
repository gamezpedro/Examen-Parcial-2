let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

/* Tu código va aquí */

let bookmarks = mongoose.Schema({
    id : {type: uuid.v4()},
    titulo : {type : String},
    description : {type : String},
    url : {type : String}
});

let bookmark = mongoose.model('bookmark', bookmarks);
let bookmarkList = {

    get : function(){
		return bookmark.find()
				.then( bookmark => {
					return bookmark;
				})
				.catch( error => {
					throw Error( error );
				});
    },
    put : function(filer, updatedInfo){
        return bookmark.updateOne(filer, updatedInfo)
                .then( bookmark => {
                    return bookmark;
                })
                .catch( err=> {
                    throw Error(err);   
                });
    },
};

module.exports = {bookmarkList};