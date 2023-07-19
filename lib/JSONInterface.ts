import * as Superstruct from 'superstruct'
import * as Validator from 'validator'

let SuperstructDomain = Superstruct.define('Domain', (value:string) => Validator.default.isFQDN(value))
let SuperstructURL = Superstruct.define('URL', (value:string) => Validator.default.isURL(value))

export const SuperstructConfigJSONFormat = Superstruct.object({
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

export interface InterfaceConfigJSONFormat {
  FiltersLists: string[],
  CheckLicenses?: boolean,
  Localization?: {
    LocaleFiltersLists?: string[],
    Domains?: {
      Include?: string[],
      Exclude?: string[]
    },
  },
  Compiler?: {
    DestinationLocation?: string,
    MemoryDirectoryLocation?: string,
    Header?: string,
    Git?: {
      SearchHistory?: {
        IgnoreCommitMessage?: boolean
      }
    }
  },
  Deactivation?: {
    AdGuardJSAPI?: boolean,
    JSFilters?: boolean
  }
}

export interface InterfacePredefinedFiltersListsJSONFormat {
  ID: string,
  Name: string,
  SubscriptionURL: {
    AdGuard: string | {
      Chromium: string,
      Firefox: string,
      Edge: string,
      Opera: string,
      Windows: string,
      Android: string,
      macOS: string,
      Safari: string,
      iOS: string,
      ContentBlocker: string
    },
    uBlockOrigin: string
  },
  SourceURL: string,
  HomepageURL?: string,
  License?: string,
  Constructor: {
    Include: string[],
    Exclude?: string[]
  },
  Library?: string[]
}

export const SuperstructPredefinedFiltersListsJSON = Superstruct.object({
  ID: Superstruct.string(),
  Name: Superstruct.string(),
  SubscriptionURL: Superstruct.object({
    AdGuard: Superstruct.string() || Superstruct.object({
      Chromium: Superstruct.string(),
      Firefox: Superstruct.string(),
      Edge: Superstruct.string(),
      Opera: Superstruct.string(),
      Windows: Superstruct.string(),
      Android: Superstruct.string(),
      macOS: Superstruct.string(),
      Safari: Superstruct.string(),
      iOS: Superstruct.string(),
      ContentBlocker: Superstruct.string()
    }),
    uBlockOrigin: Superstruct.string()
  }),
  SourceURL: Superstruct.string(),
  HomepageURL: Superstruct.string() || undefined,
  License: Superstruct.string() || undefined,
  Constructor: Superstruct.object({
    Include: Superstruct.array(Superstruct.string()),
    Exclude: Superstruct.array(Superstruct.string()) || undefined
  }),
  Library: Superstruct.array(Superstruct.string()) || undefined
})