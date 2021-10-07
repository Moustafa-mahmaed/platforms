import React, { Component } from 'react'
import { View } from 'react-native'

import { object, number } from 'prop-types'
import moment from 'moment'

import CountDownBox from './CountDownBox'

import I18n from '../../I18n/I18n'

import styles from './styles'

const interval = 1000
let currentTime = Date.now()

class CountDown extends Component {
  state = {
    duration: null,
    pastEvent: false
  }
  componentDidMount () {
    const { eventTime } = this.props
    const diffTime = eventTime - currentTime

    if (diffTime > 0) {
      this.setState(
        {
          duration: moment.duration(diffTime)
        },
        () => this.countDown(diffTime)
      )
    } else {
      this.setState({ pastEvent: true })
    }
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalId)
  }

  countDown = diffTime => {
    if (diffTime > 0) {
      let intervalId = setInterval(() => {
        this.setState({
          duration: moment.duration(
            this.state.duration - interval,
            'milliseconds'
          )
        })
      }, interval)

      this.setState({ intervalId })
    }
  }

  render () {
    const { style } = this.props
    const { duration, pastEvent } = this.state

    return (
      <View style={[styles.root, style]}>
        {duration && !pastEvent && (
          <View style={styles.boxes}>
            <CountDownBox title={I18n.t('time.days')} time={duration.days()} />
            <CountDownBox
              title={I18n.t('time.hours')}
              time={duration.hours()}
            />
            <CountDownBox
              title={I18n.t('time.minutes')}
              time={duration.minutes()}
            />
            <CountDownBox
              title={I18n.t('time.seconds')}
              time={duration.seconds()}
            />
          </View>
        )}
      </View>
    )
  }
}

CountDown.propTypes = {
  style: object,
  eventTime: number
}

CountDown.defaultProps = {
  style: {},
  eventTime: 0
}

export default CountDown
