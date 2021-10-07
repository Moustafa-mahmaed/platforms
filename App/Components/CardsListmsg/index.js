import React, { Component } from 'react'
import { object, func, array } from 'prop-types'

import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import CardsListmsgItem from '../../Components/CardsListItemmsg'

import { Colors } from '../../Theme'
import styles from './styles'

class CardsListmsg extends Component {
  render () {
    // //console.log(this.props)
    const { style, onItemPress, data, handleLoadMore, loadingMore } = this.props

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
            onPress={() => onItemPress('Post', item)}
            style={styles.item}
          >
            <CardsListmsgItem data={item} />
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

CardsListmsg.propTypes = {
  style: object,
  data: array,
  onItemPress: func
}

CardsListmsg.defaultProps = {
  style: {},
  data: [],
  onItemPress: () => {}
}

export default CardsListmsg
