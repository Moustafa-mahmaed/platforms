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
import { Text,ActivityIndicator, View,ScrollView ,StatusBar ,Platform ,TouchableWithoutFeedback  } from 'react-native'
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
    
            
  
      renderHeader = () => {
        const { fetching } = this.props
    
        return (
          <View style={styles.header}>
           
        <TextInput
          style={styles.searchBox}
          onChangeText={
              searchText => {
                this.setState({ searchText },function(){
                  this.searchatAll(this.state.searchText)
                  
                })
               
              }
              
            }
            onFocus={
              ()=>this.props.navigation.navigate('Search')
            }
            value={this.state.searchText}
            placeholder={I18n.t('search')}
            editable={!fetching}
            />
              { this.state.searchText !==""?
          <TouchableWithoutFeedback onPress={()=>{
              this.setState({
                searchText: ''
              })
          }}>
    <Icon  style={
        {
            position:"absolute",left:70 ,top:43 ,elevation:10
        }
    } name="md-close" size={18} color="grey"/>
    </TouchableWithoutFeedback>
    : null
}
          
    
    
            
          </View>
        )
      }



    searchatAll = (value) =>{
     
        
        
      
      const api_search =`https://forums.influancy.com/api/search?query=${value}`;
     
     //console.log(api_search)
              var object = {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  "Authorization": `Bearer ${token}`
                  
                }
           
          
        };
       
  fetch(api_search, object)
  .then((response) =>
    response.json())
    .then((responseJson) => {
      if(responseJson.message !==""){
        // alert(responseJson.message)
      }
      
      //console.log(responseJson)
      this.setState({
        list:responseJson
      })

     


    })

  .catch(function(err) {});
         
        
      }

    // this.props.navigation.goBack("Home")

  renderBackButton = () => {
    return (
      <Button
      style={{position:"absolute" ,left:15, top:25, width:50, height:50,}}
      onPress={() => {
        this.props.navigation.goBack(null)
        this.props.navigation.navigate("home")
      }}
        iconSettings={{
          iconName: `${iconType}-arrow-back`,
          iconSize: 25,
          iconTintColor: Colors.basic.white,
          iconStyle: styles.backButtonIcon
        }}
        type='transparent'
        buttonColor={Colors.deepSkyBlue}
        containerStyle={styles.backButton}
      />
    )
  }

  renderList = () => {
    const {  list } = this.state

    return (
      <View style={styles.body}>
        {this.state.list.length == 0 && this.state.searchText !=="" && (
          <ActivityIndicator
            size='small'
            color={Colors.jungleGreen}
            style={styles.fetching}
          />
        )}




       {/* <CardsList
          data={list.competitions}
          onItemPress={this.onCardPress_competitions}
          
          />
          
          
          
        */}
        <CardsListmsg
         data={list.users}
         onItemPress={this.onCardPress_user}
        
        /> 
        <CardsList
            data={list.questions}
            onItemPress={this.onCardPress_question}
            
            /> 
            <CardsList
                data={list.discussions}
                onItemPress={this.onCardPress_discussions}
                
                />    
                <CardsList
                     data={list.cooperations}
                     onItemPress={this.onCardPress_cooperations}
                     
                     />   
           <CardsList
        data={list.polls}
        onItemPress={this.onCardPress_polls}
      />   
      
    
  
    
      <CardsListForEvent
      
      colorlogo={Colors.dustyOrange}
          data={list.events}
          onItemPress={this.onCardPress_events}
        
        /> 
    
     
     
        <CardsListForEvent
    data={list.workshops}
    onItemPress={this.onCardPress_workshops}
    
    /> 
  
    

        
      </View>
    )
  }
// navigate to question
onCardPress_question = (route, item) => {

    this.props.navigation.navigate(route, { category: 'questions', item  })
  }
// navigate to discussion
  onCardPress_discussions = (route, item) => {
      
    this.props.navigation.navigate(route, { category: 'discussions', item  })

  }
  // navigate to cooperation
  onCardPress_cooperations = (route, item) => {

    this.props.navigation.navigate(route, {category: 'cooperations', item})
  }
  // navigate to event
  onCardPress_events = (route, item) => {

    
    this.props.navigation.navigate(route, { category: 'events', item  })

  }
   // navigate to workshop
   onCardPress_workshops = (route, item) => {

    
    this.props.navigation.navigate(route, { category: 'workshops', item })

  }
  // navigate to polls 1
  onCardPress_polls = (route, item) => {
      
    this.props.navigation.navigate("OpinionBeforeVoting", {  item  })

  }
   // navigate to guest
   onCardPress_user = (route, item) => {
     this.props.navigation.navigate('Guest', {id:JSON.stringify(item.id) })
    

  }
  
      render () {
    
        return (
          <ScrollView style={styles.root}>
            <StatusBar barStyle='light-content' />
    
            <View style={styles.content}>
              {this.renderGradient()}
              {this.renderHeader()}
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
