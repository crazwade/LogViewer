<template>
  <el-dialog
    v-model="visible"
    width="80%"
    class=" max-h-[75vh] !px-0"
    :show-close="false"
  >
    <el-scrollbar
      max-height="65vh"
    >
      <div class="px-4">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="資訊" name="1">
            <div class="text-[#D7B005] mb-[10px]">
              <vue-json-pretty
                :data="logData"
                :show-line="false"
                :show-icon="true"
                :showDoubleQuotes="true"
                theme="dark"
              />
            </div>
          </el-collapse-item>
          <el-collapse-item title="JSON Decode" name="2" v-if="!isJsonEmpty">
            <vue-json-pretty
              :data="jsonData"
              :show-line="false"
              :show-icon="true"
              :showDoubleQuotes="true"
              theme="dark"
            />
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-scrollbar>
    <template #footer>
      <div class="dialog-footer px-4">
        <el-button @click="onClose">關閉</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { ref, watch, computed } from 'vue';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import type { FindLogResponse } from '@/api/nlog/findLog';

const activeNames = ref(['1']);

const props = defineProps<{ dialogControl: boolean; data: FindLogResponse | undefined }>();
const emits = defineEmits<{
  'update:dialogControl': [value: boolean];
}>();

const visible = ref(false);

const logData = computed(() => props.data ?? {});

watch(() => props.dialogControl, (val) => {
  activeNames.value = ['1'];
  visible.value = val;
});

watch(() => visible.value, () => {
  emits('update:dialogControl', visible.value);
});

const onClose = () => {
  visible.value = false;
};

const jsonData = computed(() => {
  if (!props.data) return {}; // 如果 props.data 為空，返回空對象
  if (!props.data.message) return {}; // 如果 props.data.message 為空，返回空對象

  const jsonString: string = props.data.message;

  // 檢查 props.message 是否包含 '{' 和 '}'
  const checkStartIndex = jsonString.indexOf('{');
  const checkEndIndex = jsonString.lastIndexOf('}');

  // 如果 props.message 不包含 '{' 或 '}'，返回空對象
  if (checkStartIndex === -1 || checkEndIndex === -1) {
    return {};
  }

  const jsonObjects: { [key: string]: any } = {};
  let startIndex = -1;
  let endIndex = -1;
  let index = 0; // 用於跟蹤 JSON 物件的索引

  // 遍歷字串，找到每個 JSON 物件的起始和結束位置
  for (let i = 0; i < jsonString.length; i += 1) {
    if (jsonString[i] === '{') {
      if (startIndex === -1) startIndex = i; // 設置起始位置
    } else if (jsonString[i] === '}') {
      if (startIndex !== -1) {
        endIndex = i; // 設置結束位置
        const jsonSubstring = jsonString.substring(startIndex, endIndex + 2);
        try {
          const jsonObject = JSON.parse(jsonSubstring); // 解析 JSON 物件
          jsonObjects[`第${(index + 1).toString()}筆JSON`] = jsonObject; // 將 JSON 物件添加到物件中，根據索引存儲
          startIndex = -1; // 重置起始位置
          index += 1;
        } catch (error) {
          console.error('Invalid JSON format');
        }
      }
    }
  }

  return jsonObjects;
});

// 檢查 jsonData 是否為空對象
const isJsonEmpty = computed(() => Object.keys(jsonData.value).length === 0);

</script>

<style lang="scss">
</style>
