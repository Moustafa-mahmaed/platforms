import React, { Component } from 'react'
import { object } from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'

import { View, Text, Image, Platform,ScrollView,TouchableOpacity } from 'react-native'

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
       
 <View>
        <View
              style={styles.sellingProductsContainer}>              
              <Image
            style={styles.sellingProductsImage}
            source={{uri:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267"}}
            />
            <Text style={styles.sellingProductsName}> iPhone X</Text>
            <Text style={styles.sellingProductsPrice}> 12.000 LE</Text>

            <View style={styles.sellingProductsIcon2} >
            <Text style={styles.sellingProductsPlace} >مدينة الشيخ الزايد  </Text>
            <Icon  name="md-pin" size={18} color={Colors.brownGrey} />   
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
