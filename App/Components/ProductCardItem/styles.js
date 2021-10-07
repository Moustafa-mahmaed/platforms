import { Fonts, Colors } from '../../Theme'
import {Dimensions} from 'react-native'

const {width}=Dimensions.get("window")
export default {
  root: {
    flex: 1,
    flexDirection: 'row-reverse',
    paddingHorizontal: 10
  },
  title: {
    ...Fonts.style.h7,
    textAlign: 'right',
    fontWeight: 'bold',
    paddingBottom: 5
  },
  subTitle: {
    ...Fonts.style.small,
    textAlign: 'right',
    color: Colors.brownGrey
  },
  date: {
    ...Fonts.style.small,
    textAlign: 'right',
    color: Colors.brownGrey
  },
  image: {
    flex: 2,
    resizeMode: 'contain',
    marginLeft: 5,
    height: 100,
    width: 100
  },
  iconsContainer: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  counter: {
    color: Colors.brownGrey
  },
  titleContainer: {
    paddingTop: 20,
    flexDirection: 'column',
    flex: 4,
    alignItems: 'flex-end'
  },
  iconContainer: {
    paddingHorizontal: 7
  },
  SellingProductsContainer:{
    //  backgroundColor:'red',
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",

   },
   SellingProducts:{
     color:Colors.basic.black,
     fontSize:28,
     fontWeight:"bold"
   },
   moreSellingProducts:{
     color:Colors.black,
     opacity:.4,
     fontSize:18,
     fontWeight:"bold",
     marginHorizontal:10
   
   },
   textwithicon:{
     flexDirection:"row",
     justifyContent:"flex-start",
     alignItems:"center",
     
    
   },
   sellingProductsContainer:{
     width:width/3 + 30 ,
     height:width/2 + 70,
     backgroundColor:"white",
     marginHorizontal:10,
    //  backgroundColor:'red'
   },
   sellingProductsName:{

    color: Colors.basic.black,
    fontWeight: 'bold',
    fontSize:15,
    marginTop:5,
    },
    sellingProductsPrice:{
    color: Colors.deepSkyBlue,
    fontWeight: 'bold',
    fontSize:15
    },
    sellingProductsImage:{
     width: "100%",
     height:"70%",
     marginTop:10 
    },
    sellingProductsPlace:{
      textAlign: 'right',
      color: Colors.brownGrey,
      fontWeight: 'bold',
      fontSize:13,
      marginTop:1,
      marginHorizontal:5
     },
     sellingProductsIcon2:{
      width:'100%',
      flexDirection:"row",
      justifyContent:"flex-start",
       marginHorizontal:35,
       marginTop:5,
      // textAlign:'left',  
    },
}
