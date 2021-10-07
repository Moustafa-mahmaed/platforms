import { Fonts, Colors } from '../../Theme'
import colors from '../../Theme/Colors';
export default {
  root: {
    flex: 1,
    flexDirection: 'row-reverse',
    paddingHorizontal: 10
  },
  title: {
    color:Colors.basic.black,
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
    // backgroundColor:"red"
    resizeMode: 'contain',
    marginLeft: 5,
    height: 100,
    width: 100
  },
  iconsContainer: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    
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
  smartlogo:{
    
    // backgroundColor:Colors.dustyOrange,
    width:50,
    height:80,
    position:"relative",
    marginVertical:5,
    
  }
  ,
  trangle:{
    position:"absolute",
    backgroundColor:"white",
    height:32,
    width:32,
    transform: [{ rotate: '45deg' },{translateX:17},{translateY:5}],
    bottom:0,
   
  },
  time:{
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"
  },
  timetext:{
    fontWeight:"bold",
    fontSize:15,
    color:Colors.basic.white
  }
}
