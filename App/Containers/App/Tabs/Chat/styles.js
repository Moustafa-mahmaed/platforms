import { Colors, Fonts, ApplicationStyles } from '../../../../Theme'


export default {
  root: {
    flex: 1,
    backgroundColor: Colors.offWhite
  },
  content: {
    padding: 20,
    flex: 1
  },
  searchBox:{
    height: 250,
  },
  title: {
    ...Fonts.style.h2,
//    fontWeight: 'bold',
    color: Colors.basic.white,
    textAlign: 'center'
  },
  header: {
    flex: 1,
    marginTop: 25,
    alignItems: 'center'
  },
  gradientHeader: {
    ...ApplicationStyles.gradientHeaderHome,
    height:250
  },
  body: {
    marginTop: 25,
    fontFamily: 'frutiger-lt-arabic-65-bold',
  },
}
