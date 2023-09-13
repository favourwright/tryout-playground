<template>
  <div
    @click="handleFocus"
    class="tw-w-full tw-max-w-full tw-inline-flex
    tw-border-2 tw-border-black tw-p-3 tw-text-4xl">
    <span class="tw-text-black tw-relative tw-max-w-[calc(100%-44px)]">
      <input
        ref="input"
        :value="modelValue"
        @input="handleInput"
        type="text"
        class="tw-absolute tw-inset-0 tw-outline-none tw-caret-transparent">

      <!-- pseudo element to match input dimensions -->
      <span class="tw-invisible tw-transition-all tw-duration-100">{{ !!modelValue ? replaceSpaces(modelValue): '.' }}</span>
    </span>

    <span
      :class="{ 'tw-flex-1 !tw-justify-end': (validatorProgress >= 100) }"
      class="tw-relative tw-inline-flex tw-items-center tw-pl-1 tw-justify-start
      tw-transition-all tw-duration-300">
      <!-- add fade-in fade-out animation if blink==true -->
      <AnimatedValidator
        :class="{'blink': blink && !(validatorProgress >= 100) }"
        class="tw-absolute tw-left-0 [&>.colour]:tw-bg-emerald-700"
        :progress="validatorProgress"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import AnimatedValidator from '@/components/AnimatedValidator.vue'

interface Props {
  modelValue: string
  minLen: number
}
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])
const blink = ref(true)

const handleInput = (event: Event) => {
  emits('update:modelValue', (event.target as HTMLInputElement).value)

  blink.value = false
  const timer = setTimeout(() => {
    blink.value = true
    clearTimeout(timer)
  }, 1000)
}

const replaceSpaces = (value: string) => {
  return value.replace(/\s/g, '.')
}

const input = ref<HTMLInputElement | null>(null)
const handleFocus = () => {
  input.value?.focus()
}

const validatorProgress = computed(()=>{
  return (Number(props.modelValue.split('').length) / props.minLen) * 100
})
</script>

<style scoped>
.blink {
  animation: blink 1s infinite;
}
@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>