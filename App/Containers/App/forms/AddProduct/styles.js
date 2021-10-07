import { ApplicationStyles, Fonts, Colors } from '../../../../Theme'
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
    height: 100,
  },
  title: {
    textAlign: 'center',
    color: Colors.basic.white,
    // fontWeight: 'bold',
    ...Fonts.style.h4
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

  formcontainer:{
     marginHorizontal:20,
     textAlign:'right',
     
  },
  inputcontainer:{
   
    height:(width/4)-60,
    marginHorizontal:5,
    marginTop: 25,
    backgroundColor:'red',
    marginVertical:20,
    borderWidth: 0.1,
    borderColor: 'gray',
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 3.84,
    shadowOpacity: 1,
    elevation: 3,
     paddingHorizontal: 3,

    },
   
    saveButton:{
      width:130,
      marginVertical:5,
    },
  
}
