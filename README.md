# experiencias_frontend

Este proyecto es una aplicación frontend construida con **React** y **Vite** para la gestión de experiencias y reservas.

## Requisitos

- Node.js >= 18
- npm >= 9

## Instalación

1. Clona el repositorio:
   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd Frontend
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

## Uso

### Desarrollo

Para iniciar el servidor de desarrollo:

```sh
npm run dev
```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173) por defecto.

## Estructura del proyecto

- `src/pages/`: Contiene las páginas principales (`login`, `register`, `dashboard`).
- `src/assets/`: Recursos estáticos.
- `public/`: Archivos públicos y estáticos.
- `src/App.jsx`: Configuración de rutas y lógica principal.

## Notas

- Asegúrate de tener corriendo el backend en `http://localhost:3000` para que las peticiones funcionen correctamente.
- El sistema utiliza Bootstrap para los estilos y React Router para la navegación.

## Autenticación

- El login almacena el token JWT en `localStorage`.
- Para acceder al dashboard es necesario estar autenticado.

---