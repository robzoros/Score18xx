var authService = angular.module('AuthServiceModule', ['constantes']);
 
authService.service('AuthService', ['$q', '$http', 'API_ENDPOINT', '$rootScope',  function($q, $http, API_ENDPOINT, $rootScope) {
  var LOCAL_TOKEN_KEY = 'score18xxkey';
  var isAuthenticated = false;
 
  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }
 
  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }
 
  function useCredentials(token) {
    isAuthenticated = true;
    $rootScope.access_token = token;
  }
 
  function destroyUserCredentials() {
    $rootScope.access_token = undefined;
    isAuthenticated = false;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }
 
  var register = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + 'signup', user).then(function(result) {
        if (result.data.success) {
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      },
      function(err){
          console.log(err);
          reject(err.data);
      });
    });
  };
 
  var login = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + 'autenticar', user).then(function(result) {
        if (result.data.success) {
            storeUserCredentials(result.data.token);
            resolve(result.data.msg);
        } else {
            reject(result.data.msg);
        }
      },
      function(err){
          console.log(err);
          reject(err.data);
      });
    });
  };
  
  var logout = function() {
    destroyUserCredentials();
  };
  
  var userInfo = function() {
    return $q(function(resolve, reject) {
      $http.get(API_ENDPOINT.url + 'userinfo').then(function(result) {
        if (result.data.success) {
            console.log(result.data);
            resolve(result.data);
        } else {
            console.log(result.data);
            reject(result.data.msg);
        }
      });
    });
  };
  
  var reset = function(user) {
    return $q(function(resolve, reject) {
      $http.put(API_ENDPOINT.url + 'signup', user).then(function(result) {
        if (result.data.success) {
            resolve(result.data.msg);
        } else {
            reject(result.data.msg);
        }
      },
      function(err){
          console.log(err);
          reject(err.data);
      });
    });
  };

  var cambiar = function(user) {
    return $q(function(resolve, reject) {
      $http.put(API_ENDPOINT.url + 'autenticar', user).then(function(result) {
        if (result.data.success) {
            storeUserCredentials(result.data.token);
            resolve(result.data.msg);
        } else {
            reject(result.data.msg);
        }
      },
      function(err){
          console.log(err);
          reject(err.data);
      });
    });
  };
 
  loadUserCredentials();
 
  return {
    login: login,
    register: register,
    logout: logout,
    userInfo: userInfo,
    reset: reset,
    cambiar: cambiar,
    isAuthenticated: function() {return isAuthenticated;}
  };
}]);
 