<template>
  <div
    class="drop-zone"
    @dragover.prevent="$emit('drag-over', zoneId)"
    @drop="$emit('drop', zoneId)"
  >
    <h2 v-if="title">{{ title }}</h2>

    <div v-if="items.length === 0" class="empty">
      (Suelta elementos aquí)
    </div>

    <div
      v-for="item in items"
      :key="item.id"
      class="item-wrapper"
    >
      <!-- Título tipo <h2> del ejemplo original -->
      <h2
        v-if="item.type === 'title'"
        class="dragable"
        draggable="true"
        @dragstart="$emit('drag-start', item.id)"
      >
        {{ item.label }}
      </h2>

      <!-- Caja azul del ejemplo original -->
      <div
        v-else-if="item.type === 'box'"
        class="dragable box"
        draggable="true"
        @dragstart="$emit('drag-start', item.id)"
      ></div>

      <!-- Cualquier otro item "tipo etiqueta" -->
      <div
        v-else
        class="dragable pill"
        draggable="true"
        @dragstart="$emit('drag-start', item.id)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Item {
  id: string
  label: string
  type: string
  zone: string
}

defineProps<{
  zoneId: string
  title: string
  items: Item[]
}>()

defineEmits<{
  'drag-start': [itemId: string]
  'drag-over': [zoneId: string]
  'drop': [zoneId: string]
}>()
</script>

<style scoped>
.drop-zone {
  min-width: 260px;
  min-height: 220px;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
}

.drop-zone h2 {
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.empty {
  font-size: 0.85rem;
  font-style: italic;
  color: #666;
}

.item-wrapper + .item-wrapper {
  margin-top: 0.5rem;
}

/* Estas clases se usan desde App.vue (class="drop-zone--outside", etc.) */
.drop-zone--outside {
  background: #f5f5f5;
}

.drop-zone--container {
  background: blueviolet;
  color: white;
}
</style>