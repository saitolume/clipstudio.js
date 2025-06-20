# clipstudio.js

[![npm version](https://badge.fury.io/js/clipstudio.svg)](https://www.npmjs.com/package/clipstudio)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A JavaScript library for reading CLIP STUDIO PAINT `.clip` files in both browsers and Node.js environments.

## Features

- ✅ **Cross-platform**: Works in both browsers and Node.js
- ✅ **TypeScript**: Full TypeScript support with type definitions
- ✅ **ESM**: Modern ES Module format
- ✅ **Extract thumbnails**: Get preview images from CLIP files
- ✅ **Read layer information**: Access layer metadata (name, opacity, visibility, etc.)

## Installation

```bash
npm install clipstudio
# or
pnpm add clipstudio
# or
yarn add clipstudio
```

## Quick Start

### Browser Usage

```typescript
import { ClipStudio } from 'clipstudio'

// Handle file input
const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (file) {
    const clipStudio = await ClipStudio.load(file)

    // Get thumbnail as Blob
    const thumbnail = clipStudio.getThumbnail() // Blob
    const imageUrl = URL.createObjectURL(thumbnail)

    // Get layer information
    const layers = clipStudio.getLayers()
    console.log(`Found ${layers.length} layers`)
  }
}
```

### Node.js Usage

```typescript
import { ClipStudio } from 'clipstudio'
import { promises as fs } from 'node:fs'

async function processClipFile() {
  // Read CLIP file
  const fileBuffer = await fs.readFile('./artwork.clip')
  const clipStudio = await ClipStudio.load(fileBuffer)

  // Get thumbnail as Buffer
  const thumbnail = clipStudio.getThumbnail() // Buffer
  await fs.writeFile('./thumbnail.png', thumbnail)

  // Analyze layers
  const layers = clipStudio.getLayers()
  layers.forEach((layer, index) => {
    console.log(`Layer ${index + 1}: ${layer.name}`)
    console.log(`  Opacity: ${Math.round(layer.opacity * 100)}%`)
    console.log(`  Visible: ${layer.isVisible}`)
    console.log(`  Folder: ${layer.isFolder}`)
  })
}

processClipFile()
```

## API Reference

### ClipStudio

#### `ClipStudio.load(file: File | Buffer): Promise<ClipStudio>`

Loads a CLIP STUDIO file and returns a ClipStudio instance.

**Parameters:**
- `file` - CLIP file as `File` object (browser) or `Buffer` (Node.js)

**Returns:** Promise that resolves to a `ClipStudio` instance

**Example:**
```typescript
const clipStudio = await ClipStudio.load(file)
```

#### `getThumbnail(): Blob | Buffer`

Extracts the thumbnail image from the CLIP file.

**Returns:**
- `Blob` in browser environments
- `Buffer` in Node.js environments

**Throws:** Error if no thumbnail is found

**Example:**
```typescript
const thumbnail = clipStudio.getThumbnail()

// Browser: Use as image source
const imageUrl = URL.createObjectURL(thumbnail)

// Node.js: Save to file
await fs.writeFile('thumbnail.png', thumbnail)
```

#### `getLayers(): Layer[]`

Retrieves all layer information from the CLIP file.

**Returns:** Array of `Layer` objects

**Example:**
```typescript
const layers = clipStudio.getLayers()
console.log(`Total layers: ${layers.length}`)
```

### Layer

Layer information extracted from CLIP files.

```typescript
interface Layer {
  /** Unique layer identifier */
  id: string
  /** Layer index in the hierarchy */
  index: number
  /** Layer display name */
  name: string
  /** Layer opacity (0.0 to 1.0) */
  opacity: number
  /** Whether the layer is visible */
  isVisible: boolean
  /** Whether this is a folder layer */
  isFolder: boolean
}
```

**Example layer data:**
```typescript
{
  id: "5f8f2d2381-7a44-f2a9-dfa6-51417dd5ad",
  index: 1,
  name: "Background",
  opacity: 0.8,
  isVisible: true,
  isFolder: false
}
```

## Error Handling

The library throws descriptive errors for common issues:

```typescript
try {
  const clipStudio = await ClipStudio.load(file)
  const thumbnail = clipStudio.getThumbnail()
} catch (error) {
  if (error.message.includes('SQLite data not found')) {
    console.error('Invalid CLIP file format')
  } else if (error.message.includes('No thumbnail found')) {
    console.error('CLIP file has no thumbnail')
  } else {
    console.error('Failed to process CLIP file:', error.message)
  }
}
```

## Browser Compatibility

- Chrome 61+
- Firefox 60+
- Safari 12+
- Edge 79+

Note: Requires support for ES2020 features and WebAssembly.

## Node.js Compatibility

- Node.js 16.0.0+

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build library
pnpm build

# Lint code
pnpm lint

# Format code
pnpm format
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Acknowledgments

- Built with [sql.js](https://github.com/sql-js/sql.js) for SQLite parsing
- Inspired by the CLIP STUDIO PAINT file format
