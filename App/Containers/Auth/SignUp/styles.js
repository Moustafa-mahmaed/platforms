import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../../Theme'

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.offWhite
  },
  container: {
    marginHorizontal: Metrics.mainContainerMarginHorizontal,
    marginBottom: Metrics.mainContainerMarginBottom
  },
  logo: {
    // marginTop: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    width:'100%',
    height:150
  },
  title: {
    ...Fonts.style.h4,
    fontWeight: 'bold',
    color: Colors.gunmetal,
    textAlign: 'center',
    marginVertical: 30
    // top: -35
  },
  firstInput: {
    marginTop: 10
  },
  signupSubmit: {
    marginTop: 20,
    marginBottom: 20
  },
  margin: {
    marginTop: 20
  },
  iconLeft: {
    marginRight: 20
  },
  iconRight: {
    marginLeft: 20
  }
})
