<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div class="flex flex-col w-full">
    <el-form ref="formRef" :model="formData" :inline="true">
      <el-form-item label="時間" prop="searchTime">
        <TimePicker
          v-model="timeRange"
          @time-change="handleTimePickerChange"
          ref="TimePickerRef"
        />
      </el-form-item>
      <el-form-item label="來源 Source" prop="source">
        <el-select
          v-model="formData.source"
          multiple
          collapse-tags
          placeholder="Select"
          style="width: 150px"
        >
          <el-option
            v-for="item in porps.sourceOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="CN 名稱" prop="cn">
        <Select
          ref="cnSelect"
          v-model="formData.cn"
          :options="porps.cnOption"
          :customSelectClass="'width: 120px'"
        />
      </el-form-item>
      <el-form-item label="IP" prop="ip">
        <Select
          v-model="formData.ip"
          :options="porps.ipOption"
          :customSelectClass="'width: 120px'"
          ref="ipSelect"
        />
      </el-form-item>
      <el-form-item label="log level" prop="level">
        <el-input type="number" v-model.number="formData.level" placeholder="log level" />
      </el-form-item>
      <el-form-item label="pid" prop="pid">
        <el-input v-model="formData.pid" placeholder="pid" />
      </el-form-item>
      <el-form-item label="訊息包含" prop="msg">
        <el-input v-model="formData.msg" placeholder="訊息包含(關鍵字)" />
      </el-form-item>
      <el-form-item label="來源包含" prop="source_find">
        <el-input v-model="formData.source_find" placeholder="來源包含(關鍵字)" />
      </el-form-item>
      <div class="flex w-full justify-end">
        <el-form-item class="flex w-full justify-end">
          <el-button type="primary" @click="submit">查詢</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import TimePicker from '@/components/TimePicker/TimePicker.vue';
import Select from '@/components/select/Select.vue';
import { DefaultOption } from '@/components/select/types';
import type { FindLogPayload } from '@/api/nlog/findLog';

const cnSelect = ref<InstanceType<typeof Select>>();
const ipSelect = ref<InstanceType<typeof Select>>();
const TimePickerRef = ref<InstanceType<typeof TimePicker>>();
const formRef = ref<FormInstance | null>(null);

const formData = reactive<FindLogPayload>({
  begin_time: 0,
  end_time: 0,
  source: [],
  source_find: undefined,
  level: undefined,
  ip: DefaultOption.all,
  cn: DefaultOption.all,
  pid: undefined,
  msg: undefined,
});

const timeRange = ref([]);
const porps = defineProps(['sourceOption', 'cnOption', 'ipOption']);
const emit = defineEmits(['submit', 'reset']);

const handleTimePickerChange = (date: Date[]) => {
  formData.begin_time = Math.floor(new Date(date[0]).getTime() / 1000);
  formData.end_time = Math.floor(new Date(date[1]).getTime() / 1000);
};

const submit = () => {
  emit('submit', formData);
};

const reset = () => {
  formRef.value!.resetFields();
  cnSelect.value?.resetSelect();
  ipSelect.value?.resetSelect();
  TimePickerRef.value?.resetTimePicker();
  emit('reset', formData);
};

onMounted(() => {
  emit('submit', formData);
});

</script>

<style lang="scss" scoped>

</style>
