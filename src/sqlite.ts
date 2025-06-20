import { resolve } from 'path'
import initSqlJs from 'sql.js'
import { blobToUint8Array, isBrowser } from './utils'

// import { promises as fs } from 'fs'

export const locateFile = (filename: string) => {
  if (isBrowser) return `https://cdn.jsdelivr.net/npm/sql.js@1.1.0/dist/${filename}`
  return resolve(`node_modules/sql.js/dist/${filename}`)
}

export class Sqlite {
  db: initSqlJs.Database

  constructor(db: initSqlJs.Database) {
    this.db = db
  }

  static load = async (file: Blob | Buffer) => {
    const SQL = await initSqlJs({ locateFile })
    const data = isBrowser ? await blobToUint8Array(file as Blob) : (file as Buffer)
    const db = new SQL.Database(data)
    return new Sqlite(db)
  }

  exec(sql: string) {
    return this.db.exec(sql)
  }
}

// fs.readFile(resolve('test/sample.sqlite')).then(async file => {
//   const sql = await Sqlite.load(file)
//   console.log(sql)
// })
