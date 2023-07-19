import * as Superstruct from 'superstruct'
import * as Fs from 'fs'
import * as FsExtra from 'fs-extra'
import * as Errors from './errors.js'
import Got from 'got'
import * as JSONInterface from './JSONInterface.js'

async function RequestFiltersList (URL:string) {
  return (await Got(URL, { https: { minVersion: 'TLSv1.3' }, http2: true })).body
}

export function Init() {
  // Config.json
  // Load JSON file.
  if (!Fs.existsSync('../config.json')) throw new Errors.FileNotFound('The config.json is not found.')
  try { JSON.parse(Fs.readFileSync('../config.json', 'utf8')) } catch { throw new Errors.JSONInvaildError('The config.json is not a JSON format.') }
  let ConfigJSON = JSON.parse(Fs.readFileSync('../config.json', 'utf8'))
  // Check if JSON is valid.
  if (!(Superstruct.is(ConfigJSON, JSONInterface.SuperstructConfigJSONFormat) || Superstruct.is(ConfigJSON, Superstruct.array(JSONInterface.SuperstructConfigJSONFormat)))) {
    throw new Errors.JSONFormatError('The config.json does not fit a format used in filter-customizer.')
  }

  // predefined-filterslists.json
  // Load JSON file.
  if (!Fs.existsSync('predefined-filterslists.json')) throw new Errors.FileNotFound('The predefined-filterslists.json is not found.')
  try { JSON.parse(Fs.readFileSync('predefined-filterslists.json', 'utf8')) } catch { throw new Errors.JSONInvaildError('The predefined-filterslists.json is not a JSON format.') }
  let PredefinedFiltersListsJSON = JSON.parse(Fs.readFileSync('predefined-filterslists.json', 'utf8'))
  // Check if JSON is valid.
  if (!(Superstruct.is(PredefinedFiltersListsJSON, JSONInterface.SuperstructPredefinedFiltersListsJSON))) {
    throw new Errors.JSONFormatError('The predefined-filterslists.json does not fit a format used in filter-customizer.')
  }
}