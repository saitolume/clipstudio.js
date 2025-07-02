import { test, expect } from '@playwright/test'
import { promises as fs } from 'node:fs'

test.describe('CLIP STUDIO.js Package Integration', () => {
  test('should load and process CLIP file successfully in browser', async ({ page }) => {
    // コンソールログとエラーを監視
    const consoleMessages: string[] = []
    const errors: string[] = []
    
    page.on('console', msg => {
      consoleMessages.push(`[${msg.type()}] ${msg.text()}`)
    })
    page.on('pageerror', err => {
      errors.push(`Page error: ${err.message}`)
    })

    await page.goto('/examples/sample-browser.html')
    
    // ページの基本要素が読み込まれていることを確認
    await expect(page.locator('h1')).toContainText('🎨 CLIP STUDIO.js')
    
    // CLIPファイルをアップロード
    const clipFilePath = process.cwd() + '/test/sample.clip'
    await page.locator('#fileInput').setInputFiles(clipFilePath)
    
    // 処理完了まで待機（ローディング状態スキップ）
    await expect(page.locator('#result')).toBeVisible({ timeout: 30000 })
    
    // エラーが発生していないことを確認
    await expect(page.locator('#error')).toBeHidden()
    
    // **パッケージの主要機能をテスト**
    
    // 1. サムネイル取得機能の確認
    const thumbnailImg = page.locator('#thumbnailImage')
    await expect(thumbnailImg).toBeVisible()
    await expect(thumbnailImg).toHaveAttribute('src', /^blob:/)
    
    // サムネイル画像が実際に読み込まれることを確認
    const imgNaturalWidth = await thumbnailImg.evaluate((img: HTMLImageElement) => img.naturalWidth)
    expect(imgNaturalWidth).toBeGreaterThan(0)
    
    // 2. レイヤー情報取得機能の確認
    const layersList = page.locator('#layersList')
    await expect(layersList).toBeVisible()
    
    // レイヤーアイテムが存在することを確認
    const layerItems = page.locator('.layer-item')
    const layerCount = await layerItems.count()
    expect(layerCount).toBeGreaterThan(0)
    
    // 各レイヤーの情報が正しく表示されることを確認
    for (let i = 0; i < Math.min(layerCount, 3); i++) {
      const layerItem = layerItems.nth(i)
      
      // レイヤー名が表示されている
      await expect(layerItem.locator('.layer-name')).toBeVisible()
      const layerName = await layerItem.locator('.layer-name').textContent()
      expect(layerName).toBeTruthy()
      
      // レイヤー情報タグが表示されている
      const infoTags = layerItem.locator('.info-tag')
      await expect(infoTags.first()).toBeVisible()
      
      // ID、Index、不透明度、表示状態、タイプの情報が含まれている
      const allTagsText = await infoTags.allTextContents()
      const combinedText = allTagsText.join(' ')
      expect(combinedText).toMatch(/ID:|Index:|不透明度:|表示|非表示|レイヤー|フォルダ/)
    }
    
    // コンソールログでパッケージの動作を確認
    const packageLogs = consoleMessages.filter(msg => 
      msg.includes('📁 ファイル処理開始') ||
      msg.includes('✅ ClipStudioインスタンス作成完了') ||
      msg.includes('🖼️ サムネイル表示完了') ||
      msg.includes('📑 レイヤー情報表示完了') ||
      msg.includes('🎉 ファイル処理完了')
    )
    expect(packageLogs.length).toBeGreaterThan(0)
    
    // エラーが発生していないことを最終確認
    expect(errors).toHaveLength(0)
  })

  test('should handle invalid CLIP file gracefully', async ({ page }) => {
    await page.goto('/examples/sample-browser.html')
    
    // 無効なファイルを作成（軽量化）
    const invalidFilePath = process.cwd() + '/test-invalid-clip.clip'
    await fs.writeFile(invalidFilePath, 'invalid')
    
    try {
      // 無効なファイルをアップロード
      await page.locator('#fileInput').setInputFiles(invalidFilePath)
      
      // 5秒待機後に結果エリアが表示されていないことを確認（エラーハンドリング）
      await page.waitForTimeout(5000)
      await expect(page.locator('#result')).toBeHidden()
      
    } finally {
      // テストファイルを削除
      await fs.unlink(invalidFilePath).catch(() => {})
    }
  })


  test('should verify browser compatibility', async ({ page }) => {
    await page.goto('/examples/sample-browser.html')
    
    // WebAssembly対応の確認
    const wasmSupport = await page.evaluate(() => {
      return typeof WebAssembly !== 'undefined'
    })
    expect(wasmSupport).toBe(true)
    
    // Blob API対応の確認  
    const blobSupport = await page.evaluate(() => {
      return typeof Blob !== 'undefined'
    })
    expect(blobSupport).toBe(true)
    
    // sql.jsが読み込まれていることを確認
    const sqlJsLoaded = await page.evaluate(() => {
      return typeof window.initSqlJs !== 'undefined'
    })
    expect(sqlJsLoaded).toBe(true)
  })

})