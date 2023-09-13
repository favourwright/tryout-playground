<template>
  <span
    :class="{ '!tw-w-[40px]' : animate }"
    class="tw-w-2 tw-h-[40px] tw-bg-gray-200 tw-rounded-full
    tw-relative tw-overflow-hidden tw-flex tw-flex-col tw-justify-end
    tw-transition-all tw-duration-300
    [&>.check-icon]:tw-text-white [&>.colour]:tw-bg-blue-600">
    <span
      :style="`height: ${animate ? 100 : progress}%;`"
      class="colour tw-transition-all tw-duration-300">
    </span>

    <span class="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-text-base check-icon">
      <v-icon
        :class="{ 'tw-scale-100':animate }"
        class="tw-scale-0 tw-delay-200 tw-transition-all tw-duration-300">
        mdi-check
      </v-icon>
    </span>
  </span>
</template>

<script setup lang="ts">
interface Props {
  progress: number
}
const props = defineProps<Props>()
const animate = ref(false)
watch(()=>props.progress, (val) => {
  (val >= 100) ? (animate.value = true) : (animate.value = false)
}, { immediate: true })
</script>