import { Colors, Fonts, ApplicationStyles } from '../../../Theme/'
import { Dimensions} from "react-native";
const {width}=Dimensions.get("window");

export default{
    root: {
      flex: 1,
      backgroundColor: Colors.basic.white,
      position: 'relative',
    },
    container:{
        flex:1,
        backgroundColor:'white',
        height:'100%',
        marginVertical: 20,
        marginHorizontal: 10,

        // marginLeft: 100,
    },
    gradientHeader: {
         ...ApplicationStyles.gradientHeaderform
      },

    textareastyle:{
      marginLeft: 20,
        color:Colors.basic.black,
        width:'90%',
        // height: 150,
        height: (width)-100,

        backgroundColor:"white",

        alignItems:"flex-start",
    justifyContent:"flex-start",
    textAlignVertical: 'top',
      
      },
      backButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
      },
      backButtonIcon: {
        left: 10,
        top: 10,
 
      },
      titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100
      },
      title: {
        textAlign: 'center',
        color: Colors.basic.white,
        fontWeight: 'bold',
        ...Fonts.style.h4,
        // fontFamily:'frutiger-lt-arabic-65-bold'
      },

















    // modalView:{
    //     backgroundColor:'#eee',
    //     height:200, 
    //     color:'blue',
    //     justifyContent:'center',
    //     alignItems: 'center',

    // },
    // backButton: {
    //     position: 'absolute',
    //     top: 85
    // },
    // closeText:{
    //     backgroundColor:'#333',
    //     color:'#bbb',
    //     padding: 5,
    //      margin: 20,
    // },
    // openText:{
    //     backgroundColor:'#333',
    //     color:'#bbb',
    //     padding: 5,
    //      margin: 20,
    // }
}