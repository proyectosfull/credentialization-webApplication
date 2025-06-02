<template>
  <div class="text-grey-8 text-left full-width col-12 text-center" style="height: 20px important!">
    <div class="row items-center">
      <div class="col text-italic">Registros: {{ total }}</div>
      <div class="col text-center">
        <div class="flex flex-center">
          <q-pagination
            v-model="inCurrentPage"
            color="primary"
            :max="3"
            :max-pages="totalPages"
            :ellipses="false"
            :boundary-numbers="false"
            @update:model-value="$emit('updateCurrentPage', inCurrentPage)"
          />
        </div>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import { toRef, ref } from 'vue'
export default {
  emits: ['updateCurrentPage'],
  props: {
    total: {
      type: Number,
      default: 0,
    },
    totalPages: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const getCurrentPage = toRef(props, 'currentPage')
    const inCurrentPage = ref(getCurrentPage.value)

    return {
      inCurrentPage,
    }
  },
}
</script>
