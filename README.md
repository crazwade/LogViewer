# LogViewer

LogViewer 是一個專為後端工程師設計的日誌查看系統，旨在提供一個效率高、易於使用的界面，讓使用者能夠輕鬆查看和分析大量的日誌紀錄。該系統基於 Vue.js 框架開發，並使用了 Element Plus 的 Virtualized Table 來展示日誌紀錄，確保即使是大量資料的情況下，頁面仍能保持流暢。

## 功能特色

- **虛擬化表格展示**：使用 Element Plus 的 Virtualized Table 技術，支援大量日誌資料的高效展示，讓使用者能夠快速瀏覽並定位所需的資料。
- **多條件查詢**：提供了一個方便的搜尋bar，讓使用者可以根據時間、級別、來源、PID、IP 等條件進行精確查詢，快速找到目標日誌資料。
- **可點擊展開詳細資訊**：表格中的欄位可點擊，點擊後會彈出一個 dialog 展示該筆日誌的詳細資訊，並支援對於 JSON 格式的資料使用 vue-json-pretty 進行美觀的展示。

## 技術堆疊

- *Vue.js: 主要的前端框架
- *Element Plus: 用於展示虛擬化表格
- *Axios: 用於與後端服務進行資料交互
- *Vue Router: 用於處理路由
- *Pinia: Vue.js 狀態管理庫
- *Vue Axios: 簡化與 Axios 整合的 Vue.js 插件
- *Vue JSON Pretty: 用於美觀展示 JSON 格式的資料

## 快速開始

- clone 存儲庫到本地機器。
- 安裝依賴項： npm install。
- 啟動開發服務器： npm run dev。
- 打開瀏覽器，訪問 http://localhost:3000 查看應用程式。
