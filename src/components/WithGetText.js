/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import getText from '../utils/getText'
import { getLang, listenOnLangChange, listenOnSourceChange } from '../utils/languageGlobal'

export default class WithGetText extends Component {
  componentDidMount() {
    this.langListener = listenOnLangChange(() => { this.forceUpdate() })
    this.sourceListener = listenOnSourceChange(() => { this.forceUpdate() })
  }

  componentWillUnmount() {
    this.langListener()
    this.sourceListener()
  }

  render() {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {...child.props, getText: getText, lang: getLang()})
    })
  }
}
