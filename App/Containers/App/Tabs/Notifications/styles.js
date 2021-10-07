import { Colors, Fonts, ApplicationStyles } from '../../../../Theme'

import {Platform ,Dimensions} from "react-native";
const {width}=Dimensions.get('window');
export default {
  root: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    
  },
  content: {
    padding: 20,
    flex: 1
  },
  fetching: {
    backgroundColor: Colors.basic.white,
    borderRadius: 15,
    padding: 20
  },
  searchBox:{
    height: 250,
  },
  title: {
    ...Fonts.style.h2,
//    fontWeight: 'bold',
    color: Colors.basic.white,
    textAlign: 'center',
   
  },
  header: {
     ...Fonts.style.h2,
//    fontWeight: 'bold',
    color: Colors.basic.white,
    textAlign: 'center',
    marginTop:10,

  },
  gradientHeader: {
    ...ApplicationStyles.gradientHeaderHome,
    height:250
  },
  imgcontaineravator:{
    marginHorizonal:5,
    alignItems:"center",
    justifyContent:"center"
  },
  image: {
    marginLeft: 5,
    height: 60,
    width: 60,
    borderRadius:30,

  },
  messageContent:{
    justifyContent:"flex-start",
    flexDirection: 'row-reverse',
    
    paddingHorizontal:7,
    paddingVertical:7

  },
  messageContentText:{
marginHorizonal:10,
color:"white",
backgroundColor:Colors.brick,
borderRadius:10,
borderWidth:1,
width:width-width/3,
textAlign:"center"


  },
  body: {
    marginTop: 25,
    fontFamily: 'frutiger-lt-arabic-65-bold',
  },
}
