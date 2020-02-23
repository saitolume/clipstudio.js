import { promises as fs } from 'fs'
import { resolve } from 'path'
import { Sqlite } from '../src/sqlite'

describe('Sqlite', () => {
  it.skip('should success to be initialized', async () => {
    const data = await fs.readFile(resolve('test', 'sample.sqlite'))
    const sqlite = await Sqlite.load(data)
    expect(sqlite).toBeInstanceOf(Sqlite)
  })
})
