import { strict as assert } from 'node:assert'
import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'
import { test } from 'node:test'
import { Sqlite } from '../src/sqlite.js'

test('Sqlite should success to be initialized', { skip: true }, async () => {
  const data = await fs.readFile(resolve('test', 'sample.sqlite'))
  const sqlite = await Sqlite.load(data)
  assert(sqlite instanceof Sqlite)
})
