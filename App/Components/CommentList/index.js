import React, { Component } from 'react'
import { object, func, array } from 'prop-types'

import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import CommentListItem from '../../Components/CommentListItem'  

import { Colors } from '../../Theme'
import styles from './styles'

class CommentList extends Component {
  render () {
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
          <View
           
            style={styles.item}
          >
            <CommentListItem data={item}  onItemPress={onItemPress}/>
          </View>
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

CommentList.propTypes = {
  style: object,
  data: array,
  onItemPress: func
}

CommentList.defaultProps = {
  style: {},
  data: [],
  onItemPress: () => {}
}

export default CommentList
