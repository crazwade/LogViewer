import { useRequester, type TransformedResponse } from '@/api/requester/index';
import fakeData from '@/util/fakeData';

export interface FindLogPayload {
  /** 必填, 起始時間(秒) */
  begin_time: number;
  /** 必填, 結束時間(秒)，時間不可以顛倒 */
  end_time: number;
  /** 選填, 回傳最大比數, 預設100 */
  limit?: number;
  /** 選填, 回傳第幾頁, 預設0 */
  page?: number;
  /** 選填, 查詢的來源, 缺項為全部 */
  source?: string[];
  /** 選填, 查詢的來源關鍵字(較慢), 缺項為全部 */
  source_find?: string;
  /** 選填, 指定查找<=level, 缺項為全部 */
  level?: number;
  /** 選填, 指定ip, 缺項為全部 */
  ip?: string;
  /** 選填, 指定CN, 缺項為全部 */
  cn?: string;
  /** 選填, 指定PID, 缺項為全部 */
  pid?: string;
  /** 選填, 查詢關鍵字(較慢), 缺項為全部 */
  msg?: string;
}

export interface FindLogResponse {
  /** 資料ID */
  id: number;
  /** 資料建立時間 (SQL 用戶端時間) */
  createtime: string;
  /** 進程ID */
  pid: string;
  /** 日誌等級 */
  level: string;
  /** 日誌來源 */
  source: string[];
  /** 日誌訊息 */
  message: string;
  /** IP 位址 */
  ip: string;
  /** CN (Class Name) */
  cn: string;
  /** 資料狀態 */
  log_state: number;
  /** 伺服器紀錄時間 */
  log_time: string;
  /** 所在資料表 */
  table: string;
  /** 資料建立時間 (SQL 用戶端時間TS) */
  create_ts: number;
}

interface Response {
  status: boolean;
  page: {
    page_size: number;
    page: number;
    total: number;
  };
  data: FindLogResponse[];
}

/**
 * 查詢Log紀錄
 */
async function findLog(payload: FindLogPayload): Promise<TransformedResponse<Response>> {
  const response = await useRequester().post('/nlog/findLog', payload);

  console.log(fakeData(5));

  if (!response.success) {
    console.warn('use fakeData');
    return {
      success: true,
      message: '',
      data: {
        status: true,
        page: {
          page_size: 10,
          page: 0,
          total: 10, // 此為這一頁的資料數不是全部
        },
        data: fakeData(payload.limit ?? 100),
      },
    };
  }

  return response;
}

export default findLog;
