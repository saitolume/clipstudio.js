# サンプルアプリケーション

CLIP STUDIO.jsライブラリの動作確認用サンプルアプリケーションです。

## 🚀 使用方法

### 1. ライブラリのビルド

```bash
# 依存関係をインストール
pnpm install

# ライブラリをビルド
pnpm run build
```

### 2. Node.jsサンプル

Node.js環境でCLIPファイルを処理するサンプルです。

```bash
# Node.jsサンプル実行
node examples/sample-node.js
```

**機能:**
- CLIPファイルの読み込み
- サムネイル抽出・保存
- レイヤー情報の表示

**実行結果:**
- サムネイル画像が `sample-thumbnail.jpg` として保存されます
- コンソールにレイヤー情報が表示されます

### 3. ブラウザサンプル

ブラウザ環境でCLIPファイルを処理するサンプルです。

```bash
# ローカルサーバー起動（自動ポート選択）
pnpm run serve

# サーバーが自動的に利用可能なポートを見つけて起動します
# 例: http://localhost:8080/examples/sample-browser.html
```

**機能:**
- ドラッグ&ドロップでCLIPファイルをアップロード
- クリックでファイル選択ダイアログ
- サムネイルのリアルタイム表示
- レイヤー情報の美しい表示
- エラーハンドリングとローディング表示

## 📁 ファイル構成

- `sample-node.js` - Node.js用サンプルアプリ
- `sample-browser.html` - ブラウザ用サンプルアプリ
- `test/sample.clip` - テスト用CLIPファイル

## 🎯 主要機能

### ClipStudio.load()
CLIPファイルからClipStudioインスタンスを作成します。

```javascript
const clipStudio = await ClipStudio.load(file)
```

### getThumbnail()
CLIPファイルのサムネイル画像を取得します。

```javascript
const thumbnail = clipStudio.getThumbnail()
// Node.js: Buffer, ブラウザ: Blob
```

### getLayers()
CLIPファイルのレイヤー情報を取得します。

```javascript
const layers = clipStudio.getLayers()
// Layer[]型の配列
```

## 🔧 開発サーバー

### 自動ポート選択

サーバーは以下の順序でポートを試行し、利用可能なポートを自動選択します：

1. 8080 (優先)
2. 3000
3. 5000
4. 9000
5. その他利用可能なポート

### サーバー機能

- ✅ **CORS対応**: クロスオリジンリクエスト完全サポート
- ✅ **自動ポート検出**: ポート競合を自動回避
- ✅ **静的ファイル配信**: 適切なMIMEタイプで配信
- ✅ **ディレクトリリスト**: ファイル一覧の表示

## 🔧 カスタマイズ

サンプルアプリをベースに、独自の機能を追加できます：

- レイヤー画像の抽出
- メタデータの詳細表示
- 複数ファイルの一括処理
- UI/UXの改善
- 異なるファイル形式への対応

## 📚 API仕様

詳細なAPI仕様については、TypeScript型定義を参照してください：

- `src/types.ts` - 型定義
- `src/clipstudio.ts` - メインAPI
- `test/` - テストコード例