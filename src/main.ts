// importo vue y creo la app
import { createApp } from 'vue'
// importo pinia para el estado global
import { createPinia } from 'pinia'

// importo el componente principal
import App from './App.vue'
// importo el router para las rutas
import router from './router'
// importo los estilos globales
import './assets/styles.css'

// creo la instancia de vue con el componente app
const app = createApp(App)

// agrego pinia a la app para manejar el estado
app.use(createPinia())
// agrego el router a la app para la navegacion
app.use(router)

// monto la app en el elemento html con id app
app.mount('#app')
