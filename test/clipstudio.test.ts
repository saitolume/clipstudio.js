import { strict as assert } from 'node:assert'
import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'
import { test } from 'node:test'
import { ClipStudio } from '../src/clipstudio.js'

test('ClipStudio.load should create instance from CLIP file', async () => {
  const clipFile = await fs.readFile(resolve('test', 'sample.clip'))
  const clipStudio = await ClipStudio.load(clipFile)
  assert(clipStudio instanceof ClipStudio)
})

test('ClipStudio.getThumbnail should return Buffer in Node.js', async () => {
  const clipFile = await fs.readFile(resolve('test', 'sample.clip'))
  const clipStudio = await ClipStudio.load(clipFile)
  const thumbnail = clipStudio.getThumbnail()
  assert(Buffer.isBuffer(thumbnail))
  assert(thumbnail.length > 0)
})

test('ClipStudio.getLayers should return array', async () => {
  const clipFile = await fs.readFile(resolve('test', 'sample.clip'))
  const clipStudio = await ClipStudio.load(clipFile)
  const layers = clipStudio.getLayers()
  assert(Array.isArray(layers))
})