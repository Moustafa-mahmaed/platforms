  import React, { Component ,Fragment} from 'react'
  import I18n from '../../../../../I18n/I18n'

  import DateTimePicker from "react-native-modal-datetime-picker";
import RNRestart from 'react-native-restart';
  import moment from "moment"
  import ImagePicker from 'react-native-image-picker'
  import { connect } from 'react-redux'
  import * as Yup from 'yup'
  import Tags from "react-native-tags"
  let token ,socialkey;
  // import ImagePicker from 'react-native-image-picker'

  //import scrollableTabView , {defaultTabBar ,scrollableTabView}from "react-native-scrollable-tab-view-forked"
  const country_api = 'https://forums.influancy.com/api/countries';



  import { View, StatusBar,Platform,Picker  ,TouchableOpacity, FlatList,Dimensions,Text, Image,ScrollView,Switch ,ImageBackground ,TouchableWithoutFeedback } from 'react-native'
  import { Colors } from '../../../../../Theme'
  import TextInput from '../../../../../Components/Controls/TextInput'

  import Message from '../../../../../Components/Message'


  import { Formik  ,ErrorMessage} from 'formik'

  import Icon from "react-native-vector-icons/FontAwesome"

  import LinearGradient from 'react-native-linear-gradient'

  import Button from '../../../../../Components/Controls/Button'
  // const options={
  //   title: 'Profile Image App',
  //   takePhotoButtonTitle: 'Take a pic with tour camera',
  //   chooseFromLibraryButtonTitle: 'Choose a photo from your library',
  // }

  // var {width}=Dimensions.get("window")
  const IS_IOS = Platform.OS === 'ios'
  let iconType = IS_IOS ? 'ios' : 'md'

  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  var since13 = new Date(year -13, month, day)
  var since100 = new Date(year -100, month, day)
  const options = {
    title: 'تغيير الصورة الشخصية',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };


  // Styles
  import styles from './styles'
  var {width} = Dimensions.get("window");
  class EditProfile extends Component {
    constructor(props){
      super(props)
      this.state={
        
        value1:'',
        avatarSource2: null,
        avatarSource1:null,
        countryList:[],
        cityList:[],
        country_id:'',
        city_id:"",
        switchValue:true,
        switchValue1:false,

        pickerValue:"",
        isDateTimePickerVisible: false,
      datatime1:null,
      chosenDate1:"",
      xvalue1:"",
      day:"",
      month:"",
      year:"",
      gender:"male",
        // true for edit profile
        //false for change password
        tabbarstutus:true,
        countryList:[],
        cityList:[],
          avatarSource: null,

          isLoading: true
        , activetabbarprofile:true,


        activetabbarpassword:false,




      }
    }
    async get_SOCILA_MEDIA() {
      console.log("SOCILA_MEDIA-----------------------")
      let SOCILA_MEDIA = await AsyncStorage.getItem('SOCILA_MEDIA');
      alert(SOCILA_MEDIA)
    }
      componentDidMount (){
        this.get_SOCILA_MEDIA()

    }
                  // console.log( "social:");

  
     
    


    showDateTimePicker = () => {
      this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
      this.setState({ isDateTimePickerVisible: false ,


      });
    };



    formDefinition = {
      onSubmit: values=> {
        this.props.signup({
          
          country_id: values.country_id,
          city_id: values.city_id,
          // day: values.day,
          day: this.state.day,
          // month: values.month,
          month: this.state.month,
          // year:values.year,
          year:this.state.year,
          gender:values.gender,
          image:values.image,
          tags:values.tags,
          name: values.name,
          
          first_name: values.firstName,
          last_name: values.lastName,

        })
      },
      initialValues: {
        country_id: '',
        city_id: '',
        day: '',
        month: '',
        year:'',
        gender: 'male',
        image:'',
        tags:'',
      },
      validationSchema: Yup.object().shape({
        country_id: Yup.string().required(I18n.t('validation.required')),
        city_id: Yup.string().required(I18n.t('validation.required')),
        day: Yup.string().required(I18n.t('validation.required')),
        month: Yup.string().required(I18n.t('validation.required')),
        year: Yup.string().required(I18n.t('validation.required')),
        gender: Yup.string().required(I18n.t('validation.required')),
        image: Yup.string().required(I18n.t('validation.required')),
        tags: Yup.string().required(I18n.t('validation.required')),
  name: Yup.string().required(I18n.t('validation.required')),
   
        firstName: Yup.string().required(I18n.t('validation.required')),
        lastName: Yup.string().required(I18n.t('validation.required')),
         


      })
    }

    componentWillMount(){

      return fetch(country_api)
        .then((response) => response.json())
        .then((responseJson) => {

          this.setState({
            isLoading: false,
            countryList: responseJson,
          }, function(){

            //console.log(this.state.countryList)
          });

        })
        .catch((error) =>{
          // console.error(error);
        });
    }

    renderGradient = () => (
      <Fragment>
          <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['#F5F5F5', '#F5F5F5']}
          style={styles.gradientHeader}
        />

      </Fragment>
    )


  uploadimg()  {


  ImagePicker.showImagePicker(options, (response) => {
    //console.log('Response = ', response);

      this.setState({
        avatarSource1:response
      },function(){
        //console.log(this.state.avatarSource1);
      })


      if (response.didCancel) {
        //console.log('User cancelled image picker');
      } else if (response.error) {
        //console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({
          // avatarSource1:response ,
          avatarSource2:response.uri
        })

      }
    })
  }

    renderForm = () => {
    //  //console.log(this.state.countryList)
      const { fetching, errors } = this.props
      return (
        <Formik
          {...this.formDefinition}
          render={props => {
            return (
              <View style={styles.container}>
                <View>
                <View>
                { this.get_SOCILA_MEDIA() !== null ? 
                
               
                
               <View>
               <TextInput
                  onChangeText={props.handleChange('name')}
                  value={props.values.name}
                  placeholder={I18n.t('username')}
                  editable={!fetching}
                  style={styles.firstInput}
                />

                <Message name='name' />

               

                <TextInput
                  onChangeText={props.handleChange('firstName')}
                  value={props.values.firstName}
                  placeholder={I18n.t('firstName')}
                  editable={!fetching}
                />

                <Message name='firstName' />

                <TextInput
                  onChangeText={props.handleChange('lastName')}
                  value={props.values.lastName}
                  placeholder={I18n.t('lastName')}
                  editable={!fetching}
                  style={styles.firstInput}
                />

                <Message name='lastName' />

               </View>
               :
               null
                }

          <View>


            <Picker

                  style={{
                    width: "100%",
                  }}
                    selectedValue={(this.state && this.state.country_id) || 'a'}
                  // selectedValue={(this.state && '4') || 'a'}

                  onValueChange={(value,key ) => {
                   
                    if (value) {
                    
                      props.values.country_id=key
                      //console.log(props.values.country_id)
                      this.setState({country_id:value,value1:key

                      },function(){
                        ////console.log(this.state.country_id[0]+ this.state.country_id[1])

                        if(this.state.country_id!=null&&this.state.country_id!='')
                  fetch(`https://forums.influancy.com/api/cities?code=${this.state.country_id}`)
                  .then((response) => response.json())
                  .then((responseJson) => {
                    //console.log(responseJson)

                    this.setState({
                    //   isLoading: false,
                      cityList:responseJson
                  }, function(){
                    //console.log(this.state.cityList)

                    });


                  })
                  .catch((error) =>{
                   // console.error(error);
                  });
                      });
                    }







                  //  //console.log(this.state.pickerValue)
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
                  props.values.city_id=value
                  //console.log(props.values.city_id)

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

  <View  style={{flexDirection:"column" ,alignItems:"center",justifyContent:"center",width:"100%"}}>
  <View style={{width:"50%" ,justifyContent:"center" }}>

                                <Button style={{width:80,margin:10}}
                                buttonColor={Colors.profilecoloropacity}
                                icon={require('../../../../../Images/Icons/events.png')}

                                type="secondary"
                                title={I18n.t('birthday')} onPress={()=>{

                                  this.setState({


                                    isDateTimePickerVisible: true,

                                  })

                                }
                              }
                              />
                              </View>
  <Text style={{fontSize:18,color:Colors.basic.black , alignItems:"center", textAlign:"center"}}>{this.state.chosenDate1}</Text>
  <DateTimePicker
  minimumDate={ new Date(since100) }
    maximumDate={new Date(since13) }

          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={(data)=>{



              props.values.start_date=data
              moment.locale('en')
            //   //console.log(props.values.start_date)
              this.setState({
                chosenDate1:moment(data).format('MMM Do YYYY HH:mm'),
                day:moment(data).format('D'),
                month:moment(data).format('M'),
                year:moment(data).format('Y'),


              },function() {
                //console.log(`day ${this.state.day} -month ${this.state.month} -year ${this.state.year}`)
              })



            this.hideDateTimePicker();

          }

        }
          onCancel={this.hideDateTimePicker}

          value={props.values.end_date }
          onChangeText={props.handleChange('end_date')}


          datePickerModeAndroid={"spinner"}

        />
                              </View>






                <View style={styles.statusstyle}>
                  <Text style={styles.stutus}>الجنس</Text>
                  <View style={styles.Switchstyle}>

                <Switch

            value = {!this.state.switchValue}
            trackColor={{ true: '#e81b23', false: Platform.OS=='android'?'#ffffff':'#ffffff'  }}


    thumbColor={[Platform.OS=='ios'?'#FFFFFF':(this.state.switchValue ?'#fff':'#fff')]}

    style={[this.state.switchValue ?styles.switchEnableBorder:styles.switchDisableBorder]}

          onValueChange = {()=>{

            this.setState({
              switchValue:!this.state.switchValue,
              gender:"female"


            },function () {

              //console.log(this.state.gender)
              props.values.gender=this.state.gender

            }
            )
          }}
        />
          <Text>انثى</Text>
                  <Switch

            value = {this.state.switchValue}
          trackColor={{ true: '#e81b23', false: Platform.OS=='android'?'#ffffff':'#ffffff'  }}


  thumbColor={[Platform.OS=='ios'?'#FFFFFF':(this.state.switchValue ?'#fff':'#fff')]}

  style={[this.state.switchValue ?styles.switchEnableBorder:styles.switchDisableBorder]}
          onValueChange = {()=>{



            this.setState({
              switchValue:!this.state.switchValue,
              gender:"male"

            },function () {

              //console.log(this.state.gender)
              props.values.gender=this.state.gender
            }
            )
          }}
          />
          <Text>ذكر</Text>

                  </View>

                </View>






                <View>
                <Tags
                        editable={!fetching}
                            initialText=""
                            placeholderTextColor={Colors.gray}

                            style={styles.hashstyle}
                            textInputProps={{
                              placeholder: I18n.t('hashtag')
                            }}

                            initialTags={[]}
                            onChangeTags={tags => {

                              props.values.tags=tags
                              props.handleChange("tags")

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


    <View>
                <Button
                  buttonColor={Colors.profilecolor}


                  type="secondary"
                  // onPress={props.handleSubmit}
                  onPress={()=>{


              var fdata = new FormData();


                fdata.append('country_id',`${props.values.country_id}` );
                fdata.append( 'city_id',`${props.values.city_id}`)
                fdata.append( "day",this.state.day)
              fdata.append(  "month",this.state.month)
                fdata.append( "year",this.state.year)
              fdata.append(  "gender", props.values.gender)
              //fdata.append("tags",  props.values.tags)
              fdata.append("tags","dd")
              if(this.get_SOCILA_MEDIA() !=="") {
                 fdata.append("name",`${props.values.name}`)
                  fdata.append("first_name",`${props.values.first_name}`)
                   fdata.append("last_name",`${props.values.last_name}`)
                  
              } 

                if(this.state.avatarSource1 !== null){

                  fdata.append('image', {
                    uri: this.state.avatarSource1.uri,
                    type: 'image/jpeg',
                    name: this.state.avatarSource1.fileName,
                  })
                }else{

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

              let url="https://forums.influancy.com/api/profiles"
  if(this.state.avatarSource1 !== null){
  //console.log(object)

  fetch(url, object)
  .then((response) =>{
  //console.log(object)

    //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    //console.log(response)
    //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!")


    if(response.ok){
      //console.log("done")




        // this.props.navigation.navigate("Search")
      RNRestart.Restart();

        // this.props.navigation.push('Loading')
       
    }
    response.text()

  }
  )
  .then((responseData) => {})
  .catch(function(err) {});

              }

            else{
              alert("upload img")
            }
          }}
            // loading={fetching}
                  // disabled={fetching}
                  title={I18n.t('save')}


                  />
                  </View>
                  </View>



                </View>



            )
          }}
        />
      )
    }



    render () {


      return (

      <View style={styles.root}>
        <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={({id}, index) => id}
        />
      </View>
        <ScrollView >
          <View style={{paddingHorizontal:20}}>

          <StatusBar barStyle='dark-content' />
          {this.renderGradient()}
        <View style={styles.containeravator}>




            <Image style={styles.ImageStyle} source={this.state.avatarSource1 ?{uri:this.state.avatarSource1.uri}: require('../../../../../Images/avator.png')} />



        <View style={styles.icon}>
        <TouchableOpacity onPress={()=>
        this.uploadimg()


  }>
        <Icon  style={styles.icon_style} name="camera" size={25} color="white" />
        </TouchableOpacity>
        </View>

        </View>
        <View style={styles.formstyle}>
          <View style={styles.tabbarstutusStyle}>


            <Text   style={[styles.editprofilestyle,this.state.activetabbarprofile?styles.activetabbar:styles.unactivetabbar]}>
            استكمال البيانات
            </Text>


          </View>
          <View>
            {this.state.activetabbarprofile?this.renderForm():this.renderFormeditpassword() }
          </View>



        </View>

        </View>
        </ScrollView>


        </View>
      )
    }
  }
  const mapStateToProps = (state, ownProps) => {

    token=state.login.token



      return {

        fetching: state.signup.fetching,
        errors: state.signup.errors
      }
    }

  const mapDispatchToProps = dispatch => ({
    signup: (




    ) =>
      dispatch(
        SignupActions.FormRequest(title,options0,options1,options2)
      )
  })



  EditProfile.defaultProps = {
    signup: () => {},

    fetching: false,
    errors: false
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditProfile)


