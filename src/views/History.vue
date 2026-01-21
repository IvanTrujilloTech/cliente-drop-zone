<script setup lang="ts">
import { ref, onMounted } from 'vue'

const selections = ref<{ raza?: string; clase?: string; aliado?: string } | null>(null)

onMounted(() => {
  const data = localStorage.getItem('characterSelections')
  if (data) {
    selections.value = JSON.parse(data)
  }
})

// Método para obtener la ruta de la imagen basada en las selecciones
const getCharacterImage = () => {
  if (!selections.value || !selections.value.raza || !selections.value.clase || !selections.value.aliado) {
    return '' 
  }

  const { raza, clase, aliado } = selections.value

  return `src/assets/img/${raza}/${raza}_${clase}_${aliado}.png`
}

const getCharacterSound = () => {
  if (!selections.value || !selections.value.raza) {
    return ''
  }

  const { raza } = selections.value

  return `/assets/sound/${raza}.mp3`
}

const getCharacterHistory = () => {
  if (!selections.value || !selections.value.raza) {
    return ''
  }

  const { raza } = selections.value

  switch (raza) {
    case 'humano':
      return 'El pesado tablón de madera de la puerta de la taberna \'El Jabalí Gruñón\' cede con un crujido familiar. El aire fresco de la noche, aún con el último aliento del atardecer, te golpea el rostro, un bienvenido contraste con el humo y el calor de las velas. La calle empedrada se extiende ante ti, invitando a la aventura. Sabes que esta noche no será como las demás; el susurro del viento trae consigo promesas de gloria, peligros y, quizás, el descubrimiento de tu verdadero destino.'
    case 'elfo':
      return 'Con la gracia silenciosa que solo siglos de vida en los bosques otorgan, te deslizas fuera del umbral del \'Susurro de las Hojas\', una taberna construida con maderas vivas y luces de luciérnaga. La brisa nocturna arrastra consigo el aroma a pino y a tierra húmeda, una canción que solo los de tu estirpe pueden escuchar plenamente. Una estrella fugaz cruza el cielo indigo, un presagio, sin duda. Es hora de que el bosque te muestre nuevos caminos y antiguos secretos.'
    case 'enano':
      return 'Con un gruñido satisfactorio, te abres paso a través del pesado portón de roble de la \'Piedra Rodante\', la taberna más antigua y robusta de tu ciudad natal. El fresco del aire de montaña, ya con un toque helado del anochecer, se siente como un viejo amigo. Las luces de las viviendas de piedra proyectan largas sombras sobre el sendero adoquinado, llamándote a explorar las profundidades y las cumbres más allá de los muros. Es el momento perfecto para forjar nuevas leyendas y desenterrar tesoros ocultos.'
    default:
      return ''
  }
}
</script>

<template>
  <div class="history-page">
    <h1>Tu Historia</h1>
    <p>{{ getCharacterHistory() }}</p>
    <img v-if="getCharacterImage()" :src="getCharacterImage()"/>
    <audio v-if="getCharacterSound()" :src="getCharacterSound()" autoplay></audio>
  </div>
</template>

<style scoped>
.history-page {
  text-align: center;
  padding: 20px;
}
p {
    color: white;
    backdrop-filter: blur(10px);
    max-width: 800px;
    margin: 1% auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1{
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

img {
  max-width: 580px;
  max-height: 600px;
  height: auto;
  margin-top: 20px;
  border-radius: 10px;
}
</style>