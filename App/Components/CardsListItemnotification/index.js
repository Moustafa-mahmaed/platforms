import React, { Component } from 'react'
import { object } from 'prop-types'
import Icons from "react-native-vector-icons/Ionicons"
import moment from 'moment'

import { View, Text, Image, Platform } from 'react-native'

import { Colors } from '../../Theme'

import I18n from '../../I18n/I18n'

import styles from './styles'
import colors from '../../Theme/Colors'
let categ
class CardsListItemnotification extends Component {
  state={
    categ:""
  }
componentDidMount(){
  

    switch ( this.props.data.data.type)
    {
      
      case "discussions":
        
        this.setState({
          categ:"الغرفه الرئيسيه"
        })
        
        break;
        
        case "questions":
          
          this.setState({
            categ:"سين وجيم "
          })
          
          break;
          
          case "cooperations": 
          this.setState({
         
            categ:"تعاون"
          })
          break;
          
          
          
          case "events": 
          this.setState({
            
            categ:"فعاليات"
          })
          break;

          case "workshops": 
          this.setState({
            
            categ:"ورشه"
          })
          break;
          
          
          
          case "polls": 
          this.setState({
            categ:" استطلاعات الراى "
          })
          break;
          
          
          default: 
          
        }
      
}

  render () {
    const { style } = this.props
  console.log(this.props)

    const IS_IOS = Platform.OS === 'ios'
    let iconType = IS_IOS ? 'ios' : 'md'

    return (
      <View style={[styles.root, style]}>
      <View style={{position:"relative"}}>
        
        <Image
          style={{ height: 65,
            width: 65,
            marginLeft: 5,
            borderRadius:40,}}
          source={require('../../Images/Man.png')}
       
       />
       { 
        this.props.data.type.includes("HaveNewReply") ?
       <View style={[styles.viewcircle ,{ 
            
            backgroundColor:colors.paleOliveGreen}]}>
         <Icons style={styles.icon1}  name={`${iconType}-chatbubbles`} size={25} color="white" />
      
       </View>:
        <View style={[styles.viewcircle ,{ 
               
               backgroundColor:colors.pinkishRed}]}>
         <Icons style={styles.icon1}  name={`${iconType}-heart`} size={25} color="white" />

         </View>
      }
        </View> 
        <View>
         
          <Text style={{fontSize:15 ,textAlign:"right"}} >{`${this.props.data.data.message} فى ${this.state.categ}` }</Text>
          
          </View> 
      </View>
    )
  }
}

CardsListItemnotification.propTypes = {
  style: object
}

CardsListItemnotification.defaultProps = {
  style: {}
}

export default CardsListItemnotification
