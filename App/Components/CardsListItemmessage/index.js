import React, { Component } from 'react'
import { object } from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'

import { View, Text, Image, Platform } from 'react-native'

import { Colors } from '../../Theme'

import I18n from '../../I18n/I18n'

import styles from './styles'

class CardsListItemmessage extends Component {
  render () {
    const { style } = this.props
    const {
      last_message:{
        body,
        created_at,
        user:{
          avatar,
          fullName,

        }
      }
      
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
            {fullName}
          </Text>
         

          <Text numberOfLines={1} style={styles.subTitle}>
             {body}
          </Text>
       
       
        
          
        </View>
        <View>
        <Text style={styles.date}>
            {moment(created_at, 'hmm').format("HH:mm")}
        </Text> 
        </View>
        <View>
        </View>

      </View>
    )
  }
}

CardsListItemmessage.propTypes = {
  style: object
}

CardsListItemmessage.defaultProps = {
  style: {}
}

export default CardsListItemmessage
