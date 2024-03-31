enum apiErrorCode {
  '錯誤請求' = 400,
  '未授權請重新登錄' = 401,
  '拒絕訪問' = 403,
  '請求錯誤未找到該資源' = 404,
  '請求方法未允許' = 405,
  '請求超時' = 408,
  '服務器端出錯' = 500,
  '網路未實現' = 501,
  '網路錯誤' = 502,
  '服務不可用' = 503,
  '網路超時' = 504,
  'http版本不支持該請求' = 505,
  '未連線' = 0,
  '請求逾時' = 1,
  '沒有權限' = 2,
  '未知錯誤' = -1,
}

class ApiError extends Error {
  errorCode: apiErrorCode = apiErrorCode.未知錯誤;

  constructor (
    errorCode: apiErrorCode,
  ) {
    super();
    this.errorCode = errorCode;
    this.message = `apiErrorCode.${apiErrorCode[errorCode]}`;
  }
}

export {
  apiErrorCode,
  ApiError,
};
