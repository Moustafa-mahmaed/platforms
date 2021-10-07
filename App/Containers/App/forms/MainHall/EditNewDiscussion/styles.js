import { ApplicationStyles, Fonts, Colors } from '../../../../../Theme'
import {Dimensions} from "react-native";
const {width}=Dimensions.get("window");
export default {
  root: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  
    position: 'relative',

  },
  gradientHeader: {
    ...ApplicationStyles.gradientHeaderform,
   },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: (width/2)-100,
    
  },
  title: {
    textAlign: 'center',
    color: Colors.basic.white,
    // fontWeight: 'bold',
    ...Fonts.style.h4
  },
  filterButton: {
    marginVertical: 20
  },
  body: {
    flex: 9
  },
  fetching: {
    backgroundColor: Colors.basic.white,
    borderRadius: 15,
    padding: 20
  },
  backButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backButtonIcon: {
    left: 10,
    top: 10
  },
  // textArea: {
  //   height: (width)-100,
  //   backgroundColor:"white",
  //   marginHorizontal:5,
  //   borderRadius:20,
  // },
 
  address:{
    marginVertical:15,
      },
      
  formcontainer:{
     marginHorizontal:20,
     marginVertical:20,
  },
 inputcontainer:{
    // height:(width/2),
      paddingHorizontal:20,

    marginVertical:10,
    marginHorizontal:5,
    borderRadius:15,
    },
    saveButton:{    
   marginVertical:5,
   paddingRight: 20 ,
   paddingLeft: 10 ,
   paddingHorizontal: 12,
   backgroundColor:"red",
   textAlign:"left"
   
    },

    signupSubmitcontainer:{
      width:(width/2)-85,
      marginVertical:5,
      position:'relative',
      paddingRight: 10 ,
      paddingLeft: 10 ,
    
      
    },
 
    hashstyle:{
      marginTop:20, 
      borderRadius:25,
      borderWidth:0.5,
      borderColor:Colors.lightGray,

    },
    textareastyle:{
      alignItems:"flex-start",
      justifyContent:"flex-start",
      textAlignVertical: 'top',
      color:Colors.basic.black,
      height: (width)-100,
      backgroundColor:"white",
      marginHorizontal:5,
      borderRadius:20,
      paddingHorizontal:20
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
      addIcon:{
       position:"absolute",
       bottom:17, 
       left:77,
       elevation:6,
       paddingLeft: 5,
      }
  
}
