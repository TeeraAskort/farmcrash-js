# farmcrash-js

## Objetivo de la aplicación

El objetivo de la aplicación es realizar un juego multijugador online de granja dónde los jugadores compitan por ver quien es el que más dinero puede conseguir.

La aplicación está dividida en un backend realizado en "Java" con el framework "Spring Boot" ([repositorio](https://github.com/TeeraAskort/farmcrash-backend)) y el frontend realizado en "Javascript" puro.

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

Códifgo utilizado para convertir el usuario y la contraseña a base64:

```javascript
let playerStr = Buffer.from(name + ":" + pass); // Usamos el paquete NPM Buffer
playerStr.toString("base64")
```

### Usuario de prueba

La aplicación está diseñada para que si creas un usuario con el nombre "prova" se creen datos de estadistica de ejemplo para la sección de estadisticas.
Si creas un usuario con qualquier otro nombre creará un usuario por defecto igual para todos.

## Página principal

La página principal contiene todas las listas de objetos, verduras y trabajadores que tiene el jugador así como el dinero que tiene.
También contiene uno de los tests de la aplicación.
Éste test comprueba que se rendericen correctamente los trabajadores en la página.

Código del test:

```javascript
/*
Llamamos a la api rest para recoger los datos del usuario.
Luego comprobamos que no esté vacío.
*/
playerData = await REST.default.fetchPlayerData();
expect(playerData).to.not.be.empty;

/*
Si el jugador no tiene trabajadores se comprueba que se muestre el mensaje,
si no se comprueba que los trabajadores se muestren correctamente con su
nombre.
*/

if (!playerData.workers || playerData.workers.length === 0) {
  expect(cols[0].innerHTML).to.contain("You don't have workers");
} else {
  cols.forEach((col, index) => {
    let name = col.querySelector(".card-title").innerText;
    console.log(name);
    expect(name).to.contain(playerData.workers[index].name);
  });
}

/*
Por último comprobamos que si no tiene jugadores haya un solo elemento que es
el mensaje de texto mostrado, si tiene trabajadores, se comprueba que haya la
misma cantidad de elementos como de trabajadores.
*/

if (!playerData.workers || playerData.workers.length === 0) {
  expect(cols).to.have.length(1);
} else {
  expect(cols).to.have.length(playerData.workers.length);
}
```

## Página de compra de verduras y página de contratación de trabajadores

Éstas páginas contienen listas de los trabajadores y verduras disponibles para contratar o comprar.
Éstas páginas también tienen una barra de búsqueda reactiva que permite filtrar el contenido de la página en función de lo que introduzca el usuario.
La página de compra de verduras contine uno de los dos tests realizados en el programa y se ejecuta cada vez que entras en la página.

Código para la búsqueda reactiva:

```javascript
/*
Usamos la libreria rxjs para poder suscribirnos a los cambios de la barra de 
búsqueda.
*/

const fetchCrops = (searchText) => {
    const fetchedCrops =
      !searchText || searchText.length == 0
        ? data
        : data.filter((crop) =>
            crop.name.toLowerCase().includes(searchText.toLowerCase())
          );
    return of(fetchedCrops);
  };

  let search$ = fromEvent(searchInput, "keyup").pipe(
    map((event) => event.target.value),
    distinctUntilChanged(),
    debounceTime(150),
    switchMap((searchText) => fetchCrops(searchText))
  );

  search$.subscribe((crops) => {
    container.removeChild(container.querySelector(".rowToRemove"));
    container.removeChild(container.querySelector(".rowToRemove"));
    drawCrops(crops);
  });
```

## Páginas de lista de verduras, trabajadores y objetos

Éstas páginas contienen las mismas listas que la página principal pero cada una de ellas está dedicada a un solo elemento, mostrandolo a pantalla completa.

## Página de leaderboard

Ésta página contiene una lista de los cinco usuarios con más dinero del servidor.

## Página de estadisticas

Ésta página contiene un gráfico de la cantidad de dinero que ha ido teniendo el usuario durante los últimos siete dias.

Configuración de Chart.js para el gr

```javascript
 const config = {
    type: "line",
    data: data, // JSON que recibimos desde el backend que contiene los datos para mostrar en el gráfico
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

/*
Usamos la libreria Chart.js para renderizar el gráfico
"chart" es el canvas del html que utiliza el paquete para renderizar 
el gráfico
*/

  new Chart(chart, config);
```

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
