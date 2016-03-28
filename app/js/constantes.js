var constantes = angular.module('constantes', []);

constantes.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
});
 
constantes.constant('API_ENDPOINT', {
  url: 'https://localhost:3000/api/',
  proxy: 'https://localhost:3000/proxy/'
});

constantes.constant('BGG_URL', {
    url: 'http://www.boardgamegeek.com/boardgame/'
});