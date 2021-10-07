import { ApplicationStyles, Fonts, Colors } from '../../../../../Theme'
import { Dimensions} from "react-native";
const {width}=Dimensions.get("window");

export default {
  root: {
    flex: 1,
    backgroundColor: Colors.offWhite,
   
    position: 'relative',

  },
  gradientHeader: {
    ...ApplicationStyles.gradientHeaderform
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100
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
  AddForm:{
    position: 'absolute',
    width:70,
    height:70,
    bottom:15,
    left:20,
    borderRadius:35,
    backgroundColor:"#48c7f4",
    alignItems:"center",
    justifyContent:"center"

  },
  hashstyle:{
    marginTop:20, 
    borderRadius:25,
    borderWidth:0.5,
    borderColor:Colors.lightGray,

  },
     
  address:{
    marginVertical:15,
      },
  
  inputcontainer:{
  
    backgroundColor:"white",
    marginVertical:10,
    marginHorizontal:5,
    borderRadius:15,
     paddingHorizontal:20, 
    },
    formcontainer:{
      marginHorizontal:20
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
}
