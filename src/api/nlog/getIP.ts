import { useRequester, type TransformedResponse } from '@/api/requester/index';

export interface GetIPResponse {
  /** ip */
  ip: string;
  /** 備註 */
  remark: string;
}

/**
 * 查詢來源清單
 */
async function getIP(): Promise<TransformedResponse<GetIPResponse[]>> {
  const response = await useRequester().post('/nlog/getIP');

  if (!response.success) {
    console.warn('use fakeData');
    return {
      success: true,
      message: '',
      data: [
        {
          ip: 'testIP',
          remark: 'testIP',
        },
        {
          ip: 'testIP1',
          remark: 'testIP1',
        },
        {
          ip: 'testIP2',
          remark: 'testIP2',
        },
      ],
    };
  }

  return response;
}

export default getIP;
