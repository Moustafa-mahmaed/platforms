import React, { Component } from 'react'
import { object } from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'

import { View, Text, ScrollView, Image, Platform } from 'react-native'

import { Colors } from '../../Theme'


import styles from './styles'


import I18n from '../../I18n/I18n'

import LinearGradient from 'react-native-linear-gradient'

class Itemmessage extends Component {





  render() {

    // const {
    //   last_message:{
    //     body,
    //     created_at,
    //     user:{
    //       avatar,
    //       fullName,

    //     }
    //   }

    // } = this.props.data
    // alert(this.props.id)
    const IS_IOS = Platform.OS === 'ios'
    let iconType = IS_IOS ? 'ios' : 'md'
    // //console.log("helmi")

    // //console.log(this.props)
    // //console.log("lllllllllllllllllllllllllllllllllll")

    return (

      <View style={{ flex: 1 ,marginTop:10}}>
        {this.props.id == this.props.data.user_id ?
        <View style={{flex:1}}> 

                    <View style={styles.messageContent_sender}>
                    <View style={styles.messageContentTextcontainer_sender}>
        
                      {this.props.data.last_message !== null ? <Text style={styles.messageContentText_sender} >{this.props.data.body}</Text>
                        : null}
                    </View>
                    </View>
                    {this.props.data.created_at !== null ? <Text style={styles.Text_sender} >{}
                        {moment(this.props.data.created_at).format('hh :mm')}
                      </Text>
                        : null}
                  </View>
          :
          <View style={{flex:1}}> 
          <View style={styles.messageContent}>
            <View style={styles.imgcontaineravator}>
              {this.props.data.user.avatar != null ?
                  <Image style={styles.image} source={{ uri: this.props.data.user.avatar }} /> :
                  <Image style={styles.image} source={{ uri: "https://avatars3.githubusercontent.com/u/32242323?s=88&v=4" }} />
              }
            </View>
            <View style={styles.messageContentTextcontainer}>

              {this.props.data.last_message !== null ? <Text style={styles.messageContentText} >{this.props.data.body}</Text>
                : null}
            </View>
          </View>
          {this.props.data.created_at !== null ? <Text style={styles.Text} >{}
                {moment(this.props.data.created_at).format('hh :mm')}
              </Text>
                : null}
          </View>
        }
      </View>
    )
  }
}

Itemmessage.propTypes = {
  style: object
}

Itemmessage.defaultProps = {
  style: {}
}

export default Itemmessage
