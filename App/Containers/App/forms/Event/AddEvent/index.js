import React, { Component } from 'react'
import { object } from 'prop-types'
import { View, Text ,Picker,Alert, Platform ,Image, TouchableOpacity,ScrollView,KeyboardAvoidingView,Keyboard,TextInput} from 'react-native'
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
import  CNRichTextEditor , { CNToolbar , getDefaultStyles, convertToObject,convertToHtmlString } from "react-native-cn-richtext-editor";



import ImagePicker from 'react-native-image-picker'

const api="https://forums.influancy.com/api/events"
import { func, bool } from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Tags from "react-native-tags"

import Message from '../../../../../Components/Message'
var list
import I18n from '../../../../../I18n/I18n'

const options = {
  title: 'تغيير الصورة الشخصية',

  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

import { Colors } from '../../../../../Theme'



const IS_IOS = Platform.OS === 'ios'
let iconType = IS_IOS ? 'ios' : 'md'
import styles from './styles'
let token;
class AddNewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading1:false,
      loading:false,
      avatarSource2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHI2LXlEqLGvQiJE0JFeXF89MdPlDR9ke1qTRqiOOpsM2s6vQO&s",
        avatarSource1:"",
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
      obj:{},
      fetching:false


    };
  }  
  
  
componentWillMount(){
      fetch(country_api)
        .then((response) => response.json())
        .then((responseJson) => {
           this.setState({
        
            countryList:responseJson
         }, function(){
       
  
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

  
  
  
  formDefinition = {
    initialValues: {
      title: '',
      body: '',
      address: '',
      country_id:'',
      city_id:'', 
      start_date:'',
      end_date:'',
      
      image: null,
      
      
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required(I18n.t('validation.required')),
      body: Yup.string().required(I18n.t('validation.required')),
      address: Yup.string().required(I18n.t('validation.required')),
      country_id: Yup.string().required(I18n.t('validation.required')),
      city_id: Yup.string().required(I18n.t('validation.required')),
      start_date: Yup.string().required(I18n.t('validation.required')),
      end_date: Yup.string().required(I18n.t('validation.required')),
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
        buttonColor={Colors.cerulean}
        containerStyle={styles.backButton}
      />
    )
  }

uploadimg()  {

  
  ImagePicker.showImagePicker(options, (response) => {
  
    
      this.setState({
        avatarSource1:response
      },function(){
      
      })
      

      if (response.didCancel) {
        
      } else if (response.error) {
     
      } else {
        this.setState({
 
          avatarSource2:response.uri 
        })
        
      }
    })
  }
    renderGradient = () => (
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[Colors.deepSkyBlue, Colors.deepSkyBlue]}
          style={styles.gradientHeader}
        />
      )
    
      renderTitle = () => (
        <View style={styles.titleContainer}>
          {this.renderBackButton()}
          <Text style={styles.title}>{I18n.t('AddEvents')}</Text>
        </View>
      )
    
    
_handleSubmit=(values)=>{
  
                    var fdata = new FormData();
                    fdata.append('title',values.title );
                     fdata.append( 'body',values.body)
                     fdata.append( "address",values.address)
                     fdata.append(  "country_id",`${values.country_id}`)
                     fdata.append( "city_id", `${values.city_id}`)
                     fdata.append(  "start_date",values.start_date)
                     fdata.append("end_date",values.end_date)
                
                              if(this.state.avatarSource1 !==""){

                                fdata.append('image', {
                                   uri: this.state.avatarSource1.uri,
                                   type: 'image/jpeg',
                                   name: this.state.avatarSource1.fileName,
                                 })
                              
                              }else{
                                alert("add pic")
                              }
                    var object = {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                        "Authorization": `Bearer ${token}`, 
                      },
                     body:fdata
                    }
                    
 if(!this.state.fetching){
      this.setState({fetching:true})
          console.log(object);
       fetch(api, object) 
        .then((response) =>{
          console.log(response);
          
       
          this.setState({
            loading1:true,
            loading:false
          })
         
          if(response.ok){
            console.log(response);

            this.props.navigation.navigate('Home');
          }
          response.text()
        }
        )
        .then((responseData) => {})
        .catch(function(err) {});
                    }

}
      renderForm = () => {
    
      
        
        return (
          <Formik
            {...this.formDefinition}
              onSubmit={this._handleSubmit}
                render={
                     ({values ,handleSubmit ,submitCount ,setFieldValue ,errors
                   ,touched ,setFieldTouched ,isValid ,isSubmitting }) => (
                       <React.Fragment>
                         <View style={styles.formcontainer}>
                  <TextInput
                       
                       style={styles.inputcontainer}
                       onChangeText={text => setFieldValue("title", text)}
                       onBlur={() => setFieldTouched("title")}
                                 error={
                          touched.title || submitCount > 0
                            ? errors.title
                            : null
                        }

                      
                       value={values.title}
                     placeholder={I18n.t('eventname')}
                     placeholderTextColor={Colors.basic.gray}
               
                    
                   />
                       <Message name='title' />
                       
                              <ScrollView   >
                            <KeyboardAvoidingView >    
                         
                          
    

                              <TextInput
                               onChangeText={text => setFieldValue("body", text)}
                       onBlur={() => setFieldTouched("body")}
                                 error={
                          touched.body || submitCount > 0
                            ? errors.body
                            : null
                        }
                        
                        value={values.body}
                            multiline={true}
                            
                            numberOfLines={4}
                            placeholder={I18n.t("article")}
                            style={styles.textareastyle}placeholderTextColor={Colors.basic.black}
                            underlineColorAndroid='transparent'
                          />
                          <Message name='body' /> 



    
                          <TextInput
                        
                                style={styles.inputcontainer}
                                     onChangeText={text => setFieldValue("address", text)}
                       onBlur={() => setFieldTouched("address")}
                                 error={
                          touched.address || submitCount > 0
                            ? errors.address
                            : null
                        }
                              
                                value={values.address}
                              placeholder={I18n.t('address')}
                              placeholderTextColor={Colors.basic.black}
                        
                             
                            />
                                <Message name='address' />
                
                  <View>
                          
    
    <View>
      <View>
      <TouchableOpacity onPress={()=>
             this.uploadimg()
    }>
                  <Image style={{width:"100%" ,height:300}} source={this.state.avatarSource1 ?{uri:this.state.avatarSource1.uri}: require('../../../../../Images/imgfile2.png')} />

             </TouchableOpacity>
        </View>
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
                                        
                                    buttonColor={Colors.ceruleanopacity}
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
                                        
                                    buttonColor={Colors.ceruleanopacity}
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
    
        
       
    
      
                              </KeyboardAvoidingView>
                              </ScrollView>
                
    
    
                <View style={styles.signupSubmitcontainer}>
                  <View style={{width:120 ,paddingVertical:20}}> 
    
                 
                  <Button
                  
                                  
                    buttonColor={Colors.cerulean}
                    type="secondary"
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    title={I18n.t('addButton')}
                    style={styles.signupSubmit}
                  
                  />
                   </View>
                  </View>
    
               
    
                
    
                </View>

                       </React.Fragment>
                   )}
                   />



         
        )
      }
    

      
  render () {

    return (
      <View style={styles.root}>
            <View style={styles.root}>
      {this.renderGradient()}
        {this.renderTitle()}
        <ScrollView >  
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
  )(AddNewEvent)
  
