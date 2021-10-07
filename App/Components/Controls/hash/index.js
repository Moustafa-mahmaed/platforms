import React from 'react'
import AutoTags from 'react-native-tag-autocomplete';
import { View, TextInput  , Image, Text  } from 'react-native'
import { object, string, any } from 'prop-types'

import styles from './styles'
import { Colors } from '../../../Theme'



class Hash extends React.Component {
    state = {
        suggestions : [ {name:'Mickey Mouse'}, ],
        tagsSelected : []
    }
    handleDelete = index => {
        let tagsSelected = this.state.tagsSelected;
        tagsSelected.splice(index, 1);
        this.setState({ tagsSelected });
     }
     
     handleAddition = suggestion => {
        this.setState({ tagsSelected: this.state.tagsSelected.concat([suggestion]) });
     }
     
    
    render () {

      const { style, inputStyle, error, icon } = this.props
      const errorStyle = error ? styles.error : {}
      const errorTextStyle = error ? styles.textError : {}
      return (
        <View style={[styles.container, style, errorStyle]}>
         <AutoTags
            style={[styles.autoTags, inputStyle, errorTextStyle]}
            suggestions={this.state.suggestions}
            tagsSelected={this.state.tagsSelected}
            handleAddition={this.handleAddition}
            handleDelete={this.handleDelete}
            placeholder="هاشتاغ" 
            
            />
  
  
        
        </View>
      )
    }
  }
  
  Hash.propTypes = {
    style: object,
    inputStyle: object,
    value: string,
    icon: any
  }
  
  Hash.defaultProps = {
    style: {},
    inputStyle: {},
    value: '',
    icon: null
  }
  
  export default Hash
