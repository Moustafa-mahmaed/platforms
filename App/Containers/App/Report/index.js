import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './styles'
import Button  from '../../../Components/Controls/Button';
import { Colors } from '../../../Theme'


import LinearGradient from 'react-native-linear-gradient'
let typeOfReport;
const api = 'https://forums.influancy.com/api/reports';

import {
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  Platform,
  Dimensions,
   Alert,
  ToastAndroid,
  KeyboardAvoidingView
}from 'react-native'


import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import  TextInput  from '../../../Components/Controls/TextInput';
import { I18n } from 'react-native-i18n';

const IS_IOS = Platform.OS === 'ios'
let iconType = IS_IOS ? 'ios' : 'md'


var radio_props = [
  {label: ' محتوى عنيف أو مثير للاشمئزاز', value: 0 },
  {label: 'محتوى يحض على الكراهية أو مسيء', value: 1 },
  {label: 'محتوى جنسي', value: 2 },
  {label: 'محتوى بذيئ', value: 3 },
  {label: 'أخري', value: 4 },

];



  class Report extends Component {
    constructor () {
      super()
      this.state={
       value:'',
       value3Index:'',
       body:"",
       reason:"",
       switchvalue:"",
       navigation:""
      }
     
  }

  postReport (){
      
    switch (this.props.navigation.state.params.category)
    {
      
      case "discussions":
        this.setState({switchvalue:"Discussion",
      navigation:"MainHall"},function () {
          //console.log(this.state.switchvalue)
         });
         
         break;
         
         case "questions":this.setState({switchvalue:"Question",

         navigation:"Questions"},function () {
           //console.log(this.state.switchvalue)
         
         });
         break;
         
         case "cooperations": this.setState({switchvalue:"Cooperation",
         navigation:"Cooperations"},function () {
           //console.log(this.state.switchvalue)
         });
         
         break;
         
         
         
         case "events": this.setState({switchvalue:"Event",
         navigation:"Events"},function () {
           //console.log(this.state.switchvalue)
        });
        break;
        case "workshops": this.setState({switchvalue:"Workshop",
        navigation:"Workshop"},function () {
          //console.log(this.state.switchvalue)
       });
       break;
        
        
        
        case "polls": this.setState({switchvalue:"Poll",
        navigation:"Polls"},function () {
          //console.log(this.state.switchvalue)
         });
       break;
       
     
       default: 
       //console.log(this.state.switchvalue)
     }
     //console.log(this.state.switchvalue)
    if(this.state.value3Index ==0 || this.state.value3Index ==1 ||this.state.value3Index ==2 ||  this.state.value3Index ==3){
                   
            try{

              this.setState({reason:radio_props[this.state.value3Index].label},function(){
                //console.log(this.state.reason)
              })
            } catch{
              Alert.alert("","يُرجي كتابة أسباب الإبلاغ")

            }      
    }else if(this.state.value3Index ==4){
      if(this.state.body ==""){
        Alert.alert("","يُرجي كتابة أسباب الإبلاغ")
      }else{
        this.setState({reason:this.state.body},function(){
        //console.log(this.state.reason)
      }
        )
    }
  }
  else{
   
        //console.log(this.state.reason)
  }

    var object = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${this.props.navigation.state.params.token}`
        
      },
      body:JSON.stringify( {
         type:this.state.switchvalue
       
        

 ,
 id:this.props.navigation.state.params.id,
 reason:this.state.reason
 
})

};
//console.log(object)
const apilike=`https://forums.influancy.com//api/reports`
fetch(apilike, object)
.then((response) =>{
  
  if(response.ok){
   
    this.props.navigation.goBack(null)
   
  }
  
  response.text()
  
}
)
.then((responseData) => {})
.catch(function(err) {});

}

  
 
  renderBackButton = () => {
    return (
      <Button
        onPress={() => {
          
           this.props.navigation.goBack(null)   // doesnt work to go to the same post
        }}
        iconSettings={{
          iconName: `${iconType}-arrow-back`,
          iconSize: 25,
          iconTintColor: Colors.basic.white,
          iconStyle: styles.backButtonIcon
        }}
        type='transparent'
        buttonColor={Colors.cerulean}
        containerStyle={styles.backButton}
      />
    )
  }


    renderGradient = () => (
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[ Colors.lightgray,Colors.gray]}
          style={styles.gradientHeader}
        />
      )
    
      renderTitle = () => (
        <View style={styles.titleContainer}>
          {this.renderBackButton()}
          <Text style={styles.title}>{'الإبلاغ عن إساءة'}</Text>
        </View>
      ) 

  renderForm =() => {
return(
    <View style={styles.container}>
<KeyboardAvoidingView behavior="padding" enabled>
              
    <RadioForm
     animation={true}
     > 
     {
radio_props.map((obj, i) => (
  <RadioButton labelHorizontal={true} key={i} style={{}} >
     
    <RadioButtonLabel
      obj={obj}
      index={i}
      labelHorizontal={true}
      onPress={(value) => {this.setState({value3Index:value})}}
        
      labelStyle={{fontSize: 18, color: 'black', margin:3,fontFamily:'frutiger-lt-arabic-65-bold'}}
      labelWrapStyle={{flex:1,justifyContent:'flex-end'}}
    />
    <RadioButtonInput
      obj={obj}
      index={i}
      isSelected={this.state.value3Index === i}
      onPress={(value) => {this.setState({value3Index:value})}}
      borderWidth={1}
      buttonInnerColor={'gray'}
      buttonOuterColor={this.state.value3Index === i ? 'gray' : '#000'}
      buttonSize={10}
      // buttonOuterSize={80}
      buttonStyle={{}}
      buttonWrapStyle={{marginLeft: 10}}
    />
    
  </RadioButton>
))
}  
</RadioForm>   
{this.state.value3Index === 4?
<View style={{ alignItems:'center',width:'95%',height:200,marginTop:30,fontFamily:'frutiger-lt-arabic-65-bold'}}>

<TextInput
                    onChangeText={(value)=>{this.setState({body:value},function(){
                      //console.log(this.state.body)
                    })}}
                    value={this.state.body}
                        multiline={true}
                         numberOfLines={4}
                        placeholder={'أسباب أخري'}
                        style={styles.textareastyle}
                         placeholderTextColor={Colors.basic.black}
                        underlineColorAndroid='transparent'
                        clearTextOnFocus={true}
                      />
                      </View>
:null
}   

<View style={{flexDirection:'row' ,justifyContent:'space-around', marginTop:15, }} >  

           

<View style={{marginLeft:55}}>
          <Button
                           
                buttonColor={Colors.gray}   
                type="secondary"
                 title={'إلغاء'}
                containerStyle={{width:90,fontFamily:'frutiger-lt-arabic-65-bold'  }}
                onPress={() => {
          
                  this.props.navigation.goBack(null) 
               }}
              
              />
              </View>

              <View style={{marginRight:55}}>

<Button
  
  // loading={this.state.loading}
  // disabled={this.state.loading}                
    buttonColor={Colors.cerulean}
    type="secondary"
    title={'حفظ'}
      onPress={()=>{
      this.postReport()
     }}
    containerStyle={{width:90,fontFamily:'frutiger-lt-arabic-65-bold' }}
  />
</View>


        </View>
                      </KeyboardAvoidingView>
        </View>

)
  }

  render (){
    // //console.log(this.props)
     return (




      <View style={styles.root}>
 
{this.renderGradient()}
  {this.renderTitle()}
  <ScrollView>
   {this.renderForm()}
</ScrollView>
</View>

      
    )
  }
  }


Report.propTypes = {
  navigation: PropTypes.object
}

Report.defaultProps = {
  navigation: {}
}

const mapStateToProps = (state, ownProps) => {
  token =state.login.token
  postowner=state.login.user.id
  avatarowner=state.login.user.avatar
  //console.log(state.login.user.avatar)
  
  
  
  return {
    
    data: state.post.data,
    fetching: state.post.fetching,
    errors: state.post.errors
  }
}

const mapDispatchToProps = dispatch => ({
  getPost: (category, id) => dispatch(PostActions.postRequest(category, id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Report)