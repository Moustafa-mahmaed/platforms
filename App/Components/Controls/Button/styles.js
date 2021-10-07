import { Colors, Fonts } from '../../../Theme'
export default {
  root: {
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    borderRadius: 20
  },
  primary: {
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 2
  },
  secondary: {
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 2
  },
  disabled: {},
  link: {},
  fetching: {
    paddingHorizontal: 10,
    position: 'absolute',
    left: 20
  },
  primaryTitle: {
    ...Fonts.style.h6,
    // fontWeight: 'bold',
    color: Colors.basic.white
  },
  secondaryTitle: {
    ...Fonts.style.medium1,
    // fontWeight: 'bold',
    color: Colors.basic.white
  },
  secondaryTitle1:{
    ...Fonts.style.h6,
    // fontWeight: 'bold',
    color: Colors.gray
  },
  linkTitle: {
    ...Fonts.style.link,
    color: Colors.gunmetal,
    fontWeight: 'bold'
  },
  icon: {
    height: 20,
    width: 20,
    position: 'absolute',
    right: 30,
    zIndex: 100
  }
}
