import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../../Theme'
import { ApplicationStyles } from '../../../Theme'


export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.offWhite
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
  container: {
    marginHorizontal: Metrics.mainContainerMarginHorizontal,
    marginBottom: Metrics.mainContainerMarginBottom
  },
  logo: {
    marginTop: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    width:'100%',
    height:100

  },
  illustration: {
    marginTop: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical:25
  },
  title: {
    ...Fonts.style.h4,
    fontWeight: 'bold',
    color: Colors.gunmetal,
    textAlign: 'center',
    top: -35,
    
  },
  firstInput: {
    marginTop: 10
  },
  loginSubmit: {
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
  },
  password: {
    textAlign: 'right'
  }
})
