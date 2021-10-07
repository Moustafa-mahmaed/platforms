import React, { Component } from 'react'
import { object, func, array } from 'prop-types'

import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import CardsListItemmessage from '../../Components/CardsListItemmessage'

import { Colors } from '../../Theme'
import styles from './styles'

class CardsListmessage extends Component {
  render () {



    const { style, onItemPress, data, handleLoadMore, loadingMore } = this.props
// // //console.log(this.props)
    return (
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
            onPress={() => onItemPress('Chatclient',item)}
            style={styles.item}
          >
            <CardsListItemmessage data={item} />
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

CardsListmessage.propTypes = {
  style: object,
  data: array,
  onItemPress: func
}

CardsListmessage.defaultProps = {
  style: {},
  data: [],
  onItemPress: () => {}
}

export default CardsListmessage
