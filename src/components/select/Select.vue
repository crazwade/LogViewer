<template>
  <div
    class="flex gap-[10px]"
  >
    <el-select
      v-model="selectedOption"
      filterable
      :style="customSelectClass"
    >
      <el-option
        v-for="item in mergedOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-input
      ref="customInputRef"
      v-if="selectedOption === 'custom'"
      v-model="outputValue"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  ref, computed, watch, nextTick,
} from 'vue';
import { ElInput } from 'element-plus';
import { DefaultOption } from './types';

type OptionValue = DefaultOption | string;

const props = defineProps<{
  modelValue?: string;
  options: {
    label: string;
    value: string;
  }[];
  customSelectClass: string;
}>();
const emit = defineEmits<{
  'update:modelValue': [OptionValue];
}>();

const customInputRef = ref<InstanceType<typeof ElInput>>();
/**
 * 合併預設選項與輸入選項
 */
const mergedOptions = computed<{
  label: string;
  value: OptionValue;
}[]>(() => [
  {
    label: '全部',
    value: DefaultOption.all,
  },
  {
    label: '自訂',
    value: DefaultOption.custom,
  },
  ...props.options,
]);
const selectedOption = ref<OptionValue>(DefaultOption.all);
/**
 * 要輸出的數值
 */
const outputValue = ref(selectedOption.value);

watch(selectedOption, async (value) => {
  if (value === DefaultOption.custom) {
    await nextTick();
    customInputRef.value?.select();
    outputValue.value = '';
    return;
  }

  outputValue.value = value;
});

watch(outputValue, (value) => {
  emit('update:modelValue', value);
});

// 傳送初始值
emit('update:modelValue', outputValue.value);

const resetSelect = () => {
  selectedOption.value = DefaultOption.all;
};

defineExpose({ resetSelect });
</script>
