# react-internationalize

> Internationalization for react

[![NPM](https://img.shields.io/npm/v/react-internationalize.svg)](https://www.npmjs.com/package/react-internationalize) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-internationalize
```

## Usage

```jsx
import React, { Component } from 'react'

import {LanguageSelector, setLang, setSource, getSource, WithGetText, withI18n} from 'react-internationalize'

/**
 * First we define a source, it is a function which given the language code
 * and the string's key, returns the appropriate translated string
 *
 * this is an example implementation and you can do whatever you want
 *
 * sending a default value could be a great idea
 *
 * @param {code} lang The actual language code
 * @param {String} key The key of the string
 */
const simpleSource = (lang, key) => {
  return {
    hello: {
      'fr': 'Bonjour',
      'es': 'Hola',
      'en': 'Hello'
    },
    more: {
      'fr': 'Plus',
      'en': 'More',
      'es': 'Más'
    }
  }[key][lang]
}

/**
 * Another source for demonstrating source change
 */
const moreSource = (lang, key) => {
  return {
    hello: {
      'fr': 'Bonjour monsieur/madame',
      'es': 'Hola señor/señora',
      'en': 'Hello sir/madam'
    },
    more: {
      'fr': 'Moins',
      'en': 'Less',
      'es': 'Menos'
    }
  }[key][lang]
}

/**
 * Rendering this component nested in a WithGetText element, will provide
 * getText as a props
 */
class TextWithGetText extends Component {
  render () {
    return <b><p>{ this.props.getText('hello') }</p></b>
  }
}

/**
 * This Component will go through an HOC so that text is a translated prop
 */
class TextWithHOC extends Component {
  render () {
    return <b><p>{this.props.text}</p></b>
  }
}

/**
 * The wrapped component will have it's prop text being translated to the selected language
 */
const WithHoc = withI18n(TextWithHOC, {text: 'hello'})

class ChangeSourceBase extends Component {
  render() {
    return <b><p>{this.props.text}</p></b>
  }
}

const ChangeSource = withI18n(ChangeSourceBase, {text: 'more'})

/** Set the actual language to french (default is english) */
setLang('fr')
/** Set the source to our previously defined source function */
setSource(simpleSource)

export default class App extends Component {
  render () {
    return (
      <div>
          <div>
            {/**
                 * LanguageSelector handles everything on it's own, or can be controlled, or you can roll your own
                 * You could also detect user's preference in the browser or from a persisted source, etc...
                 */}
            <h2>Language selection widget (not mandatory)</h2>
            <LanguageSelector codes={['en', 'fr', 'es']} />

            {/**
                 * WithGetText inject a getText props which allow the component to retrieve the translated string
                 * This will also make the component re-render when language or source changes.
                 * It is the responsibility of the component to call getText
                 */}
            <h2>Using WithGetText</h2>
            <WithGetText>
              <TextWithGetText />
            </WithGetText>

            {/**
                 * When a component goes through the withI18n HOC, it get's injected with translated props
                 * This will also make the component re-render when language or source changes.
                 * he component can use it's props as if they were translated or not
                 */}
            <h2>Using withI18n hoc</h2>
            <WithHoc />

            {/**
                 * An example of how to change the language
                 */}
            <h2>Custom Language change</h2>
            <button onClick={(event) => {
              event.preventDefault()
              setLang('es')
            }}><p>We no speak americano</p></button>

            {/**
                 * An example of how to change the source
                 */}
            <h2>Changing Language string's source</h2>
            <button onClick={(event) => {
              event.preventDefault()
              if(getSource() === simpleSource){
                setSource(moreSource)
              } else {
                setSource(simpleSource)
              }
            }}> <ChangeSource /> </button>
          </div>

      </div>
    )
  }
}
```

## License

MIT © [MaxLarue](https://github.com/MaxLarue)
