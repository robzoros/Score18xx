'use strict';

/* Services */
var score18xxFactory = angular.module('score18xxFactory', ['constantes']);

score18xxFactory.factory('bggJuegoFactory', ['$http','$sce', 'API_ENDPOINT', 'BGG_URL', function($http, $sce, API_ENDPOINT, BGG_URL){
    var callbggJuegos = function(id){
        return $http.get(API_ENDPOINT.proxy + BGG_URL.api + id, { 
            transformResponse:function(data) {
                // convert the data to JSON and provide
                // it to the success function below
                var x2js = new X2JS();
                var json = x2js.xml_str2json( data );
                return json;
            }
        });
    };
        
    // Función que realiza la transformación de lo recibido de BGG
    var getbggDatos = function(item) {
        var juego = {};
        juego.thumbnail = item.thumbnail;
        juego.yearpublished = item.yearpublished._value;
        juego.description = $sce.trustAsHtml(item.description.replace(/&#10;/g,"<br>"));
        juego.minplayers = item.minplayers._value;
        juego.maxplayers = item.maxplayers._value;
        juego.playingtime = item.playingtime._value;
        juego.designer = item.link.filter(function(a){ return a._type === 'boardgamedesigner'; });
        juego.artist = item.link.filter(function(a){ return a._type === 'boardgameartist'; });
        juego.family = item.link.filter(function(a){ return a._type === 'boardgamefamily' && a._value === '18xx' ; });
        juego._id = item._id;

        if ($.isArray(juego.designer)) {
            var des = "";
            for (var i= 0; i<juego.designer.length;i++) {
                des += (i>0 && i<(juego.designer.length)) ? ", " : "";
                des += juego.designer[i]._value;
            }
            juego.designer = des;
        }

        if ($.isArray(juego.artist)) {
            var art = "";
            for (var i= 0; i<juego.artist.length;i++) {
                art += (i>0 && i<(juego.artist.length)) ? ", " : "";
                art += juego.artist[i]._value;
            }
            juego.artist = art;
        }

        if ($.isArray(item.name)) 
            juego.name = item.name[0]._value;
        else
            juego.name = item.name._value;
        console.log(juego);
        return juego;
    };
    
    var linkbgg = function(bggid){
        return BGG_URL.url + bggid;
    };
  
    return {
        getbggDatos: getbggDatos,
        callbggJuegos: callbggJuegos,
        linkbgg: linkbgg
    };
}]);
  
