import { Fonts } from '../../Theme'
export default {
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'frutiger-lt-arabic-65-bold',
  },
  title: {
    flex: 1,
    textAlign: 'right',
   // ...Fonts.style.medium1,
     fontSize:13,
    // fontWeight: 'bold',
    fontFamily: 'frutiger-lt-arabic-65-bold',
alignSelf: 'center',
  },
  icon: {
    resizeMode: 'contain',
    height: 25,
    width: 25
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    marginLeft: 5,
    borderRadius: 15
  }
}
