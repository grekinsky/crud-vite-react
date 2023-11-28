# Proyecto de CRUD con recetas de café

Para el Backend, se utiliza un simple API hecho en express con almacenamiento en memoria, asi que para limpiar la base de datos, simplemente hay que reiniciar el servidor.

El API de ejemplo proviene de https://api.sampleapis.com/coffee/hot

Para el Frontend, este proyecto usa:

- Vite
- React
- React Router
- Redux
- Material-UI

El proyecto cuenta con una pantalla de lista de cafés desde donde se puede crear, modificar o eliminar.

Para eliminar cuenta con un diálogo de confirmación.

Para crear o modificar se abre un formulario en una pantalla a parte. Se puede navegar directamente a la pantalla de modificar con el id que toma de la URL `http://localhost:3000/modify/1`

## Para probarlo es necesario tener Node.js y NPM instalados e instalar dependencias:

```
npm install
```

### y posteriormente ejecutar el proyecto:

```
npm run server
```

y abrir la url `http://localhost:3000/`

### para ejecutar en modo desarrollo con HMR:

```
npm run dev
```

## To Do

- Poder modificar lista de ingredientes para los cafés
- Campo de búsqueda en la pantalla de lista
- Pruebas unitarias
- Log in y manejo de sesión por JWT
