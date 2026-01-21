<script setup>
import titleImage from '../assets/img/components/title.png'
</script>

<template>
  <!-- barra de navegacion principal -->
  <nav class="navbar">
    <!-- logo del sitio -->
    <div class="logo" :style="{ backgroundImage: `url(${titleImage})` }">
    </div>
    <!-- enlaces de navegacion usando vue router -->
    <div class="nav-links">
      <router-link to="/">Inicio</router-link>
    </div>
  </nav>
</template>

<style scoped>
/* estilos para la barra de navegacion */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: white;
  padding: 10px 30px;
}
/* estilo del logo */
.logo {
  width: 200px;
  height: 50px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
/* estilos de los enlaces de navegacion */
.nav-links a {
  color: white;
  text-decoration: none;
  margin-left: 20px;
  font-size: 1.1em;
}

/* vue router añade esta clase automaticamente al enlace activo */
.nav-links .router-link-active {
  font-weight: bold;
  border-bottom: 2px solid #4caf50;
}

</style>
