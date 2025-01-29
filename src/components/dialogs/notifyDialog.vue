<template>
  <q-card style="width: 400px">
    <q-linear-progress v-if="dinamic" indeterminate :color="color" />
    <q-linear-progress v-else :value="1" :color="color" />
    <q-card-section class="bg-white text-accent q-py-none">
      <div class="row no-wrap q-pl-md q-py-sm">
        <div class="column">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
          </q-avatar>
          <div class="text-weight-normal text-subtitle2 text-grey-8">Megant</div>
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-item-section>
            <q-item-label caption>
              <strong :class="`text-'${color}`"> {{ title }} </strong>
            </q-item-label>
            <q-item-label caption>
              <ul v-if="isArray">
                <li v-for="(item, index) in normalizedItems" :key="index">{{ item }}</li>
              </ul>
              <p v-else>{{ normalizedItems }}</p>
            </q-item-label>
          </q-item-section>
        </div>
        <div class="column items-right">
          <q-btn icon="close" size="xs" :color="color" flat round dense v-close-popup />
        </div>
      </div>
      <q-space />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'
import { notify } from 'src/config/notifications'

// Props
const emit = defineEmits(['answer'])
const { messages, dinamic, color } = defineProps({
  messages: {
    type: [String, Array],
    default: '',
  },
  dinamic: {
    type: Boolean,
    default: true,
  },
  color: {
    type: String,
    required: false,
    default: 'accent',
  },
})

// Emitir un evento si `dinamic` es true
if (dinamic) {
  setTimeout(() => emit('answer', true), 3000)
}

// Computed properties
const isArray = computed(() => Array.isArray(messages))
const normalizedItems = computed(() => (isArray.value ? messages : [messages]))

// Variables locales
const title = notify.TITLE.BASE

console.log(dinamic, color, messages)
</script>
