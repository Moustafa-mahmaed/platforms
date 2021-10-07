import { Platform } from 'react-native'
import { Colors } from '../../../Theme'

const IS_IOS = Platform.OS === 'ios'

export default {
  container: {

    
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.basic.white,
    height: 45,
    borderRadius: 20,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    // Shadow
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    elevation: 5
  },
  input: {
    flex: 1,
    textAlign: IS_IOS ? 'right' : 'left',
    textAlign:'right',
    

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
  }
}
