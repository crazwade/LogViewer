<template>
  <el-button @click="findLogData">findLogData</el-button>
  <el-button @click="fetchgetCN">fetchgetCN</el-button>
  <el-button @click="fetchgetIP">fetchgetIP</el-button>
  <el-button @click="fetchgetSource">fetchgetSource</el-button>
</template>
<script setup lang="ts">
import findLog from '../api/nlog/findLog';
import getCN from '../api/nlog/getCN';
import getIP from '../api/nlog/getIP';
import getSource from '../api/nlog/getSource';

const findLogData = async () => {
  const payload = {
    begin_time: 1708012800, // 必填, (int)timestring(秒)
    end_time: 1708271999, // 必填, (int)timestring(秒) 時間不可以顛倒
    limit: 10, // 選填, 回傳最大比數, 預設100
    page: 0, // 選填, 回傳第幾頁, 預設0
    source: ['測試', ''], // 選填, 查詢的來源, 缺項為全部
    source_find: '測%', // 選填, 查詢的來源關鍵字(較慢), 缺項為全部
    level: 100, // 選填, 指定查找<=level, 缺項為全部
    ip: '127.0.0.1', // 選填, 指定ip, 缺項為全部
    cn: 'nodejs_rpg_bacc_source_bc_handler_4', // 選填, 指定CN, 缺項為全部
    pid: '37367', // 選填, 指定PID, 缺項為全部
    msg: '測試%', // 選填, 查詢關鍵字(較慢), 缺項為全部
  };
  const apiResp = await findLog(payload);

  console.log(apiResp);
};

const fetchgetCN = async () => {
  const apiResp = await getCN();

  console.log(apiResp);
};

const fetchgetIP = async () => {
  const apiResp = await getIP();

  console.log(apiResp);
};

const fetchgetSource = async () => {
  const apiResp = await getSource();

  console.log(apiResp);
};
</script>

<style scoped>

</style>../api/nlog/findLog
