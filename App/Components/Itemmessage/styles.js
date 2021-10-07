import { Colors, Fonts, ApplicationStyles } from '../../Theme'

import {Platform ,Dimensions} from "react-native";
const {width}=Dimensions.get('window');
export default {
  root: {
    flex: 1,
    backgroundColor: Colors.offWhite
  },
  content: {
    padding: 20,
    flex: 1
  },
  searchBox:{
    height: 250,
  },
  title: {
    ...Fonts.style.h2,
//    fontWeight: 'bold',
    color: Colors.basic.white,
    textAlign: 'center'
  },
  header: {
    flex: 1,
    marginTop: 25,
    alignItems: 'center'
  },
  gradientHeader: {
    ...ApplicationStyles.gradientHeaderHome,
    height:250
  },
  imgcontaineravator:{
    // margin:5,
    alignItems:"center",
    justifyContent:"center",
  },
  image: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius:25,

  },
  messageContent_sender:{
    flex:1,alignItems:'flex-end',
    // justifyContent:"space-around",
    flexDirection: 'row',
    width:"100%",
    paddingHorizontal:15,
    paddingVertical:7,
    // marginVertical:5,
  },
  messageContentTextcontainer_sender:{
    backgroundColor:'#ff8080',minHeight:60,
    // backgroundColor:Colors.basic.white,
    // borderRadius:10,
    // borderBottomLeftRadius: 10,
 borderBottomRightRadius: 10,
 borderTopLeftRadius: 10,
 borderTopRightRadius: 10,
    // borderColor:"white",
    // borderWidth:0,
     width:width-150,paddingHorizontal:30,paddingVertical:10
    //  paddingHorizontal:30,paddingVertical=10,
  },
  messageContentText_sender:{

color:"white",

textAlign:"right",fontSize:17


  },
  Text_sender:{
    width:'50%',textAlign:'right'
// color:"white"
  },
  messageContent:{
    flex:1,alignItems:'flex-end',
    // justifyContent:"space-around",
    flexDirection: 'row-reverse',
    width:"100%",
    paddingHorizontal:15,
    paddingVertical:7,
    marginVertical:5,
  },
  messageContentTextcontainer:{
    // backgroundColor:Colors.brick,
    backgroundColor:Colors.basic.white,minHeight:60,
    // borderRadius:10,
    borderBottomLeftRadius: 10,
//  borderBottomRightRadius: 10,
 borderTopLeftRadius: 10,
 borderTopRightRadius: 10,
    borderColor:"#ddd",
    borderWidth:1,
     width:width-150,paddingHorizontal:30,paddingVertical:10
    //  paddingHorizontal:30,paddingVertical=10,
  },
  Text:{
    width:'40%',textAlign:'right'
// color:"white"
  },
  messageContentText:{

// color:"white",

textAlign:"right",fontSize:17


  },
  body: {
    marginTop: 25,
    fontFamily: 'frutiger-lt-arabic-65-bold',
  },
}
