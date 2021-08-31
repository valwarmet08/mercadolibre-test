## About The Project
Contrucción de clone de mercadolibre con las siguientes tres vistas:
- Caja de búsqueda○
- Resultados de la búsqueda
- Detalle del producto

# Build

    - React
    - Express
    - Sass
    - Bootstrap

Este proyecto base fue creado con [Create React App](https://github.com/facebook/create-react-app).

## Scripts

Comandos para iniciar el proyecto:

### `npm dev`

Inicia el proyecto en modo desarrollo.\
[http://localhost:3000](http://localhost:3000)

El proyecto se refresca automaticamente si cambiamos alguno de los archivos .\src

### `npm prod`

Inicia el proyecto en modo producción.\
[http://localhost:3000](http://localhost:3000)

El proyecto se refresca automaticamente si cambiamos alguno de los archivos .\src

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`. \
Agrupa correctamente React en el modo de producción y optimiza la compilación para obtener el mejor rendimiento.

La compilación se minimiza y los nombres de archivo incluyen los hash. \

[deployment](https://facebook.github.io/create-react-app/docs/deployment) 

### `npm prod`

Inicia el proyecto en modo produccion.\
[http://localhost:3000](http://localhost:3000)

El proyecto se refresca automaticamente si cambiamos alguno de los archivos .\src

### `npm run deploy`

Este comando inicia el proyecto en modo produccion con pm2 con su ambiente de produccion ecosystem.config.js
[https://pm2.keymetrics.io] 

### `npm run docs`

Este comando genera la documentacion del proyecto con jsdoc
[https://jsdoc.app] 

# START PROJECT

    npm i 
    npm run dev


# Structure

# Backend
    - dao (Data Acces Objects) Lógica de acceso a datos 
    - helper Clases dinamicas para diferentes tipos de tareas retulizables.
    - middleware Clase orientada a la seguridad y control de rutas api
    - routes Carpeta para la gestion de las diferentes rutas api
    - confing.json Configuracion global del sistema

# Frontend
    - components React Vistas dinamicas , reutilizables cons sus diferentes estados
    - controllers Controlador para gestionar la comunicacion entre el frontend y backend
    - helpers Clases dinamicas para diferentes tipos de tareas retulizables.
    - layouts React Contenedores gerales de la aplicacion para la gestion de vistas.
    - pages React vistas de las diferetes secciones del webpage
    - styles Estilos css basados scss
    - test Testing
