import React, { Component } from 'react'
import { object } from 'prop-types'
import { View, Text, Picker, Alert, Platform, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Keyboard, TextInput } from 'react-native'
import DateTimePicker from "react-native-modal-datetime-picker";
import { Switch } from 'react-native-switch';
import moment from "moment"
import { connect } from 'react-redux'
import LoginActions from '../../../../../Redux/Actions/Auth/Login'
import Button from '../../../../../Components/Controls/Button'
import LinearGradient from 'react-native-linear-gradient'
const country_api = 'https://forums.influancy.com/api/countries';

import RichText from "../../../../../Components/RichText"
import { convertToHtmlString } from "react-native-cn-richtext-editor";



import ImagePicker from 'react-native-image-picker'

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
class AddNewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource2: this.props.navigation.state.params.item.imagePath,
      avatarSource1: null,
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
      status: "",
      countryList: [],
      cityList: [],
      country_id: "",
      city_id: "",
      TagVALUE: '',
      check: false



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
        image,
        status

      })
    },
    initialValues: {
      title: this.props.navigation.state.params.item.title,
      body: this.props.navigation.state.params.item.body,
      address: this.props.navigation.state.params.item.address,

      image: null,
      status: "upcomming",
      country_id: this.props.navigation.state.params.item.country_id,
      city_id: this.props.navigation.state.params.item.city_id,
      start_date: this.props.navigation.state.params.item.start_date,
      end_date: this.props.navigation.state.params.item.end_date,


    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required(I18n.t('validation.required')),
      body: Yup.string().required(I18n.t('validation.required')),
      address: Yup.string().required(I18n.t('validation.required')),
      country_id: Yup.string().required(I18n.t('validation.required')),
      city_id: Yup.string().required(I18n.t('validation.required')),
      status: Yup.string().required(I18n.t('validation.required')),
      start_date: Yup.string().required(I18n.t('validation.required')),
      end_date: Yup.string().required(I18n.t('validation.required')),
      image: Yup.string().required(I18n.t('validation.required')),



    })
  }

  uploadimg() {


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
      <Text style={styles.title}>{I18n.t('EditWorkshop')}</Text>
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
                placeholder={I18n.t('eventname')}
                placeholderTextColor={Colors.basic.black}

                editable={!fetching}
              />
              <Message name='title' />


              <ScrollView   >
                <KeyboardAvoidingView>
                  {/* behavior="padding" enabled */}


                  {/* <TextInput
                    onChangeText={props.handleChange("body")}
                    value={props.values.body}
                    multiline={true}
                    editable={!fetching}
                    numberOfLines={4}
                    placeholder={I18n.t("article")}
                    style={styles.textareastyle}
                    placeholderTextColor={Colors.basic.black}
                    underlineColorAndroid='transparent'
                  />
                  <Message name='body' /> */}



                  <TextInput
                    onChangeText={props.handleChange("body")}
                    value={props.values.body}
                    multiline={true}
                    editable={!fetching}
                    numberOfLines={4}
                    placeholder={I18n.t("article")}
                    style={styles.textareastyle} placeholderTextColor={Colors.basic.black}
                    underlineColorAndroid='transparent'
                  />
                  <Message name='body' />

                  {/* <RichText  
 onValueChanged ={
   (value) => {
     props.values.body=convertToHtmlString(value)
     
    }
  } 
                            // onValueChanged={this.onValueChanged}
                            />  */}



                  <TextInput

                    style={styles.inputcontainer}
                    onChangeText={props.handleChange('address')}
                    value={props.values.address}
                    placeholder={I18n.t('address')}
                    placeholderTextColor={Colors.basic.black}

                    editable={!fetching}
                  />
                  <Message name='address' />

                  <View>


                    <View>
                      <View>
                        <TouchableOpacity onPress={() =>
                          this.uploadimg()
                        }>
                          <Image source={{
                            uri: this.props.navigation.state.params.item.imagePath

                          }}
                            //  style={styles.ImageStyle} 
                            style={{ width: "100%", height: 300 }}

                          />
                        </TouchableOpacity>
                      </View>
                      <View>
                        {this.state.check ?
                          <View>

                            <Picker
                              style={{ width: "100%" }}
                              selectedValue={(this.state && this.state.country_id) || 'a'}
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



                                <Picker.Item label='اختيار المدينة' value='' />

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
                          :

                          <View>



                            <Picker
                              style={{ width: "100%" }}
                              selectedValue={(this.state && this.state.country_id) || 'a'}
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



                                <Picker.Item label='اختيار المدينة' value='' />

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







                        }
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
                        <Text style={{ fontSize: 18, color: Colors.basic.black, alignItems: "center", textAlign: "center" }}>{props.values.end_date}</Text>

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
                        <Text style={{ fontSize: 18, color: Colors.basic.black, alignItems: "center", textAlign: "center" }}>{props.values.start_date}</Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}  >

                    </View>
                    <DateTimePicker



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

                  <View>
                    {/* <Tags
                      editable={!fetching}
                      initialText=""
                      placeholderTextColor={Colors.gray}

                      style={styles.hashstyle}
                      textInputProps={{
                        placeholder: I18n.t('hashtag')
                      }}

                      initialTags={[]}
                      onChangeTags={tags => {

                        props.values.tags = tags
                        props.handleChange("tags")







                      }}
                      onTagPress={(index, tagLabel, event, deleted) =>
                        console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                      }
                      inputContainerStyle={{ backgroundColor: "white" }}

                      renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                        <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
                          <Text style={styles.hashTagText}>{tag}</Text>
                        </TouchableOpacity>
                      )}
                    />
                    <Message name='tags' /> */}



                    <Picker
                      style={{ width: "100%" }}
                      selectedValue={(this.state && this.state.status) || 'a'}
                      onValueChange={(value) => {

                        if (value) {
                          props.values.status = value
                          //console.log(props.values.status)



                        }
                      }
                      }
                      itemStyle={{ color: 'white' }}>





                      <Picker.Item label="upcomming" value="upcomming" />
                      <Picker.Item label="upcomming1" value="upcomming1" />
                    </Picker>
                  </View>


                </KeyboardAvoidingView>
              </ScrollView>



              <View style={styles.signupSubmitcontainer}>
                <View style={{ width: 120, paddingVertical: 20 }}>


                  <Button


                    loading={this.state.loading}
                    // disabled={this.state.loading}                
                    buttonColor={Colors.vividPurple}
                    type="secondary"

                    onPress={() => {
                      this.setState({
                        loading: true
                      })

                      var fdata = new FormData();

                      fdata.append('_method', "PUT");
                      fdata.append('title', props.values.title);
                      fdata.append('body', props.values.body)
                      fdata.append("address", props.values.address)
                      fdata.append("country_id", props.values.country_id)
                      fdata.append("city_id", props.values.city_id)
                      fdata.append("start_date", props.values.start_date)
                      fdata.append("status", props.values.status)


                      fdata.append("end_date", props.values.end_date)
                      try {

                        fdata.append('image', {
                          uri: this.state.avatarSource1.uri,
                          type: 'image/jpeg',
                          name: this.state.avatarSource1.fileName,
                        })
                      }
                      catch{

                      }



                      //console.log(fdata)

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
                      const api = `https://forums.influancy.com/api/workshops/${this.props.navigation.state.params.item.id}`
                      fetch(api, object)
                        .then((response) => {
                          //console.log(response)
                          this.setState({
                            loading1: true,
                            loading: false
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
                    // props.handleSubmit}
                    loading={this.state.loading}
                    disabled={this.state.loading}
                    title={I18n.t('EditButton')}
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
    // //console.log(this.props)
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

AddNewEvent.propTypes = {
  signup: func,
  fetching: bool,
  errors: bool
}

AddNewEvent.defaultProps = {
  signup: () => { },

  fetching: false,
  errors: false
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewEvent)