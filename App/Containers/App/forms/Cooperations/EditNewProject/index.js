import React, { Component } from 'react'
import { object } from 'prop-types'
import { View, Text ,Picker,Alert, Platform ,TouchableOpacity,ScrollView,KeyboardAvoidingView,Keyboard,TextInput} from 'react-native'
import DateTimePicker from "react-native-modal-datetime-picker";
import { Switch } from 'react-native-switch';
import moment from "moment"
import { connect } from 'react-redux'
import LoginActions from '../../../../../Redux/Actions/Auth/Login'
import Button from '../../../../../Components/Controls/Button'
import LinearGradient from 'react-native-linear-gradient'
const country_api = 'https://forums.influancy.com/api/countries';
const city_api = 'https://forums.influancy.com//api/countries';
import RichText from "../../../../../Components/RichText"
import { convertToHtmlString } from "react-native-cn-richtext-editor";





const api="https://forums.influancy.com/api/cooperations"
import { func, bool } from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Tags from "react-native-tags"

import Message from '../../../../../Components/Message'
var list
import I18n from '../../../../../I18n/I18n'


import { Colors } from '../../../../../Theme'



const IS_IOS = Platform.OS === 'ios'
let iconType = IS_IOS ? 'ios' : 'md'
import styles from './styles'
let token;

class EditNewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading1:false,
      loading:false,
     
      switchValue:true,
      pickerValue:"",
      pickerValue1:"",
      isDateTimePickerVisible: false,
      datatime1:null,
      xvalue:"",
      xvalue1:"end_date",
      chosenDate1:"",
      chosenDate2:"",
      switchvalue:false,
      countryList:[],
      cityList:[],
      country_id:"",
      city_id:"",
      TagVALUE:'',
      obj:{}


    };
  }  
  
  
