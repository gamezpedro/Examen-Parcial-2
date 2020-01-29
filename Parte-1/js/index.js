let url = "https://restcountries.eu/rest/v2/name/"
let key;

function displayResults(responseJSON){
    console.log(responseJSON);
    if(responseJSON.status(404)){
        alert ("Pais no existente");
    }
    else{
        $(".js-search-results").empty();
        $(".js-search-results").append(`
            <h1>${responseJSON[0].name}</h1>
            <h3> Capital: ${responseJSON[0].capital}</h3>
            <img src="${responseJSON[0].flag}">
            <h3>Población</h3>
            <p>${responseJSON[0].population}</p>
            <h3>Región</h3>
            <p>${responseJSON[0].region}</p>
            <h3> Zonas Horarias:</h3> 
            <p>${responseJSON[0].timezones}</p>
            <h3> Paises con los que colinda </h3>
            <ul> ${responseJSON[0].borders}</ul>
            
        `);
    }
}

function fetchCountry(){
    $.ajax({
        url : (url+ key),
        method : "GET",
        dataType : "json",
        success : function( responseJSON ){
        displayResults( responseJSON );
        },
        error : function( err ){
        console.log( err );
        }
    });
}

function watchform(){
    $("#button").on('click', function(e){
        e.preventDefault();
        key = $("#query").val();
        fetchCountry();
    });
    $("#query").val("");
}

function init(){
    watchform();
}

init();