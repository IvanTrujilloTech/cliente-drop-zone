// importo las funciones necesarias de vue router
import { createRouter, createWebHistory, type Router } from 'vue-router'
// importo las vistas que voy a usar en las rutas
import Welcome from '../views/Welcome.vue'
import Intro from '../views/Intro.vue'
import test from '../views/javi.vue'
import History from '../views/History.vue' 


// defino las rutas de la aplicacion
const routes = [
    // ruta principal que muestra la pagina de inicio
  { path: '/', name: 'Welcome', component: Welcome },
    // ruta para la vista de introduccion
  { path: '/intro', name: 'Intro', component: Intro },
    // ruta de prueba para javi.vue
  { path: '/test', name: 'Test', component: test },
    // ruta para la vista de historia una vez completada la introduccion
  { path: '/history', name: 'History', component: History }
]

// creo el router con historial web y las rutas definidas
const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

// exporto el router para usarlo en main.ts
export default router