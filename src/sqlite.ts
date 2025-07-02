import type { InitSqlJs, SqlJsDatabase, SqlJsQueryResult } from './types.js'
import { blobToUint8Array, isBrowser } from './utils.js'

/** CDN base URL for sql.js WebAssembly files */
const SQL_JS_CDN_BASE = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.13.0'

/**
 * Locates sql.js WebAssembly files for browser or Node.js environments
 * @param filename - WebAssembly filename to locate
 * @returns Full path to the WebAssembly file
 */
export const locateFile = (filename: string): string => {
  if (isBrowser) return `${SQL_JS_CDN_BASE}/${filename}`
  // Node.js環境では相対パスを使用
  return `node_modules/sql.js/dist/${filename}`
}

/**
 * Wrapper class for sql.js Database with convenient loading methods
 */
export class Sqlite {
  readonly db: SqlJsDatabase

  constructor(db: SqlJsDatabase) {
    this.db = db
  }

  /**
   * Loads SQLite database from file data
   * @param file - SQLite data as Blob or Buffer
   * @returns Promise resolving to Sqlite instance
   */
  static load = async (file: Blob | ArrayBuffer | Uint8Array): Promise<Sqlite> => {
    // 動的インポートでsql.jsを読み込む
    let initSqlJs: InitSqlJs
    if (isBrowser) {
      // ブラウザ環境では、グローバルに読み込まれたinitSqlJsを使用
      // @ts-ignore
      initSqlJs = window.initSqlJs
      if (!initSqlJs) {
        throw new Error('sql.js is not loaded. Please include sql-wasm.js in your HTML.')
      }
    } else {
      const module = await import('sql.js')
      initSqlJs = module.default
    }

    const SQL = await initSqlJs({ locateFile })
    const data = isBrowser ? await blobToUint8Array(file as Blob) : (file as Uint8Array)
    const db = new SQL.Database(data)
    return new Sqlite(db)
  }

  /**
   * Executes SQL query on the database
   * @param sql - SQL query string
   * @returns Query execution results
   */
  exec(sql: string): SqlJsQueryResult[] {
    return this.db.exec(sql)
  }
}
