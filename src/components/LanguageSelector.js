/* eslint-disable react/prop-types */
import React, { Component } from 'react'

import languageCodes, { toFullLanguageName } from '../utils/languageCodes'
import { setLang, getLang, listenOnLangChange } from '../utils/languageGlobal'

export default class LanguageSelector extends Component {
  componentDidMount() {
    this.listener = listenOnLangChange(() => { this.forceUpdate() })
  }

  componentWillUnmount() {
    this.listener()
  }

  handleSelectionChanged(event) {
    /* default behaviour is to change global language setting. Unless this.props.onChange is defined */
    if (!this.props.onChange) {
      setLang(event.target.value)
    } else {
      this.props.onChange(event.target.value)
    }
  }

  getCodes() {
    if (this.props.codes) {
      return this.props.codes
    }// else
    return languageCodes.filter((item) => {
      return !this.props.excludeCodes.includes(item)
    })
  }

  render() {
    /* default behaviour is to use global language settings if this.props.value is not defined */
    let value
    if (!this.props.value) {
      value = getLang()
    } else {
      value = this.props.value
    }
    return (
      <div style={styles.container}>
        <select name='language' onChange={(event) => { this.handleSelectionChanged(event) }}>
          {
            this.getCodes().map((item, index) => {
              return <option value={item} key={item} selected={value === item} >{toFullLanguageName(item)}</option>
            })
          }
        </select>
      </div>
    )
  }
}

LanguageSelector.defaultProps = {
  excludeCodes: []
}

const styles = {
  container: {
  }
}
