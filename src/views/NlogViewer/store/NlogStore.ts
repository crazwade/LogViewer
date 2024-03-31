import { defineStore } from 'pinia';
import findLog from '@/api/nlog/findLog';
import getCN from '@/api/nlog/getCN';
import getIP from '@/api/nlog/getIP';
import getSource from '@/api/nlog/getSource';
import { DefaultOption } from '@/components/select/types';
import type { FindLogResponse, FindLogPayload } from '@/api/nlog/findLog';
import { RestRequestErrorCode } from '@/api/requester';

interface Option {
  label: string;
  value: string;
}

interface TableResp {
  respType: 'success' | 'error' | 'timeOut';
  data: FindLogResponse[];
}

const useNlogDataStore = defineStore({
  id: 'Nlog',
  state: (): {
    isInitialized: boolean;
    cnOptions: Option[];
    ipOptions: Option[];
    sourceOptions: Option[];
    payload: FindLogPayload;
  } => ({
    isInitialized: false,
    cnOptions: [],
    ipOptions: [],
    sourceOptions: [],
    payload: {
      begin_time: 0,
      end_time: 0,
      limit: 100,
      page: 1,
      source: [],
      source_find: undefined,
      level: undefined,
      ip: undefined,
      cn: undefined,
      pid: undefined,
      msg: undefined,
    },
  }),
  actions: {
    initOptions() {
      this.payload.limit = 100;
      this.payload.page = 1;
      if (!this.isInitialized) {
        this.getCNOptions();
        this.getIPOptions();
        this.getSourceOptions();
        this.isInitialized = true;
      }
    },
    async getCNOptions() {
      const resp = await getCN();

      if (!resp.success || !resp.data) return;

      const formattedOptions = resp.data.map(
        (item) => ({ label: item.cn, value: item.cn }),
      );

      this.cnOptions = formattedOptions;
    },
    async getIPOptions() {
      const resp = await getIP();

      if (!resp.success || !resp.data) return;

      const formattedOptions = resp.data.map(
        (item) => ({ label: item.ip, value: item.ip }),
      );

      this.ipOptions = formattedOptions;
    },
    async getSourceOptions() {
      const resp = await getSource();

      if (!resp.success || !resp.data) return;

      const formattedOptions = resp.data?.map(
        (item) => ({ label: item.source, value: item.source }),
      );

      this.sourceOptions = formattedOptions;
    },
    async getLogs(
      formData: FindLogPayload,
      pageSize: number,
      page: number,
    ): Promise<TableResp> {
      this.payload.begin_time = formData.begin_time;
      this.payload.end_time = formData.end_time;
      this.payload.source = formData.source!.length === 0 ? undefined : formData.source;
      this.payload.source_find = formData.source_find;
      this.payload.cn = formData.cn === DefaultOption.all ? undefined : formData.cn;
      this.payload.ip = formData.ip === DefaultOption.all ? undefined : formData.ip;
      this.payload.level = typeof formData.level !== 'number' ? undefined : formData.level;
      this.payload.pid = formData.pid === undefined || formData.pid === '' ? undefined : formData.pid;
      this.payload.msg = formData.msg === undefined || formData.msg === '' ? undefined : formData.msg;
      this.payload.limit = pageSize;
      this.payload.page = page;

      const resp = await findLog(this.payload);

      if (!resp.success) {
        return {
          respType: resp.errorCode === RestRequestErrorCode.TIMEOUT ? 'timeOut' : 'error',
          data: [],
        };
      }

      return {
        respType: 'success',
        data: resp.data?.data ?? [],
      };
    },
    async getNextLogs() : Promise<TableResp> {
      this.payload.page! += 1;
      const resp = await findLog(this.payload);

      if (!resp.success) {
        return {
          respType: resp.errorCode === RestRequestErrorCode.TIMEOUT ? 'timeOut' : 'error',
          data: [],
        };
      }

      return {
        respType: 'success',
        data: resp.data?.data ?? [],
      };
    },
  },
});

export default useNlogDataStore;
