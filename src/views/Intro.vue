<script setup lang="ts">
import { ref } from 'vue'
import bgImage from '../assets/img/components/intro_background.png'
import DropZone from '../components/DropZone.vue'

// Define la estructura de los elementos arrastrables
interface Item {
  id: string
  label: string
  type: string
  zone: string
  category: string
}

// Lista de elementos disponibles para arrastrar organizados por categoria
const items = ref<Item[]>([
  // Razas
  { id: 'elfo', label: 'Elfo', type: 'pill', zone: 'available', category: 'raza' },
  { id: 'humano', label: 'Humano', type: 'pill', zone: 'available', category: 'raza' },
  { id: 'enano', label: 'Enano', type: 'pill', zone: 'available', category: 'raza' },
  // Clases
  { id: 'guerrero', label: 'Guerrero', type: 'pill', zone: 'available', category: 'clase' },
  { id: 'mago', label: 'Mago', type: 'pill', zone: 'available', category: 'clase' },
  { id: 'bardo', label: 'Bardo', type: 'pill', zone: 'available', category: 'clase' },
  // Aliados
  { id: 'perro', label: 'Perro', type: 'pill', zone: 'available', category: 'aliado' },
  { id: 'gato', label: 'Gato', type: 'pill', zone: 'available', category: 'aliado' },
  { id: 'dragon', label: 'Prole de dragón', type: 'pill', zone: 'available', category: 'aliado' }
])

// Id del elemento que se esta arrastrando
const draggedItemId = ref<string | null>(null)

// devuelve los items que estan en una zona concreta
const itemsByZone = (zone: string): Item[] => {
  return items.value.filter(item => item.zone === zone)
}

// handlers de drag & drop
const onDragStart = (itemId: string) => {
  draggedItemId.value = itemId
}


const onDrop = (zoneId: string) => {
  if (!draggedItemId.value) return

  const item = items.value.find(i => i.id === draggedItemId.value)
  if (!item) return


  // permito soltar en 'available' desde cualquier zona
  if (zoneId !== 'available' && item.category !== zoneId) return


  // si la zona no es 'available' compruebo si ya hay un item y lo devuelvo a 'available'
  if (zoneId !== 'available') {
    const existingInZone = items.value.find(i => i.zone === zoneId)
    if (existingInZone) {
      existingInZone.zone = 'available'
    }
  }

  item.zone = zoneId
  draggedItemId.value = null
}

// Guardar selecciones en localStorage
const saveSelections = () => {
  const selections = {
    raza: items.value.find(i => i.zone === 'raza')?.id,
    clase: items.value.find(i => i.zone === 'clase')?.id,
    aliado: items.value.find(i => i.zone === 'aliado')?.id,
  }
  if (!selections.raza || !selections.clase || !selections.aliado){
    alert('Por favor, selecciona una raza, una clase y un aliado antes de aventurarte.')
    return
  }
  localStorage.setItem('characterSelections', JSON.stringify(selections))
}

const clearSelections = () => {
  items.value.forEach(item => {
    item.zone = 'available'
  })
}
</script>

<template>
  <div class="intro-page" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="page">
        <h1>El comienzo de una aventura</h1>
        <p>Las crónicas de Faerûn aguardan a un nuevo nombre.</p>
        <p>Os encontrais en la taberna de vuestra ciudad nativa, rodeado de susurros y humo de pipa.</p>
        <p>Sois un <DropZone class="inline-drop" zone-id="raza" title="" :items="itemsByZone('raza')" @drag-start="onDragStart" @drop="onDrop" />, y aunque muchos caminos se abren ante vos, tu entrenamiento como <DropZone class="inline-drop" zone-id="clase" title="" :items="itemsByZone('clase')" @drag-start="onDragStart" @drop="onDrop" /> os ha preparado para lo que vendrá.</p>
        <p>Mas no viajais solo; el destino ha querido que <DropZone class="inline-drop" zone-id="aliado" title="" :items="itemsByZone('aliado')" @drag-start="onDragStart" @drop="onDrop" /> comparta vuestra carga.</p>
        <div class="adventure-start">
            <div class="categories">
                <div class="category">
                    <h3>Raza</h3>
                    <div class="items" @dragover.prevent @drop.prevent="onDrop('available')">
                        <div
                            v-for="item in itemsByZone('available').filter(i => i.category === 'raza')"
                            :key="item.id"
                            class="dragable pill"
                            draggable="true"
                            @dragstart="onDragStart(item.id)"
                        >
                            {{ item.label }}
                        </div>
                    </div>
                </div>
                <div class="category">
                    <h3>Clase</h3>
                    <div class="items" @dragover.prevent @drop.prevent="onDrop('available')">
                        <div
                            v-for="item in itemsByZone('available').filter(i => i.category === 'clase')"
                            :key="item.id"
                            class="dragable pill"
                            draggable="true"
                            @dragstart="onDragStart(item.id)"
                        >
                            {{ item.label }}
                        </div>
                    </div>
                </div>
                <div class="category">
                    <h3>Aliado</h3>
                    <div class="items" @dragover.prevent @drop.prevent="onDrop('available')">    
                        <div
                            v-for="item in itemsByZone('available').filter(i => i.category === 'aliado')"
                            :key="item.id"
                            class="dragable pill"
                            draggable="true"
                            @dragstart="onDragStart(item.id)"
                        >
                            {{ item.label }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <router-link to="/history" class="start-button" @click="saveSelections">AVENTURARSE</router-link>
        <button class="clear-button" @click="clearSelections">LIMPIAR SELECCIONES</button>
    </div>
  </div>
</template>

<style scoped>
.intro-page {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.page {
    backdrop-filter: blur(10px);
    max-width: 800px;
    margin: 1% auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.adventure-start {
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

.inline-drop {
    display: inline-block;
    min-width: 100px;
    min-height: 30px;
    padding: 0.25rem;
    border-radius: 4px;
    border: 1px dashed #ccc;
    background: rgba(255, 255, 255, 0.8);
    vertical-align: middle;
}

.categories {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.category h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
}

.items {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.dragable {
    cursor: grab;
    user-select: none;
}

.dragable:active {
    cursor: grabbing;
}

.pill {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    background: #007bff;
    color: white;
    border-radius: 12px;
    font-size: 0.9rem;
    white-space: nowrap;
}

.pill:hover {
    background: #0056b3;
}

button {
    display: flex;
    padding: 10px 20px;
    background-color: #808080;
    color: white;
    margin-left: 40%;
    margin-right: 40%;
    border-radius: 5px;
    font-weight: bold;
    justify-content: center;
    margin-top: 10px;
    border:none;
}
</style>