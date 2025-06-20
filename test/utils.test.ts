import { strict as assert } from 'node:assert'
import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'
import { test } from 'node:test'
import { isBrowser, parseClipToSqlite } from '../src/utils.js'

test('isBrowser should return false in Node.js environment', () => {
  assert.strictEqual(isBrowser, false)
})

test('parseClipToSqlite should extract SQLite data from CLIP file', async () => {
  const clipFile = await fs.readFile(resolve('test', 'sample.clip'))
  const sqliteData = await parseClipToSqlite(clipFile)
  
  assert(Buffer.isBuffer(sqliteData))
  assert(sqliteData.length > 0)
  
  // Check that it starts with SQLite header
  const header = sqliteData.toString('utf8', 0, 15)
  assert.strictEqual(header, 'SQLite format 3')
})