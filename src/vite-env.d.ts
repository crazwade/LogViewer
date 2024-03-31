/// <reference types="vite/client" />
interface Window {
  /** 網頁位置 @example '/public' */
  PUBLIC_ROUTE_PATH: string;
  /** API路徑，若未定義則需使用預設值取代 */
  API_PATH: string;
}
