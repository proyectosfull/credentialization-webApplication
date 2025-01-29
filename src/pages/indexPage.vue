<template>
  <q-page ref="page" class="q-pa-md">
    <div class="q-px-md">
      <q-card ref="header" flat class="row q-py-none q-px-sm">
        <div class="col q-py-md">
          <div class="text-primary text-subtitle1">CLIENTES</div>
        </div>
      </q-card>
      <q-separator />
    </div>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="users" class="q-px-sm q-pb-none">
        <!-- <users-table /> -->
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import { ref, watch } from 'vue'
//import UsersTable from 'src/components/UsersTable.vue'

export default {
  name: 'IndexPage',
  components: {
    //UsersTable,
  },
  setup() {
    /** Style */
    const page = ref(null)
    const header = ref(null)
    const onPanelHeight = ref(0)

    watch(
      () => [page.value, header.value],
      () => {
        if (page.value !== null)
          onPanelHeight.value = page.value.$el.clientHeight - header.value.$el.clientHeight - 40
      },
      { deep: true },
    )
    return {
      tab: 'users',

      page,
      header,
      onPanelHeight,
    }
  },
}
</script>
