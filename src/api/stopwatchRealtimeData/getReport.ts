import { useRequester, type TransformedResponse } from '@/api/requester/index';

/**
 * 取效能監測即時報表HTML TABLE
 */
async function getReport(): Promise<TransformedResponse> {
  const response = await useRequester().get('/stopwatch/getReport');

  if (!response.success) {
    console.warn('use fakeData');
    return {
      success: true,
      message: '',
      data: '<style>table, tr, td {border: solid 1px #000;}.val {/* width: 10px; */verflow: hidden;max-width: 40px;text-wrap: nowrap;}</style><table><tr><td>name</td><td>ip</td><td>remark</td><td class="val"><0.01 </td><td class="val">=0.01<0.02 </td><td class="val">=0.02<0.03 </td><td class="val">=0.03<0.04 </td><td class="val">=0.04<0.05 </td><td class="val">=0.05<0.06 </td><td class="val">=0.06<0.07 </td><td class="val">=0.07<0.08 </td><td class="val">=0.08<0.09 </td><td class="val">=0.09<0.10 </td><td class="val">=0.1<0.2 </td><td class="val">=0.2<0.3 </td><td class="val">=0.3<0.4 </td><td class="val">=0.4<0.5 </td><td class="val">=0.5<0.6 </td><td class="val">=0.6<0.7 </td><td class="val">=0.7<0.8 </td><td class="val">=0.8<0.9 </td><td class="val">=0.9<1.0 </td><td class="val">=1<2 </td><td class="val">=2<3 </td><td class="val">=3<4 </td><td class="val">=4<5 </td><td class="val">=5<6 </td><td class="val">=6<7 </td><td class="val">=7<8 </td><td class="val">=8<9 </td><td class="val">=9<10 </td><td class="val">>10</td></tr><tr><td>模擬效能監測sleep123</td><td>127.0.0.1</td><td>none</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">130</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td><td class="val">0</td></tr><tr><td>測試</td><td>::1</td><td>NA</td><td class="val">10</td><td class="val">10</td><td class="val">10</td><td class="val">10</td><td class="val">10</td><td class="val">10</td><td class="val">10</td><td class="val">10</td><td class="val">10</td><td class="val">10</td><td class="val">100</td><td class="val">100</td><td class="val">100</td><td class="val">100</td><td class="val">100</td><td class="val">100</td><td class="val">100</td><td class="val">100</td><td class="val">100</td><td class="val">1000</td><td class="val">1000</td><td class="val">1000</td><td class="val">1000</td><td class="val">1000</td><td class="val">1000</td><td class="val">1000</td><td class="val">1000</td><td class="val">1000</td><td class="val">2000</td>/tr></table>',
    };
  }

  return response;
}

export default getReport;
