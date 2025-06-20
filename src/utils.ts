/** Detects if code is running in a browser environment */
export const isBrowser = typeof window !== 'undefined'

/** SQLite format header for identifying SQLite data in CLIP files */
const SQLITE_HEADER = 'SQLite format 3'

/**
 * Extracts SQLite database from a CLIP STUDIO file
 * @param file - CLIP file as File or Buffer
 * @returns Promise resolving to SQLite data as Blob or Buffer
 */
export const parseClipToSqlite = async (file: File | Buffer): Promise<Blob | Buffer> => {
  const sqliteHeaderBuffer = Buffer.from(new TextEncoder().encode(SQLITE_HEADER))
  
  if (file instanceof Buffer) {
    const index = file.indexOf(sqliteHeaderBuffer)
    if (index === -1) {
      throw new Error('SQLite data not found in CLIP file')
    }
    return file.slice(index)
  }

  return new Promise<Blob>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const fileBuf = Buffer.from(reader.result as ArrayBuffer)
        const index = fileBuf.indexOf(sqliteHeaderBuffer)
        if (index === -1) {
          throw new Error('SQLite data not found in CLIP file')
        }
        const data = fileBuf.slice(index)
        resolve(new Blob([data]))
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsArrayBuffer(file as File)
  })
}

/**
 * Converts a Blob to Uint8Array in browser environments
 * @param blob - Blob to convert
 * @returns Promise resolving to Uint8Array
 */
export const blobToUint8Array = async (blob: Blob): Promise<Uint8Array> => {
  if (!isBrowser) {
    throw new Error('blobToUint8Array can only be used in browser environments')
  }
  
  return new Promise<Uint8Array>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer))
    reader.onerror = () => reject(new Error('Failed to convert blob to Uint8Array'))
    reader.readAsArrayBuffer(blob)
  })
}
