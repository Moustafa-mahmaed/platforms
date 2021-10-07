import React, { Component } from 'react'
import { object } from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'

import { View, Text, Image, Platform } from 'react-native'

import { Colors } from '../../Theme'

import I18n from '../../I18n/I18n'

import styles from './styles'


class CardsListItemForEvent extends Component {
  render () {



    const { style } = this.props
    const {
      title,
      image,
      city
      , country
      ,  start_date,
      end_date,
      imagePath,
      created_at: createdAt,
      user: { avatar, fullName },
      favorites_count: favoritesCount,
      replies_count: repliesCount
    } = this.props.data

    // //console.log(this.props.data)
    const IS_IOS = Platform.OS === 'ios'
    let iconType = IS_IOS ? 'ios' : 'md'
    return (
      <View style={[styles.root, style]}>
        <Image style={styles.image} source={{ uri:imagePath}} />

        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
           
          </Text>
          <Text style={styles.subTitle}>
              {`${country.name} - ${city.name}`}
            </Text>
            <Text style={styles.subTitle}>
              {moment(start_date).format(' MMMM YYYY Do ')}
            </Text>
            <Text style={styles.subTitle}>
              من الساعه 
              {moment(start_date).format('h a ')}
              حتى الساعه 
              {moment(end_date).format('h a ')}
            </Text>

          {/* <Text numberOfLines={1} style={styles.subTitle}>
            {`${I18n.t('postedBy')} ${fullName}`}
          </Text> */}
          {/* <Text style={styles.date}>
            {moment(createdAt, 'YYYYMMDD').fromNow()}
          </Text> */}
        </View>

       
       
        <View  style={{alignItems:"center"}} >
          <View>
            <View style={[styles.smartlogo,{backgroundColor:this.props.Color1}]}>
           <View style={styles.time}>
             
              <Text style={styles.timetext}>{moment(end_date).format('Do ')}</Text>
              <Text style={styles.timetext}>{moment(end_date).format('MMM ')}</Text>
             </View>

              <View style={styles.trangle}>

              </View>

            </View>
          </View>

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
              </View>
        </View>
      </View>
    )
  }
}
  
CardsListItemForEvent.propTypes = {
  style: object
}

CardsListItemForEvent.defaultProps = {
  style: {}
}

export default CardsListItemForEvent
