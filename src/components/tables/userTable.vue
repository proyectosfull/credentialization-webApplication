<template>
  <q-card class="q-my-md">
    <q-card-section>
      <q-table
        flat
        :rows="rows"
        :columns="columns"
        row-key="name"
        :style="`height: ${panelHeight - 75}px !important`"
      >
        <template #body-cell-index="props">
          <q-td :props="props">
            {{ props.rowIndex + 1 }}
          </q-td>
        </template>
        <template #body-cell-profile="props">
          <q-td :props="props">
            <q-avatar
              style="
                width: 50px;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <img
                :src="props.row.selfie_path"
                style="object-fit: cover; width: 100%; height: 100%"
              />
            </q-avatar>
          </q-td>
        </template>
        <template #body-cell-identificacion="props">
          <q-td :props="props">
            <q-btn
              flat
              round
              color="primary"
              icon="bi-person-vcard"
              @click="
                () => {
                  onData = props.row
                  dialogIdentification = true
                }
              "
            />
          </q-td>
        </template>
        <template v-slot:no-data>
          <div
            class="full-width full-height row flex-center text-grey-9"
            :style="'height: ' + (panelHeight - 150) + 'px !important'"
          >
            <no-data :search="loadingTable" />
          </div>
        </template>
        <template v-slot:bottom>
          <navigation-table
            :total="paginationData?.total"
            :totalPages="paginationData?.lastPage"
            :currentPage="paginationData?.currentPage"
          />
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <q-dialog v-model="dialogIdentification">
    <identification-dialog :data="onData" />
  </q-dialog>
  <q-dialog v-model="dialogNotifyModel" position="top">
    <notify-dialog
      @answer="dialogNotifyModel = false"
      :title="onTitle"
      :messages="onComment"
      :color="onColor"
    />
  </q-dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { notify } from 'src/config/notifications.js'
import { getUsers } from 'src/services/userService.js'
import { users } from '../../utils/structureOfTables/columnsUsers.js'
import { columnGeneration } from '../../utils/structureOfTables/defineStructure'

import navigationTable from './navigationTable.vue'
import NoData from 'src/components/utils/noData.vue'
import NotifyDialog from 'src/components/dialogs/notifyDialog.vue'
import IdentificationDialog from 'src/components/dialogs/identificationDialog.vue'

const { panelHeight } = defineProps({
  panelHeight: {
    type: Number,
    default: 0,
  },
})

/** Component Notify */
const onColor = ref('')
const onTitle = ref('')
const onComment = ref('')
const dialogNotifyModel = ref(false)

const rows = ref([])
const loadingTable = ref(false)
const columns = columnGeneration(users)
const paginationData = ref({ currentPage: 0 })

const onData = ref({})
const dialogIdentification = ref(false)

onMounted(async () => {
  loadingTable.value = true

  try {
    // Here you can make the request to the API
    let answer = await getUsers()

    if (answer?.data?.status) {
      let { data } = answer.data

      rows.value = data.data.filter((item) => item.id !== 1)
      paginationData.value = {
        currentPage: data.current_page,
        lastPage: data.last_page,
        total: data.total - 1,
      }
    } else {
      showNotify(notify.TITLE, notify.ERROR, notify.COLOR.FALSE)
    }
  } catch (error) {
    console.error(error)
    showNotify(notify.TITLE, notify.ERROR, notify.COLOR.FALSE)
  } finally {
    loadingTable.value = false
  }
})

const showNotify = (title, comment, color) => {
  onTitle.value = title
  onComment.value = comment
  onColor.value = color
  dialogNotifyModel.value = true
}
</script>
