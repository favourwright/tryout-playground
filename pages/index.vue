<template>
  <div class="tw-bg-gray-50">
    <div class="tw-max-w-3xl tw-mx-auto tw-py-10 tw-px-4">
      <h1 class="tw-text-6xl">UI Replication</h1>
  
      <div class="tw-mt-10">
        <CustomInput
          v-model="input"
          :options="{
            minLen: 8,
            placeholder: 'Password field',
            isPasswordField: true,
            isColorCoded: true,
          }"
          class="tw-rounded-2xl tw-border-[3px] tw-border-gray-200 tw-bg-white" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomInput from '@/components/CustomInput.vue'

const input = ref('')
</script>