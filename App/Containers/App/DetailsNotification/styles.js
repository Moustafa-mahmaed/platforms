    import { Colors, Fonts } from '../../../Theme/'
    import Row from '../../../Components/Layout/Row';
    import {Dimensions} from "react-native"
    import colors from '../../../Theme/Colors';
    var {height, width} = Dimensions.get('window');

    export default {
      root: {
        flex: 1,
        
        backgroundColor: Colors.offWhite,
        position:"relative",

      
      },
      header: {
        flex: 1,
        marginTop: 100
      },
      avatarHeader: {
        justifyContent: 'flex-end',
        alignContent: 'flex-start',
        flexDirection: 'row'
      },
      headerimg: {
        height: height/3,
        width: width,
        
      },
      avatarTitles: {
        justifyContent: 'center'
      },
      backButton: {
        position:"absolute",
      
        left: 25,
        top: 40,
        width: 50,
        height: 50,
       
        
        
         
      },
      datetime:{
        // backgroundColor:colors.vividPurple,
        width:width,
        height:height/10
      },
      containerDetails:{
        paddingHorizontal:15
      },
      titleCotainer:{
        marginVertical:25,
        flexDirection:"row-reverse",
        justifyContent:"space-between",
        alignItem:"center",
        marginHorizontal:10,

      },
      title: {
      
        textAlign: 'right',
        ...Fonts.style.h4,
        fontWeight: 'bold',
         color: Colors.basic.black,
         width:"80%"
        
        
      },
      textWithIcon:{
        flexDirection:"row-reverse",
        justifyContent:"flex-start",
        alignItem:"center",
        marginHorizontal:7

      },
      datetimetext:{
        ...Fonts.style.normal
        
        ,
        marginVertical:3,
        marginHorizontal:7,
        color:colors.basic.black
      },
      TwoDateTime:{
        flexDirection:"row-reverse",
        justifyContent:"flex-start",
        alignItem:"center",

      },
      locationStyle:{
        flexDirection:"row-reverse",
      justifyContent:"space-between",
      alignItem:"center",
      fontFamily:"frutiger-lt-arabic-65-bold",
        // height:height/5,
        paddingVertical:30,
        
        
        
    },
      iconcontainer:{
        alignItem:"center",
        justifyContent:"center",
        // paddingHorizontal:25,
        width:width/4,
        borderBottomRightRadius:12,
        borderTopRightRadius:12
      },
      locationiconstyle:{
        color:"white",
       
        flexDirection:"row",
        justifyContent:"center",
        textAlign:"center"
        


      },
      
      locationInfo:{
        paddingHorizontal:10,
        fontFamily:"frutiger-lt-arabic-65-bold",

      },
      city:{
        // color:Colors.vividPurple,
        ...Fonts.style.h3,
        
        // fontWeight:"bold"
      },
      sublocation:{
        color:Colors.gray,
        ...Fonts.style.h5
      },
      name: {
        textAlign: 'right',
        ...Fonts.style.small,
        color: Colors.basic.black
      },
      date: {
        textAlign: 'right',
        ...Fonts.style.h4,
        color: "white",
       paddingVertical:15 ,
       

      },
      writeComment:{

        fontFamily:"frutiger-lt-arabic-65-bold",
        
      }
,
      description:{
        borderTopColor: 'black',
        borderBottomColor: 'black',
        borderTopWidth: .2,
        borderBottomWidth: .2,
        borderColor:"red",
        paddingVertical:10,
        fontFamily:"frutiger-lt-arabic-65-bold",

        
      },
      descriptionstyle:{
        
        ...Fonts.style.h3,
        color: "black",
       paddingVertical:15,
       paddingHorizontal:10
      },
      iconwithnumber:{

        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
    
    
      }

      ,
      commentwithavator:{
         flexDirection:"row",
        alignItem:"center",
        
        height:100,
        marginVertical:10
      
      }
      ,iconNav:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        paddingVertical:5,
    
      },
      fetching: {
        backgroundColor: Colors.basic.white,
        borderRadius: 15,
        padding: 20,
        alignSelf: 'center',
        top: 100
      }
      ,iconNav:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        paddingVertical:12,
        marginHorizontal:25

      },
       icon1:{
      paddingHorizontal:5,
        paddingVertical:5,
        // ...Fonts.style.h6,
        
        
      
      },
      icon:{
     paddingHorizontal:5,
      paddingVertical:3,
      ...Fonts.style.h5,
     marginLeft:8,
        
      
      },
      avatar: {
        height: 55,
        width: 55,
        marginLeft: 5,
        borderRadius:40,
       
      },
      textinputstyle:{
        paddingVertical:12,
        paddingHorizontal:12,

        
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItem:"center"

      },
      iconwithnumber:{

        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",


      }
      ,
      commentwithavator:{
        flexDirection:"row",
        alignItem:"center",
        
        height:100,
        
      
      }
      ,iconwwithavatr:{
        marginVertical:10,
        flexDirection:"row",
        alignItem:"center",
      },
      inputstyle:{
        marginBottom:15,marginHorizontal:10
        
        
      },
      commentCollection:{
        backgroundColor:"white",
        textAlign:"center",
        marginHorizontal:25
      
      }
      
    }
