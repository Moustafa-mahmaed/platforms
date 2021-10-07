import React, { Component } from 'react'
import { object } from 'prop-types'
import { View, Text ,Picker,Alert, Platform ,
  TouchableOpacity,ScrollView,KeyboardAvoidingView,Keyboard,TextInput,
Image
} from 'react-native'
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
class AddNewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading1:false,
      loading:false,
     fetching:false,
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
          // console.error(error);
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
      tags: '',
      country_id:'',
      city_id:'', 
      start_date:'',
      end_date:'',
      payment: '',
      members: '22'
      
     
      
      
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
      <Text style={styles.title}>{I18n.t('Addnewproject')}</Text>
    </View>
  )

  _handleSubmit=(values)=>{
    var fdata = new FormData();
    fdata.append('title',values.title );
     fdata.append( 'body',values.body)
     fdata.append( "tags","new")
     fdata.append(  "country_id",`${values.country_id}`)
     fdata.append( "city_id", `${values.city_id}`)
     fdata.append(  "start_date",values.start_date)
     fdata.append("end_date",values.end_date)
     fdata.append("payment",values.payment)
        
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
fetch(api, object) 
.then((response) =>{

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

}
 

  

  
  renderForm = () => {
    return (
      <Formik
        {...this.formDefinition}
          onSubmit={this._handleSubmit}
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
                        placeholder={I18n.t('address')}
                        placeholderTextColor={Colors.gray}
                      error={
                       touched.title || submitCount > 0
                         ? errors.title
                          : null
                      }
                        />
                            <Message name='title' />
                            
                          <ScrollView   >
                        <KeyboardAvoidingView >    
                     
                      <TextInput
                        onChangeText={text => setFieldValue("body", text)}
                        onBlur={() => setFieldTouched("body")}
                          value={values.body}
                        multiline={true}
                        numberOfLines={4}
                        placeholder={I18n.t("article")}
                        style={styles.textareastyle}placeholderTextColor={Colors.gray}
                        underlineColorAndroid='transparent'
                             error={
                      touched.body || submitCount > 0
                        ? errors.body
                        : null
                    }
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
          // display="spinner"
           datePickerModeAndroid={"spinner"}
           minimumDate={new Date() }
           
          
        /> 
        



                                </View>

    
   

  
                          </KeyboardAvoidingView>
                          </ScrollView>
            
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

            <View style={styles.signupSubmitcontainer}>
              <View style={{width:120 ,paddingVertical:20}}> 

              <Button
                buttonColor={Colors.cerise}      
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
  )(AddNewProject)
  
  




