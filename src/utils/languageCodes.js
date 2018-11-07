import _ from 'lodash'

import allCodes from '../codes/all'
import fullNameMaping from '../codes/mapping'

export function toFullLanguageName(key) {
  return _.get(fullNameMaping, key, 'Unknown')
}

export default allCodes
