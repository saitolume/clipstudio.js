import Blob from 'cross-blob'
import { resolve } from 'path'
import initSqlJs from 'sql.js'
import { SqlJs } from 'sql.js/module'
import { blobToUint8Array, isBrowser } from './utils'

// import { promises as fs } from 'fs'
// import { resolve } from 'path'

export const locateFile = (filename: string) => {
  if (isBrowser) return `https://cdn.jsdelivr.net/npm/sql.js@1.1.0/dist/${filename}`
  return resolve(`node_modules/sql.js/dist/${filename}`)
}

export class Sqlite {
  db: SqlJs.Database

  constructor(db: SqlJs.Database) {
    this.db = db
  }

  static load = async (file: Blob | Buffer) => {
    const SQL = await initSqlJs({ locateFile })
    const data = file instanceof Blob ? await blobToUint8Array(file) : file
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
