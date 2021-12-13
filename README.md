# farmcrash-js

## Distribución de archivos

- html -> dónde reside el index.html
- js -> dónde se encuentran los archivos de Javascript
  - models -> classes usadas en la aplicación
  - rest -> archivo javascript usado para las conexiones a la api REST
  - tests -> tests usados en la aplicación
  - ui -> archivos javascript usados para renderizar la UI de la aplicación
  - index.js -> archivo javascript principal que llama a todos los demás archivos javascript

## Login, registro y logout

La aplicación utiliza el método de autenticación "BASIC Auth", éste metodo convierte los datos de login a base64 para enviarlos al backend.

### Usuario de prueba

La aplicación está diseñada para que si creas un usuario con el nombre "prova" se creen datos de estadistica de ejemplo para la sección de estadisticas.
Si creas un usuario con qualquier otro nombre creará un usuario por defecto igual para todos.

## Página principal

La página principal contiene todas las listas de objetos, verduras y trabajadores que tiene el jugador así como el dinero que tiene.

## Página de compra de verduras y página de contratación de trabajadores

Éstas páginas contienen listas de los trabajadores y verduras disponibles para contratar o comprar.
Éstas páginas también tienen una barra de búsqueda reactiva que permite filtrar el contenido de la página en función de lo que introduzca el usuario.

## Páginas de lista de verduras, trabajadores y objetos

Éstas páginas contienen las mismas listas que la página principal pero cada una de ellas está dedicada a un solo elemento, mostrandolo a pantalla completa.

## Página de leaderboard

Ésta página contiene una lista de los cinco usuarios con más dinero del servidor.

## Página de estadisticas

Ésta página contiene un gráfico de la cantidad de dinero que ha ido teniendo el usuario durante los últimos siete dias.

## Paquetes NPM

### Paquetes utilizados para el desarrollo:

- chai
- mocha
- webpack
- webpack-cli
- webpack-dev-server
- clean-webpack-plugin
- html-webpack-plugin
- style-loader

### Paquetes utilizados en producción:

- buffer -> Para convertir a base64 los datos del usuario
- chart.js -> Para mostrar el gráfico en la página de estadisticas
- rxjs -> Para la busqueda reactiva en las páginas de compra de verduras y contratación de trabajadores
