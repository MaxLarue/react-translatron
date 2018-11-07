import { getLang, getSource } from './languageGlobal'

export default function getText(key, lang = null, source = null) {
  if (!lang) {
    lang = getLang()
  }
  if (!source) {
    source = getSource()
  }
  return source(lang, key)
}
