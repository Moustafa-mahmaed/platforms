import React, { Component } from 'react'
import { object } from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'

import { View, Text, Image, Platform } from 'react-native'

import { Colors } from '../../Theme'

import I18n from '../../I18n/I18n'

import styles from './styles'

class CardsListmsgItem extends Component {
  render () {
    const { style } = this.props
    const {
      
      avatar,
      fullName,email
    } = this.props.data

    const IS_IOS = Platform.OS === 'ios'
    let iconType = IS_IOS ? 'ios' : 'md'
// console.log(this.props)
    return (
      <View style={[styles.root, style]}>
         <View style={styles.imgcontaineravator}>

         <Image style={styles.image} source={{ uri: avatar }} /> 
        </View>

        <View style={styles.titleContainer}>
          
          <Text numberOfLines={1} style={styles.subTitle}>
            {` ${fullName}`}
          </Text>
          <Text style={styles.date}>
            {email}
          </Text>
        </View>
            {/* {title} 

        <View style={styles.iconsContainer}>
          <View style={styles.iconContainer}>
            <Icon name={`${iconType}-heart`} size={18} color={Colors.heart} />
            <Text style={styles.counter}>{favoritesCount}</Text>
          </View>

          <View style={styles.iconContainer}>
            <Icon
              name={`${iconType}-chatbubbles`}
              size={18}
              color={Colors.brownGrey}
            />
            <Text style={styles.counter}>{repliesCount}</Text>
          </View>
        </View> */}
        
      </View>
    )
  }
}

CardsListmsgItem.propTypes = {
  style: object
}

CardsListmsgItem.defaultProps = {
  style: {}
}

export default CardsListmsgItem
