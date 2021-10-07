import React, { Component } from 'react'
import { object, func, array } from 'prop-types'

import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import CardsListItemnotification from '../../Components/CardsListItemnotification'

import { Colors } from '../../Theme'
import styles from './styles'

class CardsListnotification extends Component {
  render () {
//  console.log(this.props.data)
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
           (item.data.type == "questions" || item.data.type == "discussions" ||  item.data.type == "cooperations" ) ? 
        (


           <TouchableOpacity
           
             onPress={() => onItemPress('PostNotification',
            {data:
             item.data
            }
            )}
            style={styles.item}
          >
            <CardsListItemnotification data={item} />
          </TouchableOpacity>
        )
          
          : 
          (

         <TouchableOpacity
            onPress={() => onItemPress('DetailsNotification', 
            {data:

            item.data
    

            }
            )}
            style={styles.item}
          >
            <CardsListItemnotification data={item} />
          </TouchableOpacity>
          )  
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

CardsListnotification.propTypes = {
  style: object,
  data: array,
  onItemPress: func
}

CardsListnotification.defaultProps = {
  style: {},
  data: [],
  onItemPress: () => {}
}

export default CardsListnotification
