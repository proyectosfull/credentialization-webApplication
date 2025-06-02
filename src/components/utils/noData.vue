<template>
  <div class="row">
    <div class="text-center q-pt-md col justify-between">
      <template v-if="!search">
        <img
          :style="$q.screen.sm ? 'width: 45%; height: auto' : 'width: 25%; height: auto'"
          src="~assets/svg/noData.svg"
        />
        <q-separator class="q-my-sm" />
        <span class="text-italic text-caption text-grey-8">
          Por el momento no hay datos para mostrar.
        </span>
        <q-separator class="q-my-sm" />
      </template>
      <q-spinner-dots v-else color="primary" size="6em" />
    </div>
  </div>
</template>

<script setup>
const { search } = defineProps({
  path: {
    type: String,
    required: false,
    default: 'noData.svg',
  },
  search: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>
