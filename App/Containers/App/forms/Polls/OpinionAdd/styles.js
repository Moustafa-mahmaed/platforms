import { ApplicationStyles, Fonts, Colors } from '../../../../../Theme'
import {Platform, Dimensions} from "react-native";
// import colors from './../../../../Theme/Colors';
import colors from '../../../../../Theme/Colors';
  const {width}=Dimensions.get("window");
  const IS_IOS = Platform.OS === 'ios'
 
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
    height: 100,
    
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
    backgroundColor:"#48C7F4",
    alignItems:"center",
    justifyContent:"center"
  },
  firstInput:{
    backgroundColor:"red"
  },
  formcontainer:{
     marginHorizontal:20,
     textAlign:'right',
     
  },
  inputcontainer:{
     flex: 1,
    height:45,
    marginHorizontal:5,
    marginTop: 25,
    backgroundColor:'white',
    marginVertical:5,
    borderWidth: 0.1,
    borderColor: 'gray',
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 3.84,
    shadowOpacity: 1,
    elevation: 2,
     paddingHorizontal: 3,
    },
    iconwithinput:{
      position:"absolute",
     left:20,
     top:33,
     elevation: 5,
     },
    addButton:{
      width:130,
      marginVertical:40,
      textAlign:'left',
    },
    addIcon:{
      backgroundColor:Colors.purble,
      width:30,
      marginHorizontal: 90,
    },
    saveButton:{
      width:130,
      marginVertical:5,
bottom:50    
    },
    textareastyle:{
      alignItems:"flex-start",
      justifyContent:"flex-start"
    },  
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical:25,
    },
    formView: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      paddingBottom: 8,
    },
    inputForm: {
      backgroundColor: 'white',
      width: 320,
      height: 40,
      padding: 8,
      marginBottom: 8,
    },
    todoItem: {
      alignItems: 'center',
      padding: 8,
      width: 320,
      borderBottomWidth: 1.5,
      borderColor: '#E0E0E0',
      backgroundColor: '#fff',
      // border: 1,
      flex: 1,
      flexDirection: 'row',
    },
    todoText: {
      flex: 1,
    },
    add_Icon:{
      marginHorizontal: 60,
      zIndex:3,
    }
}