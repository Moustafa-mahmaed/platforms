import { StyleSheet,Dimensions } from 'react-native'
import { ApplicationStyles, Fonts, Colors, Metrics } from '../../../../Theme'
var {width}=Dimensions.get("window"); 
export default {
  root: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    position:"relative"
    },
   gradientHeader: {
    ...ApplicationStyles.gradientHeader,
  },
  content: {
    padding: 20,
    flex: 1
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  title: {
    textAlign: 'center',
    color: Colors.basic.white,
    fontWeight: 'bold',
    ...Fonts.style.h4
  },

  header: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center'
  },
  body: {
    marginTop: 70
  },
  fetching: {
    backgroundColor: Colors.basic.white,
    borderRadius: 15,
    padding: 20
  },
  avatarContainer:{
    flexDirection: 'row',
      alignItems: 'center',
      justifyContent:"center",
       

  },

  avatar:{
    width: 160,
    height: 160,
    borderWidth: 4,
    borderColor: Colors.basic.white,
    borderRadius: 150,
    marginTop: 27,
    
  },
  fullName:{
    fontSize: 21,
    textAlign:'right',
    lineHeight : 44,
    letterSpacing: 0.42,
    color:Colors.basic.black,
   
    fontWeight: 'bold',
  
  },
  emailcontainer:{
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",

  },
  userName:{
   fontSize:15,
    textAlign:'right',
    lineHeight:29,
    letterSpacing:0.3,
    color:Colors.brownGrey,

    
  },
  containlayoutcountry:{
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
  },
  // sendMessage:{
  //   width:20,
  //   marginTop: 20,
  //   marginBottom: 20,
  //   borderRadius: 20,
   
  // },
  countryCard:{  
    marginLeft:30,
    width:134,
    height:140, 
    //borderWidth: 1,
    borderRadius: 2,
    overflow: 'hidden',
    borderColor: '#5f6160',
    borderBottomWidth: 0,
    shadowColor: '#e4e6e5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
    
   
    
    
     
 
     
      
    },
    countryLocation:{
       marginTop: 10,
      alignSelf: 'center',
    },
    btncontainerstyle:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:"center",
       marginVertical: 5,
    },
     countryName:{
      
       fontWeight:"bold",
       fontSize:22,
       
       color:'red',
       
      
    },
    userCountery:{
     
       textAlign:'right',
      
  

    },
    btnstyle:{
      width:width/3 +50,
    },
    countryStyle:{
      width:50,
      height:50,
      backgroundColor:'#e81b23',
      
      borderRadius:25,
    },

    birthDayCard:{
      width:134,
      height:140, 
      backgroundColor:'white',
      borderRadius:23,
       marginLeft:70,
      marginTop:35,
        // blurRadius:3, 
   
       borderWidth: 1,
        borderColor: '#ddd',
       borderBottomWidth: 0,
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 2 },
       shadowOpacity: 0.8,
       shadowRadius: 2,
       elevation: 1,
    },
    birthDayStyle:{
      width:50,
      height:50,
      backgroundColor:'#e81b23',
      marginLeft: 42,
      marginTop: 15,
      borderRadius:150,
    },
    layoutcontainer:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
      marginVertical:9,
      width:"100%",
      paddingHorizontal:9,
      textAlign:"right"
      
    },
    singlelayoutcontainer:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"center",
      marginVertical:9
      

    },
    containerlayout:{
      justifyContent:"center",
      flexDirection:"column",
      alignItems:"center",
      
    },
    absoluteicon:{
      position: "absolute",
      top:150,
      left:30,
     

    },
    absoluteicon1:{
      position: "absolute",
      top:150,
      right:30,
     

    },
    backButton: {
      position: 'absolute',
      top: 20
    },
    backButtonIcon: {
      left: 15,
      top: 0
    }

}
