<template>
  <q-card class="q-my-md">
    <q-card-section>
      <q-table
        flat
        :rows="rows"
        :columns="clientColumns"
        row-key="name"
        :style="`height: ${templateHeightPanel - 75}px !important`"
      >
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, toRef } from 'vue'
import { columnGeneration } from '../utils/structureOfTables/defineStructure'
import { clients, users } from '../utils/structureOfTables/columnsUsers.js'

export default {
  name: 'UsersTable',
  props: {
    props: {
      panelHeight: {
        type: Number,
        default: 0,
      },
    },
  },
  setup(props) {
    /** Style elements */
    const templateHeightPanel = toRef(props, 'panelHeight')

    const rows = ref([])
    const clientColumns = columnGeneration(clients)
    const columns = columnGeneration(users)

    return {
      /** style elements */
      templateHeightPanel,

      rows,
      columns,
      clientColumns,
    }
  },
}
</script>
