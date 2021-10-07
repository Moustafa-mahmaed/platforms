import { ApplicationStyles, Fonts, Colors } from '../../../../../Theme'
import {Dimensions} from "react-native";
import colors from '../../../../../Theme/Colors';
const {width} =Dimensions.get("window");

export default {
  root: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    // paddingHorizontal: 20
  },
  gradientHeader: {
    ...ApplicationStyles.gradientHeader,
    height: 40
  },
  backButton: {
    position: 'absolute',
    top: 85
  },
  backButtonIcon: {
    left: 30,
    top: 0
  },
  containeravator:{
    flex:1,
    paddingTop:20,
    //flexDirection:"row",
   // justifyContent:"center",
    alignItems :"center"
    ,position:"relative"
  },
  ImageStyle:{
    width:width/3,
    height:width/3,
    borderRadius:width/6,
    opacity: .8 

  },
  stutus:{
    paddingLeft:10
  },
  icon:{
    position:"absolute",
    top:width/3 -20,
    left:width/3 +60,
    borderRadius:2,
    zIndex:1,
     backgroundColor:Colors.profilecolor
     ,width:40,
     height:40
     
    
    ,bordercolor:"red",
    borderRadius:20,
    borderwidth:2
    ,alignItems:"center",
    justifyContent:"center"

  },
  icon_style:{
    zIndex:2,
  },
  formstyle:{

    paddingTop:2
  },
  statusstyle:{
    borderWidth: 1.5,
    borderColor: '#d6d7da',
    paddingHorizontal:3,
    paddingVertical:3

  },
  Switchstyle:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  },
  switchEnableBorder: {
    borderColor: 'green',
    borderWidth: 1},
    
    switchDisableBorder: {
    borderColor: 'blue',
    borderWidth: 1,  },
    birthday:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-around",
     
      paddingVertical:12,
      paddingBottom:18,

      marginLeft:40
      
    },
    // birthdayContainer:{
    //   flexDirection:"row",
      
    // },
    year:{
      marginLeft:5
      
    },
    month:{
      marginLeft:5
    },
    day:{
      marginLeft:5      

    },
    tabbarstutusStyle:{
      flexDirection:"row",
      justifyContent:"space-around",
      alignItems:"center",
      marginVertical:15
    },
    editprofilestyle:{
      fontSize:22,
      fontWeight: 'bold',
      marginLeft:7



      
    },
    changepasswordstyle:{
      fontSize:22,
      fontWeight: 'bold',
      marginLeft:7

    },
    activetabbar:{
      color:colors.basic.black,
      borderBottomColor: 'red',
      borderBottomWidth: 2,
    },
    unactivetabbar:{
      color:colors.gray,
      
      

    },
    hashTagText:{
      backgroundColor:Colors.lightGray, 
      color:Colors.basic.black,
       borderRadius:20,
       marginHorizontal:3,
       paddingHorizontal:1,
       fontSize:18,
       paddingRight: 5,
       paddingLeft: 5,
       paddingTop: 3,
       paddingBottom: 3,
      },
    container:{
      marginVertical:10
    }
}