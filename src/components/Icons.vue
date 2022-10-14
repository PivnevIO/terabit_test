<template>
  <button class="icons-button" :disabled="IconsData.disabled" @click="enterAction">
    <faIcons :icon="IconsData.iconName" />
  </button>
</template>

<script lang="ts" setup>
import { IconsModel } from "../models"
import { defineProps } from "vue";

interface Props {
  IconsData: IconsModel
}
const emit = defineEmits(['onClick']);

const enterAction = (): void => {
  emit('onClick', props.IconsData.actionParams)
}

const props = defineProps<Props>();
</script>

<style lang="scss">
</style>