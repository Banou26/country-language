import type { DataRoot } from './types'

import { readFile, writeFile } from 'fs/promises'

import * as lib from './index'

const content: DataRoot = (await readFile('./data.json', 'utf-8').then(JSON.parse))

const langString =
  '[ENG][POR-BR][SPA-LA][SPA][ARA][FRE][GER][ITA][JPN][POR][POL][DUT][NOB][FIN][TUR][SWE][GRE][HEB][RUM][IND][THA][KOR][DAN][CHI][VIE][UKR][HUN][CES][HRV][MAY][FIL][HIN]'
    .split('][')
    .map(lang => lang.replace('[', '')
    .replace(']', ''))

const languageCountryPairs = [
  {"iso639_2": "ara", "country_code": "SA"},
  {"iso639_2": "ben", "country_code": "BD"},
  {"iso639_2": "zho", "country_code": "CN"},
  {"iso639_2": "nld", "country_code": "NL"},
  {"iso639_2": "eng", "country_code": "GB"},
  {"iso639_2": "fra", "country_code": "FR"},
  {"iso639_2": "deu", "country_code": "DE"},
  {"iso639_2": "ell", "country_code": "GR"},
  {"iso639_2": "hin", "country_code": "IN"},
  {"iso639_2": "ita", "country_code": "IT"},
  {"iso639_2": "jpn", "country_code": "JP"},
  {"iso639_2": "kor", "country_code": "KR"},
  {"iso639_2": "fas", "country_code": "IR"},
  {"iso639_2": "por", "country_code": "PT"},
  {"iso639_2": "rus", "country_code": "RU"},
  {"iso639_2": "spa", "country_code": "ES"},
  {"iso639_2": "swa", "country_code": "KE"},
  {"iso639_2": "swe", "country_code": "SE"},
  {"iso639_2": "tha", "country_code": "TH"},
  {"iso639_2": "tur", "country_code": "TR"},
  {"iso639_2": "urd", "country_code": "PK"},
  {"iso639_2": "vie", "country_code": "VN"},
  {"iso639_2": "amh", "country_code": "ET"},
  {"iso639_2": "ces", "country_code": "CZ"},
  {"iso639_2": "dan", "country_code": "DK"},
  {"iso639_2": "fin", "country_code": "FI"},
  {"iso639_2": "heb", "country_code": "IL"},
  {"iso639_2": "hun", "country_code": "HU"},
  {"iso639_2": "ind", "country_code": "ID"},
  {"iso639_2": "msa", "country_code": "MY"},
  {"iso639_2": "nor", "country_code": "NO"},
  {"iso639_2": "pol", "country_code": "PL"},
  {"iso639_2": "ron", "country_code": "RO"},
  {"iso639_2": "srp", "country_code": "RS"},
  {"iso639_2": "slk", "country_code": "SK"},
  {"iso639_2": "ukr", "country_code": "UA"}
]


const neededLanguages = langString.map(lang => lang.split('-').at(0)?.toLowerCase()) // ['eng', 'por', 'spa', 'fre', 'ger', 'ita', 'rus']
// const neededCountries = ['USA', 'BRA', 'MEX', 'FRA', 'GER', 'ITA', 'RUS']

const filteredLanguages = content.languages.filter(lang => neededLanguages.some(code => code === lang.iso639_2en))
const countryCodes = filteredLanguages.map(lang => lang.countries).flat().map(countryCode => countryCode.toLowerCase())

const trimmedContent = {
  ...content,
  languages: filteredLanguages,
  countries:
    content
      .countries
      // .filter(country => country.languages?.some(lang => countryCodes.some(code => code === lang)))
      .filter(country => languageCountryPairs.some(pair => pair.country_code === country.code_2)),
      // .filter(country => neededCountries.some(code => code === country.iso3166_3.toLowerCase()))
  locales: content.locales.filter(([locale, countryLocale]) => languageCountryPairs.some((pair) => pair.country_code === countryLocale)),
}

await writeFile('./trimmed-data.json', JSON.stringify(trimmedContent, null, 2))
