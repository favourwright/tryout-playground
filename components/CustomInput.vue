<template>
  <div
    @click="handleFocus"
    class="tw-w-full tw-max-w-full tw-inline-flex tw-relative
    tw-border-2 tw-border-black tw-p-3 tw-text-4xl tw-group">
    <span class="tw-text-black tw-relative tw-max-w-[calc(100%-44px)]">
      <span
        :class="{ 'tw-opacity-0': !!modelValue }"
        class="tw-absolute tw-text-gray-200 tw-whitespace-nowrap tw-select-none">
        {{ options?.placeholder }}
      </span>
      <input
        ref="input"
        :value="modelValue"
        @input="handleInput"
        :type="(options?.isPasswordField && !showPassword) ? 'password' : 'text'"
        class="tw-absolute tw-inset-0 tw-outline-none tw-caret-transparent">

      <!-- pseudo element to match input dimensions -->
      <span class="tw-invisible tw-transition-all tw-duration-100">{{ replaceSpaces(modelValue) }}</span>
    </span>

    <span
      :class="{
        'tw-flex-1 !tw-justify-end': (validatorProgress >= 100),
        'tw-pl-1': !!modelValue,
        'group-hover:tw-opacity-0': ((validatorProgress >= 100) && hover) && options?.isPasswordField,
      }"
      class="tw-relative tw-inline-flex tw-items-center tw-justify-start
      tw-transition-all tw-duration-300">
      <!-- add fade-in fade-out animation if blink==true -->
      <AnimatedCursor
        :class="[
          {'blink': blink && !(validatorProgress >= 100) },
          _3StepColor
        ]"
        class="tw-absolute"
        :progress="validatorProgress"
      />
    </span>
    <div
      :class="{
        'tw-hidden': !options?.isPasswordField,
        'tw-opacity-0': (validatorProgress >= 100),
        'group-hover:tw-opacity-100': hover,
      }"
      class="tw-absolute tw-right-0 tw-w-[40px] tw-h-[40px]
      tw-flex tw-items-center tw-justify-center tw-mr-3
      tw-transition-all tw-duration-200">
      <v-icon
        @click="showPassword = !showPassword"
        :class="{ '!tw-text-black': showPassword }"
        class="tw-transition-all tw-duration-300 tw-text-gray-300 tw-bg-white">
        {{ showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline' }}
      </v-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimatedCursor from '@/components/AnimatedCursor.vue'

interface Props {
  modelValue: string
  options?: {
    minLen: number
    placeholder?: string
    isPasswordField?: boolean
    isColorCoded?: boolean
  }
}
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])
const blink = ref(true)

const activateBlinker = useDebounceFn(() => blink.value = true, 1000)
const handleInput = (event: Event) => {
  emits('update:modelValue', (event.target as HTMLInputElement).value)

  blink.value = false
  activateBlinker()
}

// replace shace characters with dot because literal space
// introduces a weird behaviour with the pseudo element
const char = "•"
const replaceSpaces = (value: string) => {
  return value.replace(/\s/g, char)
}

const input = ref<HTMLInputElement | null>(null)
const handleFocus = () => {
  input.value?.focus()
}

// each index represents a constraint from 1-100
type Constaints = [number, number, number, number]
const validatorProgress = computed(()=>{
  // if password field
  const passedValidationConstraints:Constaints = [0,0,0,0]
  if(props.options?.isPasswordField) {
    // check if password contains minLen characters
    passedValidationConstraints[0] = Math.min(((Number(props.modelValue.split('').length) / Number(props?.options?.minLen)) * 100), 100)
    // check if password contains at least one number
    passedValidationConstraints[1] = /\d/.test(props.modelValue) ? 100 : 0
    // check if password contains at least one uppercase letter
    passedValidationConstraints[2] = /[A-Z]/.test(props.modelValue) ? 100 : 0
    // check if password contains at least one special character
    passedValidationConstraints[3] = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(props.modelValue) ? 100 : 0

    return passedValidationConstraints.reduce((a, b) => a + b, 0) / passedValidationConstraints.length
  }

  // default
  return (Number(props.modelValue.split('').length) / Number(props?.options?.minLen)) * 100
})
const _3StepColor = computed(() => {
  if(!props.options?.isColorCoded) return ''
  if(validatorProgress.value >= 100) return '[&>.colour]:tw-bg-emerald-700'
  if(validatorProgress.value >= 50) return '[&>.colour]:tw-bg-yellow-500'
  return '[&>.colour]:tw-bg-red-500'
})

// if field is password, show password on click
const showPassword = ref(false)
const hover = ref(true)

const activateHover = useDebounceFn(() => hover.value = true, 2000)
watch(validatorProgress, () => {
  if(validatorProgress.value >= 100) {
    hover.value = false
    activateHover()
  }
})
</script>

<style scoped>
.blink {
  animation: blink 1s infinite;
}
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>