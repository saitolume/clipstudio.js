import { resolve } from 'node:path'
import initSqlJs from 'sql.js'
import { blobToUint8Array, isBrowser } from './utils.js'

/** CDN base URL for sql.js WebAssembly files */
const SQL_JS_CDN_BASE = 'https://cdn.jsdelivr.net/npm/sql.js@1.13.0/dist'

/**
 * Locates sql.js WebAssembly files for browser or Node.js environments
 * @param filename - WebAssembly filename to locate
 * @returns Full path to the WebAssembly file
 */
export const locateFile = (filename: string): string => {
  if (isBrowser) return `${SQL_JS_CDN_BASE}/${filename}`
  return resolve(`node_modules/sql.js/dist/${filename}`)
}

/**
 * Wrapper class for sql.js Database with convenient loading methods
 */
export class Sqlite {
  readonly db: initSqlJs.Database

  constructor(db: initSqlJs.Database) {
    this.db = db
  }

  /**
   * Loads SQLite database from file data
   * @param file - SQLite data as Blob or Buffer
   * @returns Promise resolving to Sqlite instance
   */
  static load = async (file: Blob | Buffer): Promise<Sqlite> => {
    const SQL = await initSqlJs({ locateFile })
    const data = isBrowser ? await blobToUint8Array(file as Blob) : (file as Buffer)
    const db = new SQL.Database(data)
    return new Sqlite(db)
  }

  /**
   * Executes SQL query on the database
   * @param sql - SQL query string
   * @returns Query execution results
   */
  exec(sql: string): initSqlJs.QueryExecResult[] {
    return this.db.exec(sql)
  }
}
