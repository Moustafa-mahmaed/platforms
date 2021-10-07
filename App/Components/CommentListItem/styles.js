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
      ...Fonts.style.small,
      textAlign: 'right',
      color: Colors.brownGrey
    },
    date: {
      ...Fonts.style.small,
      // textAlign: 'left',
      color: Colors.brownGrey
    },
    imgcontaineravator:{
       marginHorizonal:5,
      paddingVertical:5,
      backgroundColor:"#efefef",
    flexDirection:"row",
      alignItems:"center",
      borderRadius:10,
      justifyContent:"space-between"
    },
    image: {
      // flex: 2,
        // resizeMode: 'contain',
      marginLeft: 5,
      alignItems:"center",
      height: 50,
      width: 50,
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
