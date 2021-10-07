import React, { Component } from 'react'
import { object, any } from 'prop-types'

import { View } from 'react-native'

import styles from './styles'

class Row extends Component {
  render () {
    const { style, children } = this.props

    return <View style={[styles.root, style]}>{children}</View>
  }
}

Row.propTypes = {
  style: object,
  children: any
}

Row.defaultProps = {
  style: {},
  children: null
}

export default Row
