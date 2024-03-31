<template>
  <div class="flex gap-[10px] items-center">
    <!-- Last or This -->
    <el-select
      v-model="duringOption"
      placeholder="Select"
      @change="handleDuringOptionChange()"
      :disabled="popValue === 'custom'"
    >
      <el-option
        v-for="item in duringOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <!-- 時間數值 -->
    <el-input
      v-model="timeValue"
      placeholder="Please input"
      :disabled="duringOption === 'This' || popValue === 'custom'"
    />
    <!-- 時間單位 -->
    <el-select
      v-model="unitOption"
      placeholder="Select"
      :disabled="popValue === 'custom'"
    >
      <el-option
        v-for="item in (duringOption === 'Last' ? unitOptionsLast : unitOptionsThis)"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <!-- 時間自定義 -->
    <div class="flex-1">
      <el-date-picker
        v-model="detaPickerValue"
        type="datetimerange"
        range-separator="To"
        start-placeholder="開始時間"
        end-placeholder="結束時間"
        :defaultTime="defaultTime"
        :disabled="popValue !== 'custom'"
      />
    </div>
    <!-- 快速選擇 -->
    <el-popover
      :visible="popVisible"
      placement="bottom"
      width="200"
    >
      <template #reference>
        <el-button
          @click="popVisibleClose"
        >
          快速選擇
        </el-button>
      </template>
      <template #default>
        <div class="grid grid-cols-2 gap-1 popover-item odd:justify-center">
          <ElButton
            link
            type="primary"
            @click="getPopValue('This', 'day')"
          >
            本日
          </ElButton>
          <ElButton
            link
            type="primary"
            @click="getPopValue('This', 'week')"
          >
            本週
          </ElButton>
          <ElButton
            link
            type="primary"
            @click="getPopValue('Last', 'minute', 15)"
          >
            近 15 分鐘
          </ElButton>
          <ElButton
            link
            type="primary"
            @click="getPopValue('Last', 'minute', 30)"
          >
            近 30 分鐘
          </ElButton>
          <ElButton
            link
            type="primary"
            @click="getPopValue('Last', 'hours', 1)"
          >
            近 1 小時
          </ElButton>
          <ElButton
            link
            type="primary"
            @click="getPopValue('Last', 'hours', 24)"
          >
            近 24 小時
          </ElButton>
          <ElButton
            link
            type="primary"
            @click="getPopValue('Last', 'day', 7)"
          >
            近 7 天
          </ElButton>
          <ElButton
            link
            type="primary"
            @click="getPopValue('Last', 'day', 30)"
          >
            近 30 天
          </ElButton>
          <ElButton
            link
            type="primary"
            @click="getPopValue('Last', 'year', 1)"
          >
            近 1 年
          </ElButton>
        </div>
      </template>
    </el-popover>
    <ElButton
      type="primary"
      class="!m-0"
      :disabled="popValue === 'custom'"
      @click="getPopValue('custom', 'day')"
    >
      自定義時間
    </ElButton>
  </div>
</template>

<script setup lang='ts'>
import { watchEffect, ref } from 'vue';

const Config = {
  duringOption: 'Last',
  unitOption: 'day',
  timeValue: 1,
  popValue: '',
};

const duringOption = ref(Config.duringOption);
const unitOption = ref(Config.unitOption);
const timeValue = ref(Config.timeValue);
const popVisible = ref(false);
const popValue = ref(Config.popValue);
const detaPickerValue = ref<[Date, Date]>([
  new Date(),
  new Date(),
]);

const defaultTime = ref<[Date, Date]>([
  new Date('2024/03/27 00:00:00'),
  new Date('2024/03/27 23:59:59'),
]);

const emit = defineEmits(['time-change']);

const handleDuringOptionChange = () => {
  unitOption.value = duringOption.value === 'This' ? 'day' : 'hours';
  timeValue.value = duringOption.value === 'This' ? 0 : 1;
};

/** This or Last */
const duringOptions = [
  {
    value: 'Last',
    label: '近',
  },
  {
    value: 'This',
    label: '本',
  },
];

