import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { View, FlatList } from 'react-native'
import PrimamryListItem from '../../Components/PrimaryListItem'

import data from '../../Data/homeList'

import styles from './styles'


class PrimamryList extends Component {
  render () {
    const { style, onItemPress } = this.props

    return (
      <View style={[styles.root, style]}>
        <FlatList
          extraData={data}
          data={data}
          style={styles.list}
          columnWrapperStyle={styles.columnWrapperStyle}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <PrimamryListItem
              
                style={styles.item}
                data={item}
                onItemPress={onItemPress}
              />
            </View>
          )}
        />
      </View>
    )
  }
}

PrimamryList.propTypes = {
  style: PropTypes.object
}

PrimamryList.defaultProps = {
  style: {}
}

export default PrimamryList
