<template>
  <div class="page">
    <h1>Ejemplo de Drag and Drop con Vue</h1>
    <p class="intro">
      Arrastra los elementos entre la zona libre y el contenedor.
    </p>

    <div class="zones">
      <!-- Zona libre -->
      <DropZone
        class="drop-zone--outside"
        zone-id="outside"
        title="Zona libre"
        :items="itemsByZone('outside')"
        @drag-start="onDragStart"
        @drag-over="onDragOver"
        @drop="onDrop"
      />

      <!-- Contenedor -->
      <DropZone
        class="drop-zone--container"
        zone-id="container"
        title="CONTENEDOR"
        :items="itemsByZone('container')"
        @drag-start="onDragStart"
        @drag-over="onDragOver"
        @drop="onDrop"
      />
    </div>

    <p id="p1">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DropZone from '../components/DropZone.vue'

interface Item {
  id: string
  label: string
  type: string
  zone: string
}

// Elementos arrastrables
const items = ref<Item[]>([
  {
    id: 'title',
    label: 'Ejemplo de Drag and Drop',
    type: 'title',
    zone: 'outside'
  },
  {
    id: 'box',
    label: '',
    type: 'box',
    zone: 'outside'
  },
  {
    id: 'tag1',
    label: 'Elemento extra asd1',
    type: 'tag',
    zone: 'outside'
  },
  {
    id: 'tag2',
    label: 'Elemento extra 2',
    type: 'tag',
    zone: 'outside'
  }
])

// Id del elemento que se está arrastrando
const draggedItemId = ref<string | null>(null)

// Mensaje tipo #p1 del ejemplo original
const message = ref('')

// Devuelve los items que están en una zona concreta
const itemsByZone = (zone: string): Item[] => {
  return items.value.filter(item => item.zone === zone)
}

// Handlers de drag & drop (los llaman los DropZone)
const onDragStart = (itemId: string) => {
  draggedItemId.value = itemId
  message.value = 'ACABAS DE COGER UN ELEMENTO'
}

const onDragOver = () => {
  if (draggedItemId.value) {
    message.value = 'ESTÁ EN EL ELEMENTO'
  }
}

const onDrop = (zoneId: string) => {
  if (!draggedItemId.value) return

  const item = items.value.find(i => i.id === draggedItemId.value)
  if (item) {
    item.zone = zoneId
  }

  message.value = 'SE HA SOLTADO EL ELEMENTO'
  draggedItemId.value = null
}
</script>

<style scoped>
.page {
  padding: 1.5rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

h1 {
  margin-top: 0;
}

.intro {
  margin-bottom: 1rem;
}

.zones {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

/* Solo layout/colores generales, estilos de la zona en DropZone.vue */
</style>
