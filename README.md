# School Project Website — 部署到 GitHub Pages（新手友好）

簡單步驟讓你的專案自動部署到 GitHub Pages（不需要額外工具）。

步驟：

1. 在 GitHub 建立新倉庫（Repository）。
   - 登入 https://github.com → 點 `New` 建立一個新 repo，名稱舉例：`school-project-website`。
2. 在本機專案目錄打開終端機（VS Code 內建終端機或 Windows PowerShell），執行：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<你的使用者名稱>/<你的repo>.git
git push -u origin main
```

（把上面 `https://...` 換成你剛剛在 GitHub 建的那個 repo URL。）

3. 本專案已包含 GitHub Actions 工作流程，會在每次推到 `main` 時自動部署到 GitHub Pages。等待 Actions 完成後，Pages 網址會顯示在倉庫的 `Settings → Pages` 或 Actions 的輸出中。

檢查圖片引用問題：

你可以在本機先跑診斷腳本來確認圖片大小寫或路徑問題：

```bash
node check-images.js
```

如果診斷回報 `CASE MISMATCH` 或 `MISSING`，請依指示修改對應檔案的引用或檔案名稱（大小寫必須完全一致）。

有需要我可以：
- 幫你把遠端 repo 建好（需要你的 GitHub 權限或 Personal Access Token）。
- 或協助你把 `git push` 指令複製好並一步步指導。
