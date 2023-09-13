<template>
  <div class="bg-gray-100">
    <div class="tw-max-w-3xl tw-mx-auto tw-py-20">
      <h1 class="tw-text-6xl">UI Replication</h1>
  
      <div class="tw-mt-10">
        <div>

        </div>
        <CustomInput
          v-model="input.name"
          :minLen="input.minLen"
          class="tw-rounded-2xl tw-border-[3px] tw-border-gray-200" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomInput from '@/components/CustomInput.vue'

const input = ref({
  name: 'favour',
  minLen: 8,
})
</script>