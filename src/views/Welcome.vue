<script setup>
import bgImage from '../assets/img/components/welcome_background.png'
</script>

<template>
  <div class="welcome-page" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="page">
        <h1>¡Bienvenido joven aventurero!</h1>
        <p>Prepárate para una emocionante travesía en el mundo de Faerûn</p>
        <p>Antes de comenzar tu aventura, debes aprender lo basico sobre este mundo...</p>
        <div class="how-to-play">
            <h2>¿Cómo jugar?</h2>
            <p>En este juego de rol, interpretarás a un personaje en un mundo de fantasía.</p>
            <p>Encontrarás huecos en el texto que debes completar para modificar tu historia a tu antojo.</p>
            <p>Para completar los huecos, simplemente arrastra y suelta los elementos disponibles en el contenedor.</p>
            <p>Una vez hayas completado todos los huecos, podrás comenzar tu aventura pulsando el botón AVENTURARSE</p>
            <h2>¡Buena suerte!</h2>
        </div>
        <router-link to="/intro" class="start-button">¡Comienza tu aventura!</router-link>
    </div>
  </div>
</template>

<style scoped>

.welcome-page {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.page {
    backdrop-filter: blur(10px) ;
    max-width: 800px;
    margin: 1% auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.how-to-play {
    backdrop-filter: blur(20px);
    padding: 20px;
    margin: 20px 0;
    border-radius: 10px;
}
.start-button {
    display: flex;
    padding: 10px 20px;
    background-color: #ff0000;
    color: white;
    margin-left: 30%;
    margin-right: 30%;
    border-radius: 5px;
    font-weight: bold;
    justify-content: center;
    
}
.start-button:hover {
    transition: background-color 0.3s;
    background-color: #520000;
}
</style>