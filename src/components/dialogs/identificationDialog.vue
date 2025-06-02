<template>
  <q-card :style="'min-width: 45%'" class="q-px-md">
    <q-card-section class="row items-center text-white bg-primary q-py-xs q-px-sm">
      <q-icon name="folder" size="xs" />
      <div class="text-caption q-pl-sm text-subtitle1">Identificación oficial</div>
      <q-space />
      <q-btn icon="close" size="xs" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <q-tab-panels v-model="tab" animated class="bg-grey-1">
        <q-tab-panel name="front_ine_path" class="text-center">
          <inner-image-zoom
            :zoomScale="3"
            :fullscreen="true"
            :zoomPreload="true"
            :src="data.front_ine_path"
            :zoomSrc="data.front_ine_path"
            moveType="drag"
          />
        </q-tab-panel>
        <q-tab-panel name="back_ine_path" class="text-center">
          <inner-image-zoom
            :zoomScale="3"
            :fullscreen="true"
            :zoomPreload="true"
            :src="data.back_ine_path"
            :zoomSrc="data.back_ine_path"
            moveType="drag"
          />
        </q-tab-panel>
      </q-tab-panels>
      <q-tabs
        v-model="tab"
        dense
        :align="'justify'"
        class="bg-grey-1 text-primary q-mt-md"
        :breakpoint="0"
      >
        <q-tab name="front_ine_path" label="Anverso" />
        <q-tab name="back_ine_path" label="Inverso" />
      </q-tabs>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'

import InnerImageZoom from 'vue-inner-image-zoom'
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css'

const { data } = defineProps({
  data: Object,
})

const tab = ref('front_ine_path')
</script>
