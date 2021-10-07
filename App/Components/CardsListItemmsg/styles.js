import { Fonts, Colors } from '../../Theme'
export default {
  root: {
    flex: 1,
    flexDirection: 'row-reverse',
    paddingHorizontal: 10
  },
  title: {
    ...Fonts.style.h6,
    textAlign: 'right',
    fontWeight: 'bold',
    paddingBottom: 5,
    color:Colors.basic.black
  },
  subTitle: {
    ...Fonts.style.h5,
    textAlign: 'right',
    color: Colors.black
  },
  date: {
    ...Fonts.style.small,
    textAlign: 'right',
    color: Colors.brownGrey
  },
  imgcontaineravator:{
    marginHorizonal:5,
    // backgroundColor:"red",
  
    alignItems:"center",
    justifyContent:"center"
  },
  image: {
    // flex: 2,
      // resizeMode: 'contain',
    marginLeft: 5,
    
    height: 60,
    width: 60,
    borderRadius:30,
   
   
    

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
  }
}
