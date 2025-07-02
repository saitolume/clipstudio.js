/**
 * Represents a layer in a CLIP STUDIO file
 */
export type Layer = {
  /** Layer unique identifier (LayerUuid) */
  id: string
  /** Layer index in the hierarchy (_PW_ID) */
  index: number
  /** Layer display name (LayerName) */
  name: string
  /** Layer opacity as a decimal from 0 to 1 (LayerOpacity normalized from 0-256) */
  opacity: number
  /** Whether the layer is visible (LayerVisibility: 0=false, 1=true) */
  isVisible: boolean
  /** Whether this is a folder layer (LayerFolder: 0=false, 17=true) */
  isFolder: boolean
}

/**
 * SQL.js database initialization function type
 */
export type InitSqlJs = (config?: {
  locateFile?: (filename: string) => string
}) => Promise<SqlJsStatic>

/**
 * SQL.js static interface
 */
export interface SqlJsStatic {
  Database: new (data?: Uint8Array) => SqlJsDatabase
}

/**
 * SQL.js database instance interface
 */
export interface SqlJsDatabase {
  exec(sql: string): SqlJsQueryResult[]
  close(): void
}

/**
 * SQL.js query result interface
 */
export interface SqlJsQueryResult {
  columns: string[]
  values: unknown[][]
}

/**
 * Global window interface for browser sql.js
 */
declare global {
  interface Window {
    initSqlJs?: InitSqlJs
  }
}
