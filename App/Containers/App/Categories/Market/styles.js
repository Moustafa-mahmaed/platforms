import { ApplicationStyles, Fonts, Colors } from '../../../../Theme'
import {Dimensions} from 'react-native'

const {width}=Dimensions.get("window")


export default {
  root: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    paddingHorizontal: 20
  },
   
  titleContainer: {
    flexDirection:"row",
    alignItems: 'center',
        justifyContent: 'space-between',
        height: 170,
  },
  title: {
    textAlign: 'center',
    color: Colors.basic.white,
    // fontWeight: 'bold',
    ...Fonts.style.h2,
  },
  filterButton: {
    marginVertical: 20,
    height:5,
    // backgroundColor:"red"
  },
  body: {
    flex: 9,
    marginTop:35,
    height:width + 400,
    justifyContent:'flex-start'
  },
  fetching: {
    backgroundColor: Colors.basic.white,
    borderRadius: 15,
    padding: 20
  },
  backButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:"flex-start",
    width:30,
  },
  backButtonIcon: {
    left: 10,
    top: 10
  },
  AddForm:{
    position: 'absolute',
    width:60,
    height:60,
    bottom:15,
    left:20,
    borderRadius:35,
    backgroundColor:Colors.purble,
    alignItems:"center",
    justifyContent:"center"
    
      },
      search:{
        height:50,
        width:width-10,
         marginTop: 50,
      },
      searchBox: {
        marginHorizontal: 50,
        height:10,
        borderRadius:50, 

      
       },SellingProductsContainer:{
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