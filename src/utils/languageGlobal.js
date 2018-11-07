const uuidv4 = require('uuid/v4')

let lang = 'en'

let source = (lang, key) => {
  return 'Unknown'
}

let langListeners = {}

let sourceListeners = {}

export function setLang(newLang) {
  lang = newLang
  for (var listener in langListeners) {
    langListeners[listener](newLang)
  }
}

export function getLang() {
  return lang
}

export function setSource(newSource) {
  source = newSource
  for (var listener in sourceListeners) {
    sourceListeners[listener](newSource)
  }
}

export function getSource() {
  return source
}

export function listenOnLangChange(callback) {
  let id = uuidv4()
  langListeners[id] = callback
  return () => {
    delete langListeners[id]
  }
}

export function listenOnSourceChange(callback) {
  let id = uuidv4()
  sourceListeners[id] = callback
  return () => {
    delete sourceListeners[id]
  }
}