const unitOptionsLast = [
  {
    value: 'second',
    label: '秒',
  },
  {
    value: 'minute',
    label: '分鐘',
  },
  {
    value: 'hours',
    label: '小時',
  },
  {
    value: 'day',
    label: '天',
  },
  {
    value: 'week',
    label: '週',
  },
  {
    value: 'month',
    label: '月',
  },
  {
    value: 'year',
    label: '年',
  },
];

const unitOptionsThis = [
  {
    value: 'day',
    label: '日',
  },
  {
    value: 'week',
    label: '週',
  },
  {
    value: 'month',
    label: '月',
  },
  {
    value: 'year',
    label: '年',
  },
];

const popVisibleClose = () => {
  popVisible.value = !popVisible.value;
};

const getPopValue = (duringValue: string, unitValue: string, unit: number = 0) => {
  popValue.value = duringValue;
  duringOption.value = duringValue === 'custom' ? 'Last' : duringValue;
  unitOption.value = unitValue;
  timeValue.value = unit;
  popVisible.value = false;
};

watchEffect(() => {
  let startTime: Date = new Date(0);
  const endTime: Date = new Date();
  // endTime.setHours(23, 23, 59, 59);
  if (duringOption.value === 'Last') {
    const currentDate = new Date(); // 獲取當前日期
    let tmp;

    switch (unitOption.value) {
      case 'second':
        startTime = new Date(currentDate.getTime() - timeValue.value * 1000);
        break;
      case 'minute':
        startTime = new Date(currentDate.getTime() - timeValue.value * 60 * 1000);
        break;
      case 'hours':
        startTime = new Date(currentDate.getTime() - timeValue.value * 60 * 60 * 1000);
        break;
      case 'day':
        tmp = currentDate.getTime() - timeValue.value * 24 * 60 * 60 * 1000;
        startTime = new Date(new Date(tmp).setHours(0, 0, 0, 0));
        break;
      case 'week':
        tmp = new Date(currentDate.getTime() - timeValue.value * 7 * 24 * 60 * 60 * 1000);
        tmp.setDate(tmp.getDate() - (tmp.getDay() - 1));
        startTime = new Date(tmp.setHours(0, 0, 0, 0));
        break;
      case 'month':
        tmp = new Date(new Date(currentDate).setMonth(currentDate.getMonth() - timeValue.value));
        tmp.setDate(1);
        startTime = new Date(tmp.setHours(0, 0, 0, 0));
        break;
      case 'year':
        tmp = new Date(currentDate.getTime() - timeValue.value * 365 * 24 * 60 * 60 * 1000);
        tmp.setMonth(0);
        tmp.setDate(1);
        tmp.setHours(0, 0, 0, 0);
        startTime = new Date(tmp.getTime());
        break;
      default:
        startTime = new Date(0);
        break;
    }
  }

  if (duringOption.value === 'This') {
    const currentDate = new Date(); // 獲取當前日期

    switch (unitOption.value) {
      case 'day':
        currentDate.setHours(0, 0, 0, 0);
        startTime = new Date(currentDate.getTime());
        break;
      case 'week':
        currentDate.setDate(currentDate.getDate() - (currentDate.getDay() - 1));
        currentDate.setHours(0, 0, 0, 0);
        startTime = new Date(currentDate.getTime());
        break;
      case 'month':
        currentDate.setDate(1);
        currentDate.setHours(0, 0, 0, 0);
        startTime = new Date(currentDate.getTime());
        break;
      case 'year':
        currentDate.setMonth(0);
        currentDate.setDate(1);
        currentDate.setHours(0, 0, 0, 0);
        startTime = new Date(currentDate.getTime());
        break;
      default:
        startTime = new Date(0);
        break;
    }
  }

  if (popValue.value === 'custom') {
    emit('time-change', detaPickerValue.value);
    return;
  }

  detaPickerValue.value[0] = startTime;
  detaPickerValue.value[1] = endTime;

  emit('time-change', detaPickerValue.value);
});

const resetTimePicker = () => {
  duringOption.value = Config.duringOption;
  unitOption.value = Config.unitOption;
  timeValue.value = Config.timeValue;
  popValue.value = Config.popValue;
};

defineExpose({ resetTimePicker });
</script>

<style lang="scss" scoped>

.popover-item {
  .el-button {
    &:nth-child(odd) {
      justify-content: end;
    }
    &:nth-child(even) {
      justify-content: start;
    }
  }
}

</style>
