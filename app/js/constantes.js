var constantes = angular.module('constantes', []);

constantes.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
});
 
constantes.constant('API_ENDPOINT', {
  // url: 'https://score18xxapirest-zoroastro.rhcloud.com/api/',
  //proxy: 'https://score18xxapirest-zoroastro.rhcloud.com/proxy/'
  url: 'https://127.0.0.1:3000/api/',
  proxy: 'https://127.0.0.1:3000/proxy/'
});

constantes.constant('BGG_URL', {
    url: 'http://www.boardgamegeek.com/boardgame/',
    api: '?url=http://www.boardgamegeek.com/xmlapi2/thing?id='
});

constantes.constant('GENERAL', {
    entrada: '/nueva'
});