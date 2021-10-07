
import { Colors, Fonts, ApplicationStyles } from '../../../Theme'


export default { 
     root: {
    flex: 1,
    backgroundColor: Colors.offWhite
  },
    content: {
        flex: 1
      }
 ,
 titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100
  },
  title: {
    textAlign: 'center',
    color: Colors.basic.white,
   // fontWeight: 'bold',
    ...Fonts.style.h4
  },
  gradientHeader: {
    ...ApplicationStyles.gradientHeaderHome,
    height:250


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
  searchBox: {
    marginLeft: 50,
    marginRight: 10,
    textAlign:"center"

    ,marginVertical:30
  },
}
