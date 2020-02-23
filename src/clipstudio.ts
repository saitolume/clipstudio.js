import CrossBlob from 'cross-blob'
import { Sqlite } from './sqlite'
import { Layer } from './types'
import { parseClipToSqlite, isBrowser } from './utils'

// import { promises as fs } from 'fs'
// import { resolve } from 'path'

export class ClipStudio {
  constructor(private readonly db: Sqlite) {}

  static load = async (file: File | Buffer) => {
    const sqlite = await parseClipToSqlite(file)
    const db = await Sqlite.load(sqlite as CrossBlob)
    return new ClipStudio(db)
  }

  getThumbnail() {
    const [
      {
        values: [[thumbnail]]
      }
    ] = this.db.exec('SELECT ImageData FROM CanvasPreview')
    return isBrowser ? new Blob([thumbnail as Uint8Array]) : Buffer.from(thumbnail as Uint8Array)
  }

  getLayers() {
    const [{ values }] = this.db.exec(
      'SELECT LayerUuid, _PW_ID, LayerName, LayerOpacity, LayerVisibility, LayerFolder FROM Layer'
    )
    const layers = values.map<Layer>(
      ([id, index, name, opacity, visibility, folder]) =>
        ({
          id,
          index,
          name,
          opacity: (opacity as number) / 256,
          isVisible: visibility === 1,
          isFolder: folder === 17
        } as Layer)
    )
    return layers
  }
}

// fs.readFile(resolve('test', 'sample.clip')).then(async file => {
//   const clip = await ClipStudio.load(file)

//   const layers = clip.getLayers()
//   console.log(layers)

//   const thumbnail = clip.getThumbnail()
//   console.log(thumbnail)
// })
