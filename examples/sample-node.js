#!/usr/bin/env node

/**
 * Node.js用のサンプルアプリケーション
 * CLIP STUDIOファイルを読み込んで情報を表示します
 */

import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'
import { ClipStudio } from '../dist/index.js'

async function main() {
  try {
    console.log('🎨 CLIP STUDIO.js Node.js サンプルアプリ')
    console.log('=====================================')
    
    // サンプルファイルの読み込み
    const clipFilePath = resolve(process.cwd(), 'test', 'sample.clip')
    console.log(`📁 CLIPファイルを読み込み中: ${clipFilePath}`)
    
    const clipFile = await fs.readFile(clipFilePath)
    console.log(`✅ ファイルサイズ: ${clipFile.length} bytes`)
    
    // ClipStudioインスタンス作成
    console.log('🔧 ClipStudioインスタンスを作成中...')
    const clipStudio = await ClipStudio.load(clipFile)
    console.log('✅ インスタンス作成完了')
    
    // サムネイル取得
    console.log('🖼️  サムネイル取得中...')
    const thumbnail = clipStudio.getThumbnail()
    console.log(`✅ サムネイル取得完了: ${thumbnail.length} bytes`)
    
    // サムネイルをファイルに保存
    const thumbnailPath = 'sample-thumbnail.jpg'
    await fs.writeFile(thumbnailPath, thumbnail)
    console.log(`💾 サムネイルを保存: ${thumbnailPath}`)
    
    // レイヤー情報取得
    console.log('📑 レイヤー情報取得中...')
    const layers = clipStudio.getLayers()
    console.log(`✅ レイヤー数: ${layers.length}`)
    
    // レイヤー情報表示
    console.log('\n🎯 レイヤー詳細:')
    console.log('================')
    layers.forEach((layer, index) => {
      console.log(`${index + 1}. ${layer.name}`)
      console.log(`   ID: ${layer.id}`)
      console.log(`   Index: ${layer.index}`)
      console.log(`   不透明度: ${Math.round(layer.opacity * 100)}%`)
      console.log(`   表示: ${layer.isVisible ? '👁️  ON' : '🚫 OFF'}`)
      console.log(`   種類: ${layer.isFolder ? '📁 フォルダ' : '🖼️  レイヤー'}`)
      console.log('')
    })
    
    console.log('🎉 サンプルアプリ実行完了！')
    
  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message)
    process.exit(1)
  }
}

main()