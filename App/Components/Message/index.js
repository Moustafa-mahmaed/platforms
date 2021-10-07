import React, { Component } from 'react'
import { string } from 'prop-types'

import { Text } from 'react-native'

import { ErrorMessage } from 'formik'

import styles from './styles'

class Message extends Component {
  render () {
    const { name, message } = this.props

    return (
      <Text style={styles.message}>
        {message}
        <ErrorMessage name={name} />
      </Text>
    )
  }
}

Message.propTypes = {
  name: string,
  message: string
}

Message.defaultProps = {
  name: '',
  message: ''
}

export default Message
