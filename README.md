# my CJK API

提供 my CJK 串接 API

## 功能

- 註冊 API
- 登入 API
- 查詢單字 API
- 編輯單字 API
- 新增單字 API

## 安裝與執行

1. 請先確認有安裝 Node.js 、 npm 、 MySQL 與 MySQL Workbench
2. clone 專案到本地
3. 在本地開啟後，透過終端機進入資料夾，輸入:

```bash
npm install
```

4. 新增 .env 檔案，設定環境變數 (參考.env.example 檔案)
5. 開啟 MySQL Workbench 建立資料庫，在指令編輯區輸入:

```bash
create database <資料庫名稱>
```

6. 建立資料表，在終端機輸入:

```bash
npx sequelize db:migrate
```

7. 載入種子資料， 在在終端機輸入:

```bash
npm run seed
```

8. 執行專案，在終端機輸入:

```bash
npm run start
```

9. 要暫停使用，請在終端機輸入:

```bash
ctrl + c
```

## 開發工具

- Node.js 
- Express 4.16.4