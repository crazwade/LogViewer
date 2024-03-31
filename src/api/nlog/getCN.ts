import { useRequester, type TransformedResponse } from '@/api/requester/index';

export interface GetCnResponse {
  /** cn 資訊 */
  cn: string;
  /** 備註 */
  remark: string;
}

/**
 * 查詢CN清單
 */
async function getCN(): Promise<TransformedResponse<GetCnResponse[]>> {
  const response = await useRequester().post('/nlog/getCN');

  if (!response.success) {
    console.warn('use fakeData');
    return {
      success: true,
      message: '',
      data: [
        {
          cn: 'testCN',
          remark: 'testCN',
        },
        {
          cn: 'testCN1',
          remark: 'testCN1',
        },
        {
          cn: 'testCN2',
          remark: 'testCN2',
        },
      ],
    };
  }

  return response;
}

export default getCN;
