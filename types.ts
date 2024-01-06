export interface DataRoot {
  languageFamilies: string[]
  languages: Language[]
  countries: Country[]
  locales: string[][]
}

export interface Language {
  iso639_1: string
  iso639_2: string
  iso639_2en: string
  iso639_3: string
  name: string[]
  nativeName: string[]
  direction: string
  family: string
  countries: string[]
  langCultureMs: LangCultureM[]
}

export interface LangCultureM {
  langCultureName: string
  displayName: string
  cultureCode: string
}

export interface Country {
  code_2: string
  code_3: string
  numCode: string
  name: string
  languages?: string[]
  langCultureMs?: LangCultureM2[]
}

export interface LangCultureM2 {
  langCultureName: string
  displayName: string
  cultureCode: string
}
