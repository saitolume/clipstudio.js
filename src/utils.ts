export const isBrowser = !!globalThis.window

export const parseClipToSqlite = async (file: File | Buffer) => {
  if (file instanceof Buffer) {
    const index = file.indexOf(Buffer.from(new TextEncoder().encode('SQLite format 3')))
    const data = file.slice(index)
    return data
  }

  const reader = new FileReader()
  return new Promise<Blob | Buffer>(resolve => {
    reader.onload = () => {
      const fileBuf = Buffer.from(reader.result as ArrayBuffer)
      const index = fileBuf.indexOf(Buffer.from(new TextEncoder().encode('SQLite format 3')))
      const data = fileBuf.slice(index)
      resolve(new Blob([data]))
    }
    reader.readAsArrayBuffer(file)
  })
}

export const blobToUint8Array = async (blob: Blob) => {
  if (!isBrowser) return
  const reader = new FileReader()
  return new Promise<Uint8Array>(resolve => {
    reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer))
    reader.readAsArrayBuffer(blob)
  })
}
