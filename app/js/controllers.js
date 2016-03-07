'use strict';

/* Controllers */
var score18xxControlers = angular.module('score18xxControlers', []);

score18xxControlers.controller('score18xxControler',  function() {
  this.titulillo = "Titulillo"
});

score18xxControlers.controller('NuevaPartidaCtrl', function($scope, $http) {

  var _selected;

  //Rellenando número de jugadores  
  $scope.opcionJugadores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  $scope.numJugadores = 4;

  $scope.ngValidarFecha = function() {
      return angular.isUndefined($scope.fechaPartida) || $scope.fechaPartida === null;
  };
  
    $scope.ngModelOptionsSelected = function(value) {
    if (arguments.length) {
      _selected = value;
    } else {
      return _selected;
    }
  };

  $scope.modelOptions = {
    debounce: {
      default: 500,
      blur: 250
    },
    getterSetter: true
  };

  //Datepicker: fechas
  $scope.today = function() {
    $scope.fechaPartida = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: false,
    formatYear: 'yy',
    maxDate: new Date(2020, 12, 31),
    minDate: new Date(2010, 1, 1),
    startingDay: 1
  };

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.abreCalendario = function() {
    $scope.popup.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.fechaPartida = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'dd.MM.yyyy', 'dd MMM yyyy', 'shortDate'];
  $scope.indiceFormato=0;
  $scope.formatoFecha = $scope.formats[$scope.indiceFormato];
  $scope.altInputFormats = ['dd/MM/yyyy'];
  
  $scope.cambiaFormato = function() {
    var i=$scope.indiceFormato;
    $scope.indiceFormato = (i===3) ? 0 : i+1;
    $scope.formatoFecha = $scope.formats[$scope.indiceFormato];
  };

  $scope.popup = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }

  // Any function returning a promise object can be used to load values asynchronously
  $scope.getLocation = function(val) {
    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: val,
        sensor: true
      }
    }).then(function(response){
      return response.data.results.map(function(item){
        return item.formatted_address;
      });
    });
  };
  
  $scope.addPartida = function() {
   
    var params = {
        nombre: $scope.nombrePartida,
        jugadores: $scope.numJugadores,
        juego: $scope.juego,
        loc: $scope.lugarPartida,
        fecha: $scope.fechaPartida 
    };
    
    return $http.post('http://localhost:3000/api/partida', params).
        then(function(response){
            $scope.partida = response;
            console.log(response);
        });
   };
   
   $scope.getJuegos = function() {
      $http.get('http://localhost:3000/api/juegos')
        .then(function(response){
            $scope.juegos = response.data;
            $scope.juegosNombre = response.data.map(function(item){
                    return item._nombre;
            });
        },
        function(err){
            $scope.juego= "error";
            $scope.juegos = err;
        });
    };
    $scope.getJuegos();
});

