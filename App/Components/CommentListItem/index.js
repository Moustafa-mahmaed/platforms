    import React, { Component } from 'react'
    import { object } from 'prop-types'

    import moment from 'moment'
    import Icon from "react-native-vector-icons/FontAwesome"
    import { View, Text, Image, Platform ,TouchableOpacity} from 'react-native'

    import { Colors } from '../../Theme'
import HTML from 'react-native-render-html'
    import I18n from '../../I18n/I18n'

    import styles from './styles'

    class CommentListItem extends Component {
    
    
      render () {
        const { style,onItemPress } = this.props
        const {
          
          user: { avatar },
          favorites_count,
          body,
          created_at

        } = this.props.data

        const item =this.props.data.user

        const IS_IOS = Platform.OS === 'ios'
        let iconType = IS_IOS ? 'ios' : 'md'

        return (
          <View style={[styles.root, style]}>
            <View style={styles.imgcontaineravator}>

              
            <View style={{width:"10%" ,alignSelf:"flex-start"  ,marginTop:20 }}>

      
            </View>
            <View style={{width:"70%" }}>
           

       
         <HTML
          html={`<div>${body}</div>`}
         
          tagsStyles={{
            div: { textAlign: 'right' },
            img: { alignSelf: 'center' }
          }}
        /> 
            <Text style={[styles.date,{textAlign:"left" }]}>
                {moment(created_at, 'YYYYMMDD hhmm').fromNow()}
              </Text>
            </View>
            <View style={{width:"25%" ,alignItems: 'center'  ,marginRight:10}}>
            <TouchableOpacity  onPress={()=>{

              onItemPress('Guest', item)
            
              
            }
          
        }>
  {avatar !==""?
    <Image style={styles.image} source={{ uri: avatar }} />
    :
    <Image style={styles.image} 
    source={require('./../../Images/avator.png')}
     />

  }
            </TouchableOpacity>
            </View>
            
            
            </View>
          </View>
        )
      }
    }

    CommentListItem.propTypes = {
      style: object
    }

    CommentListItem.defaultProps = {
      style: {}
    }

    export default CommentListItem
