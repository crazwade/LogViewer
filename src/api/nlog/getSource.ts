import { useRequester, type TransformedResponse } from '@/api/requester/index';

export interface GetSourceResponse {
  /** 來源 */
  source: string;
  /** 備註 */
  remark: string;
}

/**
 * 查詢來源清單
 */
async function getSource(): Promise<TransformedResponse<GetSourceResponse[]>> {
  const response = await useRequester().post('/nlog/getSource');

  if (!response.success) {
    console.warn('use fakeData');
    return {
      success: true,
      message: '',
      data: [
        {
          source: 'testsource',
          remark: 'testsource',
        },
        {
          source: 'testsource1',
          remark: 'testsource1',
        },
        {
          source: 'testsource2',
          remark: 'testsource2',
        },
      ],
    };
  }

  return response;
}

export default getSource;
