/* eslint-disable semi */
import React, { Component } from 'react'

import _ from 'lodash'
import { getLang, getSource, listenOnLangChange, listenOnSourceChange } from '../utils/languageGlobal'

export default function withI18n(Wrapped, mapI18nToProps, opts = {}) {
  return class extends Component {
    componentDidMount() {
      this.langListener = listenOnLangChange(() => { this.forceUpdate() })
      this.sourceListener = listenOnSourceChange(() => { this.forceUpdate() })
    }

    componentWillUnmount() {
      this.langListener()
      this.sourceListener()
    }

    render() {
      let mapProps = {};
      let lang = _.get(opts, 'lang', getLang());
      let source = _.get(opts, 'source', getSource());
      if (_.isFunction(mapI18nToProps)) {
        mapProps = mapI18nToProps(lang, this.props, source)
      } else {
        mapProps = _.mapValues(mapI18nToProps, (value, index) => {
          return source(lang, value)
        })
      }
      return (
        <Wrapped {...this.props} {...mapProps} />
      )
    }
  }
}
