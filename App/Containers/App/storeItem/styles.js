import { Colors, Fonts } from '../../../Theme/'
import Row from '../../../Components/Layout/Row';

export default {
  root: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    paddingHorizontal: 20
  },
  header: {
    flex: 1,
    marginTop: 100,
    textAlign:"right"
  },
  avatarHeader: {
    justifyContent: 'flex-end',
    alignContent: 'flex-start',
    flexDirection: 'row'
  },
  avatar: {
    height: 55,
    width: 55,
    marginLeft: 5,
    borderRadius:40,
   
  },
  avatarTitles: {
    justifyContent: 'center'
  },
  backButton: {
    left: 10,
    top: 60,
    width: 50,
    height: 50
  },
  title: {
    textAlign: 'right',
    ...Fonts.style.h4,
    fontWeight: 'bold',
    color: Colors.basic.black,
    marginBottom: 15
  },
  name: {
    textAlign: 'right',
    ...Fonts.style.small,
    color: Colors.basic.black
  },
  date: {
    textAlign: 'right',
    ...Fonts.style.small,
    color: Colors.gunmetal
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
    paddingVertical:7,

  },
  icon:{
    paddingHorizontal:5,
      paddingVertical:5,
      
    
    },
  textinputstyle:{
    paddingVertical:7,
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
    
    marginVertical:2
  
  
  }

  ,iconwwithavatr:{
    
    flexDirection:"row",
    alignItem:"center",
  },
  inputstyle:{
    marginBottom:15,marginHorizontal:10
    
    
  },
  commentCollection:{
    backgroundColor:"white",
    textAlign:"center",
    marginHorizontal:7,
    marginTop:-10
  
  }
  
}
