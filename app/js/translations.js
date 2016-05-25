angular.module('gettext').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('en_US', {"¡Atención!":"Note!","¡Cuidado!":"Warning!","¡Error!":"Error","¡Ha ocurrido un error!":"Something went wrong!","¡Las contraseñas no coinciden!":"Passwords do not match!","¿Has olvidado tu contraseña? pulsa":"Forgot your password? click","Acciones por jugador":"Shares by player","Añade un nuevo juego":"Add new game","Añadir":"Add","Añadir empresa":"Add Company","Añadir Empresa":"Add Company","Añadir todas las empresas":"Add all companies","aquí":"here","Artista :":"Artist :","Autor :":"Author :","Bienvenido a Score18xx, {{score18xxCtrl.user.name}}":"Welcome to Score18xx, {{score18xxCtrl.user.name}}","Borrar juego":"Remove game","Borrar partida":"Remove game played","Calcula dividendos":"Get Dividends","Calcula Dividendos":"Get Dividends","Calcular":"Proceed","Calcular Dividendos":"Get Dividends","Cambiar contraseña":"Change password","Cambiar Contraseña":"Change Password","Cancelar":"Cancel","Cerrar":"Close","Comparte":"Share","Comparte tu partida:":"Share you play","Confirma Contraseña":"Confirm Password","Confirmar nueva contraseña":"Confirm new password","Contacta":"Contact","Continuar":"Next","Contraseña":"Password","Contraseña actual":"Current password","Contraseña creada":"Password created","Crea tu partida":"New Game Play","Crea una partida":"New game play","Crear Partida":"Save","Cuenta":"Profile","Datos de la partida":"Game play data","Datos del juego":"Game data","Detalles":"Details","Dividendos":"Dividends","Dividendos a repartir":"Dividends to pay","Dividendos por Acción":"Dividends per share","Dividendos repartidos":"Dividends paid","Editar juego":"Edit Game","Efectivo":"Cash","Eige Nuevo idioma:":"New language","El dividendo repartido no es múltiplo de 10.":"Revenue is not multiple of 10","El idioma se ha cambiado correctamente":"The language has been changed correctly","El juego elegido no parece pertenecer a la familia de juegos 18xx.":"The game doesn't belong to 18xx family","El juego introducido no está dado de alta en BGG.":"The game doesn't exist in BGG","El nombre de la partida es un campo obligatorio.":"The name of the game play is mandatory","El nombre del juego es un campo obligatorio.":"The name of the game is mandatory","El usuario":"The user","Elegir empresas con valor":"Choose companies","Elige vista de resultados":"Choose view results","Eliminar":"Remove","Empresa":"Company","Empresas":"Companies","Error de conexión":"Conexion error","Error en cambio de contraseña":"Password change failed","Error en registro de usuario":"User registry failed","Fecha":"Date","Fecha de Partida":"Date of Game Play","Formato de Fecha:":"Date Format","Gráfico":"Graphic","Herramientas <span class=\"caret\"></span>":"Tools <span class=\"caret\"></span>","Identificador":"Identifier","Identificador Bgg":"Bgg Id","Idioma:":"Language:","Ingresos":"Revenues","Juego":"Game","Juego de la serie":"18XX Game","Juego elegido":"Game chosen","Juegos":"Games","Jugador":"Player","Jugador {{$index+1}}":"Player {{$index+1}}","Jugadores":"Players","Jugadores :":"Players :","La aplicación sólo guarda como datos personales el nombre del usuario, la password que se almacena perfectamente encriptada y el correo eléctrónico\n            que sólo se utilizará en caso de olvido de contraseña. Si un usuario ha olvidado la contraseá podrá solicitar que se cree una nueva contraseña que \n            se recibirá por el correo electrónico previamnete informado.":"User name, password - that is stored ecncrypted- and email -that only will be used in case of password reseted- are the only personal data stored by the aplication.\nIf an user forgets his password, he could ask for a new password that will be sent by email.","La empresa no puede ser un texto vacío":"Company can be an empty field","La empresa ya existe":"Duplicated Company","La fecha es errónea.":"Wrong date","Las contraseñas no son iguales":"Password are not equal","Leyenda {{iniCtrl.chartBottomRight}}":"Legend {{iniCtrl.chartBottomRight}}","Link a bgg":"Bgg link","Lista de partidas":"Game played list","Listado de juegos":"Game list","Localización":"Location","Login":"Login","Lugar":"Place","Lugar de la partida":"Game Play Place","Mantenimiento <span class=\"caret\"></span>":"Maintenance <span class=\"caret\"></span>","Media de jugadores por juego":"Players by game avg.","Media Jugadores":"Number Player Avg","Nº de Jugadores":"Number of players","Nombre":"Name","Nombre Abreviado":"Short Name","Nombre corto":"Short name","Nombre de la partida":"Game play name","Nombre de la partida *":"Game play name *","Nombre del juego *":"Game name *","Nombre del jugador":"Player Name","Nombre empresa":"Company Name","Nombre jugador":"Player Name","Nombre largo":"Long Name","Nueva Contraseña":"New Password","Nueva Partida":"New Game Play","Nuevo juego":"New Game","Número de Acciones":"Number od Shares","Número de acciones por jugador":"Shares per player","Número de jugadores":"Number of players","Paneles":"Panels","Para su funcionamiento utiliza cookies para la conexión segura con el servidor.":"This site use cookies to a secure conexion with the server.","Partida jugada a":"Game played to","Partida jugada entre {{score18xxCtrl.partida.jugadores.numero}} jugadores a <a href=\"{{score18xxCtrl.linkbgg(score18xxCtrl.bggJuego._id)}}\">{{score18xxCtrl.partida.juego.description}}</a> el día  <b>{{score18xxCtrl.partida.fecha | date: 'dd-MMM-yyyy'}}</b> en <b>{{score18xxCtrl.partida.loc}}</b>":"Game played by {{score18xxCtrl.partida.jugadores.numero}} players to <a href=\"{{score18xxCtrl.linkbgg(score18xxCtrl.bggJuego._id)}}\">{{score18xxCtrl.partida.juego.description}}</a> on  <b>{{score18xxCtrl.partida.fecha | date: 'dd-MMM-yyyy'}}</b> at <b>{{score18xxCtrl.partida.loc}}</b>","Partidas":"Games played","Partidas por juego":"Played games","Pedir contraseña":"Ask password","Puedes registrarte gratis <a href=\"#/login/s\">aquí</a>":"You can signup for free <a href=\"#/login/s\">here</a>","Pulsa en la imagen para comenzar con <b>Score18xx</b>":"Click the image to start with <b>Score18xx</b>","Quitar dividendo":"Remove Dividend","Quitar empresa":"Remove Company","Recuerda que todos los campos son obligatorios":"Remember that all fields are mandatory","Regístrate":"Signup","Repetir":"Repeat","Resultado":"Result","Resultado Final":"Final Result","Salir":"Exit","Salir de la aplicación":"Exit of application","Salvar":"Save","Score18xx es una aplicación web gratuita y de código abierto.":"Score188xx is an open source and free web application","Score18xx la aplicación web para puntuar tus juegos de la serie 18XX":"Score18xx the web aplication to score your 18XX games played","Se enviará un mensaje con la contraseña a tu correo electrónico":"A message with you password has been sent you","Se ha cambiado la contraseña correctamente.":"Pasword changed succesfully","Se ha creado una nueva contraseña.<br>Recibirá un correo electrónico con dicha clave.":"A new password has been created.<br>You will receive an email with your password.","Se ha registrado su usuario correctamente.":"User registered succesfully","Se han salvado los datos del juego.":"Data game saved","Si decides utilizar Score18xx estás aceptando estos términos de uso.":"If you use Score18XX you are accepting this terms of use.","Si ya eres usuario entra <a href=\"#/login\">aquí</a>":"Click <a href=\"#/login\">here</a> if you are an user","Sitio no encontrado":"Page not found","Tabla":"Table","Téminos de Uso":"Terms of Use","Términos de uso":"Terms of Use","Términos de Uso":"Terms of Use","Tiempo de juego :":"Playing time :","Total":"Total","Usa la herramienta de <b>Cálculo de dividendos</b>":"Use <b>Get Dividends</b> tool","Usuario":"User","Usuario registrado":"User registered","Usuarios":"Users","Va a eliminar una empresa que tiene información, ¿desea continuar?":"You are going to remove a company with data. Are you sure?","va a salir de la aplicación, ¿desea continuar?":"you will exit the application, do you want to continue?","Valor de acciones":"Share value","Volver a inicio":"Go Home","Ya existe un juego con ese identificador":"Duplicated game identifier"});
/* jshint +W100 */
}]);