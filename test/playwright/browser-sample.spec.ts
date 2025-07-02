import { test, expect } from '@playwright/test'

test.describe('CLIP STUDIO.js Browser Sample UI', () => {
  test('should load page with correct title and structure', async ({ page }) => {
    await page.goto('/examples/sample-browser.html')
    
    // ページタイトルを確認
    await expect(page).toHaveTitle('CLIP STUDIO.js ブラウザサンプル')
    
    // メインタイトルを確認
    await expect(page.locator('h1')).toContainText('🎨 CLIP STUDIO.js')
    
    // 説明文を確認
    await expect(page.locator('p')).toContainText('ブラウザでCLIP STUDIOファイルを解析するサンプルアプリ')
    
    // アップロードエリアを確認
    await expect(page.locator('#uploadArea')).toBeVisible()
    await expect(page.locator('#uploadArea')).toContainText('📁 CLIPファイルを選択またはドロップ')
    
    // 初期状態では結果エリアが非表示であることを確認
    await expect(page.locator('#result')).toBeHidden()
    await expect(page.locator('#loading')).toBeHidden()
    await expect(page.locator('#error')).toBeHidden()
  })

  test('should show file upload interface correctly', async ({ page }) => {
    await page.goto('/examples/sample-browser.html')
    
    // ファイル入力要素を確認
    await expect(page.locator('#fileInput')).toBeAttached()
    await expect(page.locator('#fileInput')).toHaveAttribute('accept', '.clip')
    
    // アップロードエリアがクリック可能であることを確認
    const uploadArea = page.locator('#uploadArea')
    await expect(uploadArea).toBeVisible()
    await expect(uploadArea).toHaveCSS('cursor', 'pointer')
  })
})