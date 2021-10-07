
import { Colors, Fonts, ApplicationStyles } from '../../../Theme'


export default {
  root: {
    flex: 1,
     backgroundColor: Colors.offWhite
    

  },
  content: {
    flex: 1,
  },
  gradientHeader: {
    ...ApplicationStyles.gradientHeaderHome,
    height: 250,


  },
  searchBox: {
    marginLeft: 50,
    marginRight: 10,
    textAlign: "center",
     marginVertical: 30
  },
}
