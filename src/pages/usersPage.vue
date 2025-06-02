<template>
  <q-page ref="page" class="full-height">
    <div class="q-px-md">
      <q-card ref="header" flat class="row q-py-none q-px-sm">
        <div class="col q-py-md">
          <div class="text-primary text-subtitle1">USUARIOS</div>
        </div>
      </q-card>
      <q-separator />
    </div>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="clientsData" class="q-px-sm q-pb-none">
        <user-table :panelHeight="onPanelHeight" />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import UserTable from 'src/components/tables/userTable.vue'

const page = ref(null)
const header = ref(null)
const onPanelHeight = ref(0)

watch(
  () => [page.value, header.value],
  () => {
    if (page.value !== null && header.value !== null)
      onPanelHeight.value = page.value.$el.clientHeight - header.value.$el.clientHeight - 40
  },
  { deep: true },
)

const tab = ref('clientsData')
</script>
