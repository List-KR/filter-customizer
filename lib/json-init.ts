import * as Superstruct from 'superstruct'
import * as Fs from 'fs'
import * as FsExtra from 'fs-extra'
import * as Errors from './errors.js'
import * as Got from 'got'
import * as JSONInterface from './JSONInterface.js'


export function Init() {
  // Load JSON file.
  try { JSON.parse(Fs.readFileSync('../config.json', 'utf8')) } catch { throw new Errors.JSONInvaildError('The config.json is not a JSON format.') }
  let ConfigJSON = JSON.parse(Fs.readFileSync('../config.json', 'utf8'))
  
  // Check if JSON is valid.
  if (!(Superstruct.is(ConfigJSON, ConfigJSONFormat) || Superstruct.is(ConfigJSON, Superstruct.array(ConfigJSONFormat)))) {
    throw new Errors.JSONFormatError('The config.json does not fit a format used in filter-customizer.')
  }
}