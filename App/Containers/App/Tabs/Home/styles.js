import { Colors, Fonts, ApplicationStyles } from '../../../../Theme'

export default {
  root: {
    flex: 1,
    backgroundColor: Colors.offWhite
  },
  content: {
    flex: 1
  },
  header: {
    flex: 1,
    marginTop: 25,
    alignItems: 'center'
  },
  body: {
    marginTop: 55,
    fontFamily: 'frutiger-lt-arabic-65-bold',
  },
  title: {
    ...Fonts.style.h1,
//    fontWeight: 'bold',
    color: Colors.basic.white,
    textAlign: 'center'
  },
  subTitle: {
    ...Fonts.style.h6,
//    fontWeight: 'bold',
    color: Colors.basic.white,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 25
  },
  bodyTitle: {
    color: Colors.shockingPink,
    ...Fonts.style.h5,
//    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  searchBox: {
    marginHorizontal: 50
  },
  gradientHeader: {
    ...ApplicationStyles.gradientHeaderHome
  }
}
