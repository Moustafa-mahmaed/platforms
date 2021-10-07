import React, { Component ,Fragment } from 'react'
import { object } from 'prop-types'
import { connect } from 'react-redux'
import LoginActions from '../../../Redux/Actions/Auth/Login'
import  Colors from "../../../Theme/Colors"
import LinearGradient from 'react-native-linear-gradient'
import TextInput from '../../../Components/Controls/TextInput'
import CardsListmsg from '../../../Components/CardsListmsg'
import CardsList from '../../../Components/CardsList'
const IS_IOS = Platform.OS === 'ios'
let iconType = IS_IOS ? 'ios' : 'md'
import Icon from "react-native-vector-icons/Ionicons";
import Button from '../../../Components/Controls/Button'

import I18n from '../../../I18n/I18n'
import CardsListForEvent from '../../../Components/CardsListForEvent'
import { Image,Text,ActivityIndicator, View,ScrollView ,StatusBar ,Platform ,TouchableWithoutFeedback  } from 'react-native'
let token;
import styles from './styles'

class SearchScreen extends Component {
    state = {
      list:[],
        searchText: ''
      }
      renderGradient = () => (
          <Fragment >

        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[Colors.cerulean, Colors.shockingPink]}
          style={styles.gradientHeader}
          />
          {this.renderBackButton()}
          </Fragment>

      )
    
            
   renderTitle = () => (
    <View style={styles.titleContainer}>
       {this.renderBackButton()}
      <Text style={styles.title}>{I18n.t('homeList.market')}</Text>
    </View>
  )
      


  
  renderBackButton = () => {
    return (
      <Button
        onPress={() => {
          this.props.navigation.goBack(null)
        }}
        iconSettings={{
          iconName: `${iconType}-arrow-back`,
          iconSize: 25,
          iconTintColor: Colors.basic.white,
          iconStyle: styles.backButtonIcon
        }}
        type='transparent'
        buttonColor={Colors.jungleGreen}
        containerStyle={styles.backButton}
      />
    )
  }

  renderGradient = () => (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[Colors.cerulean, Colors.shockingPink]}
      style={styles.gradientHeader}
    />
  )
  renderList = () => {
    const {  list } = this.state

    return (
      <View style={
        {
          width:"100%" ,flex:1,marginTop:100
        }
      }>
              <Image style={{width:350,height:200}} source={require('../../../Images/soon.png')} />

      </View>
    )
  }

  
      render () {
    
        return (
          <ScrollView style={styles.root}>
            <StatusBar barStyle='light-content' />
    
            <View style={styles.content}>
              {this.renderGradient()}
              {this.renderTitle()}
            </View>
              {this.renderList()}
              
          
           
          </ScrollView>
        )
      }
    }

SearchScreen.propTypes = {
  navigation: object
}

const mapStateToProps = (state, ownProps) => {
  // //console.log(state)
  token =state.login.token
  
  return {
  
  }
}

const mapDispatchToProps = dispatch => ({
 
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen)
