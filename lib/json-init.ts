import * as Superstruct from 'superstruct'
import * as Fs from 'fs'
import * as FsExtra from 'fs-extra'
import * as Errors from './errors.js'
import * as Validator from 'validator'
import * as Got from 'got'

let SuperstructDomain = Superstruct.define('Domain', (value:string) => Validator.default.isFQDN(value))
let SuperstructURL = Superstruct.define('URL', (value:string) => Validator.default.isURL(value))

export const ConfigJSONFormat = Superstruct.object({
  FiltersLists: Superstruct.array(SuperstructURL),
  CheckLicenses: Superstruct.boolean() || undefined,
  Localization: Superstruct.object({
    LocaleFiltersLists: Superstruct.array(Superstruct.string()) || undefined,
    Domains: Superstruct.object({
      Include: Superstruct.array(SuperstructDomain) || undefined,
      Exclude: Superstruct.array(SuperstructDomain) || undefined
    }) || undefined
  }) || undefined,
  Compiler: Superstruct.object({
    DestinationLocation: Superstruct.string() || undefined,
    MemoryDirectoryLocation: Superstruct.string() || undefined,
    Header: Superstruct.string() || undefined,
    Git: Superstruct.object({
      SearchHistory: Superstruct.object({
        IgnoreCommitMessage: Superstruct.boolean() || undefined
      }) || undefined
    }) || undefined
  }) || undefined,
  Deactivation: Superstruct.object({
    AdGuardJSAPI: Superstruct.boolean() || undefined,
    JSFilters: Superstruct.boolean() || undefined
  }) || undefined
})

export function Init() {
  // Load JSON file.
  try { JSON.parse(Fs.readFileSync('../config.json', 'utf8')) } catch { throw new Errors.JSONInvaildError('The config.json is not a JSON format.') }
  let ConfigJSON = JSON.parse(Fs.readFileSync('../config.json', 'utf8'))
  
  // Check if JSON is valid.
  if (!(Superstruct.is(ConfigJSON, ConfigJSONFormat) || Superstruct.is(ConfigJSON, Superstruct.array(ConfigJSONFormat)))) {
    throw new Errors.JSONFormatError('The config.json does not fit a format used in filter-customizer.')
  }
}