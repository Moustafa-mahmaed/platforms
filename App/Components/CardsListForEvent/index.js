import React, { Component } from 'react'
import { object, func, array } from 'prop-types'

import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
  ,Text
} from 'react-native'
import CardsListItem from '../../Components/CardsListItemForEvent'

import { Colors } from '../../Theme'

import styles from './styles'

class CardsList extends Component {
  render () {
    const { style, onItemPress, data, handleLoadMore, loadingMore ,colorlogo } = this.props

    return (
      <View>
    
      <FlatList
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
            onPress={() => onItemPress('Details', item)}
            style={styles.item}
          >
            <CardsListItem data={item} Color1={colorlogo} />
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
      </View>
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
