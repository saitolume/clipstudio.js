# clipstudio.js

A JavaScript library for using CLIP STUDIO .clip file on browsers and Node.js

## Installation

```bash
$ yarn add clipstudio # or npm install clipstudio
```

## Usage

Browsers

```ts
const inputFile = event => {
  const [file] = event.target.files
  const clip = await ClipStudio.load(file)

  const thumbnail = clip.getThumbnail() // Blob
  const layers = clip.getLayers() // Layer[]
}
```

Node.js

```ts
import ClipStudio from 'clipstudio'
import { promises as fs } from 'fs'

const file = await fs.readFile('path/to/clip-file')
const clip = await ClipStudio.load(file)

const thumbnail = clip.getThumbnail() // Buffer
const layers = clip.getLayers() // Layer[]
/*
[
  {
    id: '5f8f2d2381-7a44-f2a9-dfa6-51417dd5ad',
    index: 1,
    name: '',
    opacity: 1,
    isVisible: true,
    isFolder: false
  },
  ...
]
*/
```

## API

### ClipStudio.load(file: File | Buffer): Promise\<ClipStudio>

Returns Promise of ClipStudio instance to use .clip file.

### ClipStudio.getThumbnail(): Blob | Buffer

Returns thumbnail image data of .clip file.

### ClipStudio.getLayers(): Layer[]

Returns layers array.

### Layer

```ts
{
    id: string // uuid
    index: number
    name: string
    opacity: number
    isVisible: boolean
    isFolder: boolean
  }
```

## License

MIT
