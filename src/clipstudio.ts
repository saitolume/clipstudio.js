import { Sqlite } from './sqlite.js'
import { Layer } from './types.js'
import { isBrowser, parseClipToSqlite } from './utils.js'

/** SQL queries for database operations */
const SQL_QUERIES = {
  THUMBNAIL: 'SELECT ImageData FROM CanvasPreview',
  LAYERS: 'SELECT LayerUuid, _PW_ID, LayerName, LayerOpacity, LayerVisibility, LayerFolder FROM Layer',
} as const

/**
 * Main class for working with CLIP STUDIO files
 */
export class ClipStudio {
  constructor(private readonly db: Sqlite) {}

  /**
   * Loads a CLIP STUDIO file and creates a ClipStudio instance
   * @param file - CLIP file as File or Buffer
   * @returns Promise resolving to ClipStudio instance
   */
  static load = async (file: File | Buffer): Promise<ClipStudio> => {
    const sqlite = await parseClipToSqlite(file)
    const db = await Sqlite.load(sqlite)
    return new ClipStudio(db)
  }

  /**
   * Extracts the thumbnail image from the CLIP file
   * @returns Thumbnail as Blob (browser) or Buffer (Node.js)
   */
  getThumbnail(): Blob | Buffer {
    const results = this.db.exec(SQL_QUERIES.THUMBNAIL)
    if (!results.length || !results[0].values.length) {
      throw new Error('No thumbnail found in CLIP file')
    }

    const [[thumbnail]] = results[0].values
    const imageData = thumbnail as Uint8Array

    return isBrowser ? new Blob([imageData]) : Buffer.from(imageData)
  }

  /**
   * Extracts all layers from the CLIP file
   * @returns Array of Layer objects with metadata
   */
  getLayers(): Layer[] {
    const results = this.db.exec(SQL_QUERIES.LAYERS)
    if (!results.length) {
      return []
    }

    const { values } = results[0]
    return values.map<Layer>(([id, index, name, opacity, visibility, folder]) => ({
      id: id as string,
      index: index as number,
      name: name as string,
      opacity: (opacity as number) / 256,
      isVisible: visibility === 1,
      isFolder: folder === 17,
    }))
  }
}