componentWillMount(){
      fetch(country_api)
        .then((response) => response.json())
        .then((responseJson) => {
           this.setState({
          //   isLoading: false,
            countryList:responseJson
         }, function(){
          // //console.log(this.state.countryList)
  
          });
  
        })
        .catch((error) =>{
          console.error(error);
        });
    }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false ,
    
    
    });
  };

   
  _handleSubmit1=(values)=>{
    console.log(values)
  } 
  
  _handleSubmit=(values)=>{
   
    

 this.setState({
                        loading:true
                      })
            
                   
               
                     
                     

                    
                        
                   

                    
                   
                    
                    var object = {
                      method: 'PUT',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`, 
                      },

                      body:JSON.stringify( {
                        'title':values.title ,
                        'body': values.body,
                       
                       "tags":"new",
                        
                      
                       
                     "country_id":`${values.country_id}`,
                         "city_id":`${values.city_id}`,
                        "start_date":values.start_date,
                      
                      "end_date":values.end_date,
                   "payment":values.payment,
                    "members": ["one",  "two"]
       
                       
                     })
                     
                    }
                    console.log("((((((((((((((((((((((((((((((((((((((((((((((")
                    console.log(object)
                    console.log("((((((((((((((((((((((((((((((((((((((((((((((")


       fetch(api, object) 
        .then((response) =>{
          console.log(":::")
          console.log(response)
          this.setState({
            loading1:true,
            loading:false
          })
         
          if(response.ok){

            this.props.navigation.navigate('Home');
          }
          response.text()
        
        }
        )
        .then((responseData) => {})
        .catch(function(err) {});
          
  }

  
  formDefinition = {
    
    initialValues: {
      title: this.props.navigation.state.params.data.title,
      body: this.props.navigation.state.params.data.body,
      tags: this.props.navigation.state.params.data.tags,
      country_id:this.props.navigation.state.params.data.country_id,
      city_id:this.props.navigation.state.params.data.city_id, 
      start_date:this.props.navigation.state.params.data.start_date,
      end_date:this.props.navigation.state.params.data.end_date,
      payment:this.props.navigation.state.params.data.payment,
      // members: this.props.navigation.state.params.data.
      
     
      
      
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required(I18n.t('validation.required')),
      body: Yup.string().required(I18n.t('validation.required')),
      tags: Yup.string().required(I18n.t('validation.required')),
      country_id: Yup.string().required(I18n.t('validation.required')),
      city_id: Yup.string().required(I18n.t('validation.required')),
      start_date: Yup.string().required(I18n.t('validation.required')),
      end_date: Yup.string().required(I18n.t('validation.required')),
      payment: Yup.string().required(I18n.t('validation.required')),
      members: Yup.string().required(I18n.t('validation.required')),
      // image: Yup.string().required(I18n.t('validation.required')),
      

    
    })
  }

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
        buttonColor={Colors.cerise}
        containerStyle={styles.backButton}
      />
    )
  }


  renderGradient = () => (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[Colors.cerise, Colors.cerise]}
      style={styles.gradientHeader}
    />
  )

  renderTitle = () => (
    <View style={styles.titleContainer}>
      {this.renderBackButton()}
      <Text style={styles.title}>{I18n.t('editnewproject')}</Text>
    </View>
  )
 
    
      renderForm = () => {
    
     
       
        return (
          <Formik
        {...this.formDefinition}
          onSubmit={this._handleSubmit1}
            render={
                 ({values ,handleSubmit ,submitCount ,setFieldValue ,errors,
                 touched ,setFieldTouched ,isValid ,isSubmitting }) => (
                   <React.Fragment>
                    <View style={styles.formcontainer}>
                 <TextInput
                       
                       style={styles.inputcontainer}

                        onChangeText={text => setFieldValue("title", text)}
                        onBlur={() => setFieldTouched("title")}
                       value={values.title}
                        error={
                       touched.title || submitCount > 0
                         ? errors.title
                          : null
                      }
                     placeholder={I18n.t('eventname')}
                     placeholderTextColor={Colors.basic.black}
           
                   />
                       <Message name='title' />
                              <ScrollView   >
                            <KeyboardAvoidingView>
                             


<TextInput
                      onChangeText={text => setFieldValue("body", text)}
                        onBlur={() => setFieldTouched("body")}
                       value={values.body}
                        error={
                       touched.body || submitCount > 0
                         ? errors.body
                          : null
                      }
                    
                      
                            multiline={true}
                        
                            numberOfLines={4}
                            placeholder={I18n.t("article")}
                            style={styles.textareastyle}placeholderTextColor={Colors.gray}
                            underlineColorAndroid='transparent'
                          />
                          <Message name='body' /> 


    
                        
                  <View>
                  
              <View>
                            <Tags                             
                                 initialText=""
                                 placeholderTextColor={Colors.gray}
                                style={styles.hashstyle}
                                 textInputProps={{
                                   placeholder: I18n.t('hashtag')
                                 }}
                                 
                                 initialTags={[]}
                                 onChangeTags={tags => {
     
                                   values.tags=tags
                                
                                   
                                 } 
                                 }
                                 onTagPress={(index, tagLabel, event, deleted) =>
                                   console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                                 }                            
                                 inputContainerStyle={{backgroundColor:"white"}}
                                
                                 renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                                   <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
                                     <Text style={styles.hashTagText}>{tag}</Text>
                                   </TouchableOpacity>
                                 )}
                                          />
                                     <Message name='tags' />
     
                                     </View>
          

    <View>
     
        <View>
          
        <View>
          
                       <Picker
                          style={{  width: "100%"}}
                          selectedValue={(this.state && this.state.country_id) || 'a'}
                          onValueChange={(value,key ) => {
                          
                            if (value) {
                              values.country_id=key
                             
                              this.setState({country_id:value,value1:key

                              },function(){

                                if(this.state.country_id!=null&&this.state.country_id!='')
                          fetch(`https://forums.influancy.com/api/cities?code=${this.state.country_id}`)
                          .then((response) => response.json())
                          .then((responseJson) => {
                          

                            this.setState({
                            
                              cityList:responseJson
                          }, function(){
                           

                            });


                          })
                          .catch((error) =>{
                            console.error(error);
                          });
                              });
                            }

                        
                          }} itemStyle={{color: 'white'}}>




                  <Picker.Item label='اختار البلد' value={[]} />

                  {this.state.countryList.map((data) => {
                  return (
                  <Picker.Item key={data.id} label={data.name} value={data.code}

                  />
                  )
                  })

                      }
            </Picker>


                           {this.state.country_id !=="" ?
                                <Picker
                                style={{
                                width: "100%",
                                }}
                                selectedValue={(this.state && this.state.city_id) || 'a'}

                                onValueChange={(value) => {
                                if (value !== 0) {
                                values.city_id=value
                              

                                this.setState({city_id: value},function(){


                                });
                                }
                                }
                                }
                                itemStyle={{color: 'white'}}>



                                <Picker.Item label='اختيار المدينه' value='' />

                                {this.state.cityList.map((data) => {
                                return (
                                <Picker.Item key={data.id}  label={data.name} value={data.id} />

                                )
                                })
                                }


                                </Picker>
        :
        null  
      }  
  
        
          
  
          </View>
        </View>
      
    
    
    
    
    </View>
    <View >
          
    </View>
    
    
    <View style={{flexDirection:"row" ,justifyContent:"space-around"}}>
      <View  style={{flexDirection:"column" ,justifyContent:"space-around" ,width:"50%"}}>
    
                                    <Button  style={{width:80,margin:10 }} 
                                    icon={require('../../../../../Images/Icons/events.png')}
                                        // opacity
                                    buttonColor={Colors.ceriseopacity}
                                    type="secondary"
                                    title={I18n.t('end_data')} onPress={()=>{ 
                                      this.setState({
                                      
                                    
                                        xvalue1:"end_date",
                                    isDateTimePickerVisible: true
    
                                  })
                               
                                  
                                
                                    } 
                                  }
                                  />
                                  <Text style={{fontSize:18,color:Colors.basic.black , alignItems:"center", textAlign:"center"}}>{this.state.chosenDate2}</Text>
    
                                  </View>
    <View  style={{flexDirection:"column" ,justifyContent:"space-around",width:"50%"}}>
    
                                    <Button style={{width:80,margin:10}}  
                                    icon={require('../../../../../Images/Icons/events.png')}
                                    
                                    buttonColor={Colors.ceriseopacity}
                                    type="secondary"
                                     title={I18n.t('start_data')} onPress={()=>{
                                      
                                      this.setState({
                                        
                                        xvalue1:"start_date",
                                        isDateTimePickerVisible: true,
                                      
                                      }) 
                                      
                                    }
                                  }
                                  />
      <Text style={{fontSize:18,color:Colors.basic.black , alignItems:"center", textAlign:"center"}}>{this.state.chosenDate1}</Text>
                                  </View>
    </View>
    
    <View style={{flexDirection:"row" ,justifyContent:"space-around"}}  >
    
    </View>
            <DateTimePicker
           is24Hour={false}
           
            
            isVisible={this.state.isDateTimePickerVisible}
              onConfirm={(data)=>{
                
                if(this.state.xvalue1 == "start_date"){
                  data=moment(data).locale("en")
                  values.start_date=moment(data).format('YYYY-M-D HH:mm:ss')
                 

                  this.setState({
                    chosenDate1:values.start_date
                  })
                 
                }
                else if(this.state.xvalue1 == "end_date"){
                  data=moment(data).locale("en")
                  values.end_date=moment(data).format('YYYY-M-D HH:mm:ss')
                  
              
                  this.setState({
                    chosenDate2:values.end_date
                  })
                  
                  
                }
                
                this.hideDateTimePicker();
                
              }
              
            }
            onCancel={this.hideDateTimePicker}
    
              value={values.end_date }
            
               onChangeText={text => setFieldValue("end_date", text)}
                        onBlur={() => setFieldTouched("end_date")}
                  
                        error={
                       touched.end_date || submitCount > 0
                         ? errors.end_date
                          : null
                      }
              mode={"datetime"}
           
               datePickerModeAndroid={"spinner"}
               minimumDate={new Date() }
               
              
            /> 
            
    
    
    
                                    </View>

                                    

                   <View style={{ marginVertical: 20, alignItems: "center", flexDirection: "row-reverse" }}>
                     <Text style={{ fontSize: 18, paddingHorizontal: 10 }}>مدفوع الاجر</Text>
                     <Switch
                      value={this.state.switchvalue}
                      onValueChange={(switchvalue) => {
                        this.setState({
                          switchvalue: !this.state.switchvalue
                        })
                        if (switchvalue == true) {
                          values.payment = "paid"
                      
                        } else if (switchvalue == false) {
                          values.payment = "unpaid"
                          
                        }
                      }}
                      disabled={false}
                      activeText={'On'}
                      inActiveText={'Off'}
                      backgroundActive={Colors.cerise}
                      backgroundInactive={'#A1A1A1'}
                      circleActiveColor={'white'}
                      circleInActiveColor={'white'} />





                  </View>
    
    
      
                              </KeyboardAvoidingView>
                              </ScrollView>
                
    
    
                <View style={styles.signupSubmitcontainer}>
                  <View style={{width:120 ,paddingVertical:20}}> 
    
                 
                  <Button
                  
                            
                    buttonColor={Colors.cerise}
                    type="secondary"
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    title={I18n.t('EditButton')}
                    style={styles.signupSubmit}
                  
                  />
                   </View>
                  </View>
    
               
    
                
    
                </View>
                     </React.Fragment>
                 )}
                 />
        )}

           
    

      
  render () {

    return (
      <View style={styles.root}>
            <View style={styles.root}>
      {this.renderGradient()}
        {this.renderTitle()}
        <ScrollView>  
        {this.renderForm()}
      

      </ScrollView>
      
      
    
        
      </View>
      </View>
    )
  }
}
const mapStateToProps = (state, ownProps) => {

  token=state.login.token

  
  
    return {

    }
  }
  
  export default connect(
    mapStateToProps,
    null
  )(EditNewProject)
  
  



