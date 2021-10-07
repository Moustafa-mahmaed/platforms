  import { Platform ,Dimensions } from 'react-native'
  import { Colors } from '../../../Theme'

  const {width}=Dimensions.get("window");

  const IS_IOS = Platform.OS === 'ios'

  export default {
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.basic.white,
      height: 45,
      borderRadius: 25  ,
      paddingHorizontal: 20,
      fontWeight: 'bold',
      
      //Shadow Styles
      shadowColor: Colors.shadow,
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowRadius: 2,
      shadowOpacity: 1,
      elevation: 2
    },
    input: {
      flex: 1,
      textAlign: IS_IOS ? 'right' : 'left'
    },
    icon: {
      resizeMode: 'contain',
      height: 14,
      width: 14,
      marginLeft: 15
    },
    error: {
      borderWidth: 1,
      borderColor: Colors.error
    },
    textError: {
      color: Colors.error
    },
    
    textArea: {
      height: 450,
      
    },
    autoTags:{
      backgroundColor:"white" 
     ,
      borderRadius:24,
      height: 50,
      width:width -10 ,
      // paddingHorizontal: 20,
      // borderRadius: 40,

      // paddingHorizontal: 30,
       marginHorizontal:-30,
       
    },

  }
