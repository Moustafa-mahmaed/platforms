import React, { Component } from 'react'
import { object, array, number, func, string } from 'prop-types'

import {
  ScrollView,
  Text,
  Modal as RNModal,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import styles from './styles'
import { Colors } from '../../Theme'

class DropdownModal extends Component {
  renderCloseButton = () => {
    const { setModalVisible } = this.props

    return (
      <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          setModalVisible(false)
        }}
      >
        <Icon
          name='ios-close-circle-outline'
          size={40}
          color={Colors.basic.black}
        />
      </TouchableOpacity>
    )
  }

  renderOptions = () => {
    const { options, selectedIndex, onItemPress, selectedColor } = this.props
    const selectedStyle = { backgroundColor: selectedColor }
    const selectedTextStyle = { color: Colors.basic.white }

    return (
      <ScrollView contentContainerStyle={styles.itemContainer}>
        {options &&
          options.map((option, index) => {
            return (
              <TouchableOpacity
                onPress={() => onItemPress(index, options[index])}
                key={index}
                style={[
                  styles.item,
                  index === selectedIndex ? selectedStyle : {}
                ]}
              >
                <Text
                  style={[
                    styles.tag,
                    index === selectedIndex ? selectedTextStyle : {}
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            )
          })}
      </ScrollView>
    )
  }
  render () {
    const { style, modalVisible } = this.props
    return (
      <RNModal
        style={[styles.root, style]}
        animationType='slide'
        transparent={false}
        visible={modalVisible}
      >
        {this.renderCloseButton()}
        {this.renderOptions()}
      </RNModal>
    )
  }
}

DropdownModal.propTypes = {
  style: object,
  options: array,
  selectedIndex: number,
  onItemPress: func,
  selectedColor: string
}

DropdownModal.defaultProps = {
  style: {},
  options: [],
  selectedIndex: 0,
  onItemPress: () => {},
  selectedColor: ''
}

export default DropdownModal
