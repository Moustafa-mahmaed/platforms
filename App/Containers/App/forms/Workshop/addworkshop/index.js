

import React, { Component } from 'react'
import { object } from 'prop-types'
import { View, Text, Picker, Platform, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Keyboard, TextInput } from 'react-native'
import DateTimePicker from "react-native-modal-datetime-picker";
import { Switch } from 'react-native-switch';
import moment from "moment"
import { connect } from 'react-redux'
import LoginActions from '../../../../../Redux/Actions/Auth/Login'
import Button from '../../../../../Components/Controls/Button'
import LinearGradient from 'react-native-linear-gradient'
const country_api = 'https://forums.influancy.com//api/countries';

import RichText from "../../../../../Components/RichText"
import { convertToHtmlString } from "react-native-cn-richtext-editor";




import ImagePicker from 'react-native-image-picker'

const api = "https://forums.influancy.com/api/workshops"
import { func, bool } from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Tags from "react-native-tags"

import Message from '../../../../../Components/Message'
var list
import I18n from '../../../../../I18n/I18n'

const options = {
  title: 'تغيير الصورة الشخصية',
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
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
class AddNewWorkShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading1: false,
      avatarSource2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHI2LXlEqLGvQiJE0JFeXF89MdPlDR9ke1qTRqiOOpsM2s6vQO&s",
      avatarSource1: "",
      switchValue: true,
      pickerValue: "",
      pickerValue1: "",
      isDateTimePickerVisible: false,
      datatime1: null,
      xvalue: "",
      xvalue1: "end_date",
      chosenDate1: "",
      chosenDate2: "",
      switchvalue: false,
      countryList: [],
      cityList: [],
      country_id: "",
      city_id: "",
      TagVALUE: '',
      obj: {}


    };
  }


  componentWillMount() {
    fetch(country_api)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          //   isLoading: false,
          countryList: responseJson
        }, function () {
          // //console.log(this.state.countryList)

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: false,


    });
  };




  formDefinition = {
    onSubmit: ({ title, body, tags }) => {
      this.props.signup({
        title,
        body,
        address,
        country_id,
        city_id,
        start_date,
        end_date,
        image

      })
    },
    initialValues: {
      title: '',
      body: '',
      address: '',
      country_id: '',
      city_id: '',
      start_date: '',
      end_date: '',

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


  renderGradient = () => (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[Colors.vividPurple, Colors.vividPurple]}
      style={styles.gradientHeader}
    />
  )

  renderTitle = () => (
    <View style={styles.titleContainer}>
      {this.renderBackButton()}
      <Text style={styles.title}>{I18n.t('AddWorkshop')}</Text>
    </View>
  )
  renderForm = () => {

    // //console.log(this.props)
    const { fetching, errors } = this.props
    return (
      <Formik
        {...this.formDefinition}
        render={props => {
          return (
            <View style={styles.formcontainer}>

              <TextInput

                style={styles.inputcontainer}
                onChangeText={props.handleChange('title')}
                value={props.values.title}
                placeholder={I18n.t('WorkshopName')}
                placeholderTextColor={Colors.gray}

                editable={!fetching}
              />
              <Message name='title' />

              <ScrollView   >
                <KeyboardAvoidingView >
                  {/* behavior="padding" enabled */}


                  <TextInput
                    onChangeText={props.handleChange("body")}
                    value={props.values.body}
                    multiline={true}
                    editable={!fetching}
                    numberOfLines={4}
                    placeholder={I18n.t("article")}
                    style={styles.textareastyle} placeholderTextColor={Colors.gray}
                    underlineColorAndroid='transparent'
                  />
                  <Message name='body' />

                  {/* 
<RichText  
 onValueChanged ={
   (value) => {
     props.values.body=convertToHtmlString(value)
     
    }
  } 
                             /> 
                      */}

                  <TextInput

                    style={styles.inputcontainer}
                    onChangeText={props.handleChange('address')}
                    value={props.values.address}
                    placeholder={I18n.t('address')}
                    placeholderTextColor={Colors.gray}

                    editable={!fetching}
                  />
                  <Message name='address' />

                  <View>


                    <View>
                      <View>
                        <TouchableOpacity onPress={
                          () => {
                            ImagePicker.showImagePicker(options, (response) => {
                              //console.log('Response = ', response);

                              this.setState({
                                avatarSource1: response
                              }, function () {
                                //console.log(this.state.avatarSource1);
                              })


                              if (response.didCancel) {
                                //console.log('User cancelled image picker');
                              } else if (response.error) {
                                //console.log('ImagePicker Error: ', response.error);
                              } else {
                                this.setState({
                                  // avatarSource1:response ,
                                  avatarSource2: response.uri
                                })

                              }
                            });
                          }


                        }>
                          <Image
                            source={this.state.avatarSource1 ? { uri: this.state.avatarSource1.uri } : require('../../../../../Images/imgfile2.png')}
                            //  _ionicons_svg_md-images@2x.png
                            //  style={styles.ImageStyle} 
                            style={{ width: "100%", height: 200 }}

                          />
                        </TouchableOpacity>
                      </View>
                      <View>

                        <View>

                          <Picker

                            style={{
                              width: "100%",
                            }}
                            selectedValue={(this.state && this.state.country_id) || 'a'}
                            // selectedValue={(this.state && '4') || 'a'}

                            onValueChange={(value, key) => {

                              if (value) {

                                props.values.country_id = key
                                //console.log(props.values.country_id)
                                this.setState({
                                  country_id: value, value1: key

                                }, function () {
                                  ////console.log(this.state.country_id[0]+ this.state.country_id[1])

                                  if (this.state.country_id != null && this.state.country_id != '')
                                    fetch(`https://forums.influancy.com/api/cities?code=${this.state.country_id}`)
                                      .then((response) => response.json())
                                      .then((responseJson) => {
                                        //console.log(responseJson)

                                        this.setState({
                                          //   isLoading: false,
                                          cityList: responseJson
                                        }, function () {
                                          //console.log(this.state.cityList)

                                        });


                                      })
                                      .catch((error) => {
                                        console.error(error);
                                      });
                                });
                              }

                              //  //console.log(this.state.pickerValue)
                            }} itemStyle={{ color: 'white' }}>




                            <Picker.Item label='اختار البلد' value={[]} />

                            {this.state.countryList.map((data) => {
                              return (
                                <Picker.Item key={data.id} label={data.name} value={data.code}

                                />
                              )
                            })

                            }
                          </Picker>


                          {this.state.country_id !== "" ?
                            <Picker
                              style={{
                                width: "100%",
                              }}
                              selectedValue={(this.state && this.state.city_id) || 'a'}

                              onValueChange={(value) => {
                                if (value !== 0) {
                                  props.values.city_id = value
                                  //console.log(props.values.city_id)

                                  this.setState({ city_id: value }, function () {


                                  });
                                }
                              }
                              }
                              itemStyle={{ color: 'white' }}>



                              <Picker.Item label='اختيار المدينه' value='' />

                              {this.state.cityList.map((data) => {
                                return (
                                  <Picker.Item key={data.id} label={data.name} value={data.id} />

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


                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                      <View style={{ flexDirection: "column", justifyContent: "space-around", width: "50%" }}>

                        <Button style={{ width: 80, margin: 10 }}
                          icon={require('../../../../../Images/Icons/events.png')}

                          buttonColor={Colors.vividPurpleopacity}
                          type="secondary"
                          title={I18n.t('end_data')} onPress={() => {
                            this.setState({


                              xvalue1: "end_date",
                              isDateTimePickerVisible: true

                            })
                            //console.log(this.state.xvalue1)


                          }
                          }
                        />
                        <Text style={{ fontSize: 18, color: Colors.basic.black, alignItems: "center", textAlign: "center" }}>{this.state.chosenDate2}</Text>

                      </View>
                      <View style={{ flexDirection: "column", justifyContent: "space-around", width: "50%" }}>

                        <Button style={{ width: 80, margin: 10 }}
                          icon={require('../../../../../Images/Icons/events.png')}

                          buttonColor={Colors.vividPurpleopacity}
                          type="secondary"
                          title={I18n.t('start_data')} onPress={() => {

                            this.setState({

                              xvalue1: "start_date",
                              isDateTimePickerVisible: true,

                            })
                            //console.log(this.state.xvalue1)
                          }
                          }
                        />
                        <Text style={{ fontSize: 18, color: Colors.basic.black, alignItems: "center", textAlign: "center" }}>{this.state.chosenDate1}</Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

                    </View>
                    <DateTimePicker

                      is24Hour={false}

                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={(data) => {

                        if (this.state.xvalue1 == "start_date") {
                          data = moment(data).locale("en")
                          props.values.start_date = moment(data).format('YYYY-M-D HH:mm:ss')
                          //console.log(props.values.start_date)
                          this.setState({
                            chosenDate1: props.values.start_date
                          })
                          //console.log(this.state.chosenDate1)
                        }
                        else if (this.state.xvalue1 == "end_date") {
                          data = moment(data).locale("en")
                          props.values.end_date = moment(data).format('YYYY-M-D HH:mm:ss')

                          //console.log(props.values.end_date)
                          this.setState({
                            chosenDate2: props.values.end_date
                          })


                        }

                        this.hideDateTimePicker();

                      }

                      }
                      onCancel={this.hideDateTimePicker}

                      value={props.values.end_date}
                      onChangeText={props.handleChange('end_date')}
                      mode={"datetime"}
                      // display="spinner"
                      datePickerModeAndroid={"spinner"}
                      minimumDate={new Date()}


                    />




                  </View>


                </KeyboardAvoidingView>
              </ScrollView>



              <View style={styles.signupSubmitcontainer}>
                <View style={{ width: 120, paddingVertical: 20 }}>


                  <Button
                    loading={this.state.fetching}
                    disabled={this.state.fetching}
                    buttonColor={Colors.vividPurple}
                    type="secondary"

                    onPress={() => {

                      var fdata = new FormData();
                      fdata.append('title', props.values.title);
                      fdata.append('body', props.values.body)
                      fdata.append("address", props.values.address)
                      fdata.append("country_id", props.values.country_id)
                      fdata.append("city_id", props.values.city_id)
                      fdata.append("start_date", props.values.start_date)
                      fdata.append("end_date", props.values.end_date)
                      fdata.append('image', {
                        uri: this.state.avatarSource1.uri,
                        type: 'image/jpeg',
                        name: this.state.avatarSource1.fileName,
                      })
                      //console.log( " result"+fdata);

                      var object = {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'multipart/form-data',
                          "Authorization": `Bearer ${token}`,
                        },
                        body: fdata
                      }
                      //console.log(object)
                      if (!this.state.fetching) {
                        this.setState({ fetching: true })
                        fetch(api, object)
                          .then((response) => {
                            //console.log(response)
                            this.setState({
                              loading1: true
                            }, function () {
                              //console.log(this.state.loading1)
                            })

                            if (response.ok) {

                              this.props.navigation.navigate('Home');
                            }
                            response.text()

                          }
                          )
                          .then((responseData) => { })
                          .catch(function (err) { });
                      }

                    }
                    }
                    // props.handleSubmit}

                    title={I18n.t('addButton')}
                    style={styles.signupSubmit}

                  />
                </View>
              </View>





            </View>
          )
        }}
      />
    )
  }



  render() {

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

  token = state.login.token



  return {

    fetching: state.signup.fetching,
    errors: state.signup.errors
  }
}

const mapDispatchToProps = dispatch => ({
  signup: (
    title,
    options0,
    options1,
    options2


  ) =>
    dispatch(
      SignupActions.FormRequest(title, options0, options1, options2)
    )
})

AddNewWorkShop.propTypes = {
  signup: func,
  fetching: bool,
  errors: bool
}

AddNewWorkShop.defaultProps = {
  signup: () => { },

  fetching: false,
  errors: false
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewWorkShop)





