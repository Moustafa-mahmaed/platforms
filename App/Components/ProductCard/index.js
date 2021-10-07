import React, { Component } from 'react'
import { object, func, array } from 'prop-types'

import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from 'react-native'
import ProductCardItem from '../../Components/ProductCardItem'

import { Colors } from '../../Theme'
import styles from './styles'
// import { ScrollView } from 'react-native-gesture-handler'

class CardsList extends Component {
  render () {
    const { style, onItemPress, data, handleLoadMore, loadingMore } = this.props

    return (
      
   

      
       <FlatList
       horizontal={true}
        style={[styles.list, style]}
        data={data}
        extraData={data}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        numColumns={1}
        keyExtractor={(_, index) => `${index}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onItemPress('Post', item)}
            style={styles.item}
          >
      <ScrollView
      horizontal={true}
      >
            <ProductCardItem data={item} />
            </ScrollView>

          </TouchableOpacity>
        )}
        ListFooterComponent={
          <View style={styles.loadingMore}>
            {loadingMore && (
              <ActivityIndicator
                color={Colors.cerulean}
                style={styles.fetching}
                size='small'
              />
            )}
          </View>
        }
      />
      
 
     )
  }
}

CardsList.propTypes = {
  style: object,
  data: array,
  onItemPress: func
}

CardsList.defaultProps = {
  style: {},
  data: [],
  onItemPress: () => {}
}

export default CardsList
