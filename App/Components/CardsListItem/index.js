import React, { Component } from 'react'
import { object } from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'

import { View, Text, Image, Platform } from 'react-native'

import { Colors } from '../../Theme'

import I18n from '../../I18n/I18n'

import styles from './styles'

class CardsListItem extends Component {
  render () {
    const { style } = this.props
    const {
      title,
      created_at: createdAt,
      user: { avatar, fullName },
      favorites_count: favoritesCount,
      replies_count: repliesCount
    } = this.props.data

    const IS_IOS = Platform.OS === 'ios'
    let iconType = IS_IOS ? 'ios' : 'md'

    return (
      <View style={[styles.root, style]}>
        <View style={styles.imgcontaineravator}>

        <Image style={styles.image} source={{ uri: avatar }} />
        </View>

        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.subTitle}>
            {`${I18n.t('postedBy')} ${fullName}`}
          </Text>
          <Text style={styles.date}>
            {moment(createdAt, 'YYYYMMDD hhmm').fromNow()}
          </Text>
        </View>

        <View style={styles.iconsContainer}>
          <View style={styles.iconContainer}>
            <Icon
              name={`${iconType}-chatbubbles`}
              size={18}
              color={Colors.brownGrey}
            />
            <Text style={styles.counter}>{repliesCount}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon name={`${iconType}-heart`} size={18} color={Colors.heart} />
            <Text style={styles.counter}>{favoritesCount}</Text>
          </View>

        </View>
      </View>
    )
  }
}

CardsListItem.propTypes = {
  style: object
}

CardsListItem.defaultProps = {
  style: {}
}

export default CardsListItem
