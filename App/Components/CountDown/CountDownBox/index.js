import React, { Component } from 'react'
import { object, string, number } from 'prop-types'

import { View, Text } from 'react-native'

import styles from './styles'

class CountDownBox extends Component {
  render () {
    const { style, title, time } = this.props

    return (
      <View style={[styles.root, style]}>
        <View style={styles.container}>
          <Text style={styles.title}>{time}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    )
  }
}

CountDownBox.propTypes = {
  style: object,
  title: string,
  time: number
}

CountDownBox.defaultProps = {
  style: {},
  title: '',
  time: 0
}

export default CountDownBox
