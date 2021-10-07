import { Colors, Fonts, ApplicationStyles } from '../../../../../Theme'


export default {
  root: {
    flex: 1,
    backgroundColor: Colors.offWhite
  },
  content: {
    // padding: 5,
    flex: 1
  },
  content2: {
    // padding: 5,
    flex: 1,
    backgroundColor:'#f6f6f6'
  },
  searchBox:{
    height: 250,
  },
  title: {
    ...Fonts.style.h4,
//    fontWeight: 'bold',
    color: Colors.basic.white,
    textAlign: 'center'
  },
  header: {
    flex: 1,
    marginTop: 25,
    alignItems: 'center'
  },
  gradientHeader: {
    ...ApplicationStyles.gradientHeaderHome,
    height:250,
    elevation:10
  },
  body: {
    marginTop: 25,
    fontFamily: 'frutiger-lt-arabic-65-bold',
  },
  container: {
  //  paddingTop:50,
  
    backgroundColor: 'red',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    width:"100%"
    // paddingTop: Constants.statusBarHeight
  },
  backButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backButtonIcon: {
    left: 10,
    top: 10
  },
  messages: {
    alignSelf: 'stretch',
    // backgroundColor:'red',
    // paddingTop: 40,
    width:"100%"
  },
  input: {
    // alignSelf: 'stretch',
    borderWidth:.2,
    borderColor:"#666",
    backgroundColor:"#fff",
    borderRadius:20,
    // color:"white",
    width:"85%",
    height:40,
    paddingVertical:0
    // width:200
  },
  inputContainer:{
    flexDirection: 'row',
    justifyContent:'center',alignItems:'center',
    width:"100%",
    backgroundColor:'#fff',
    padding:7,
  },
  joinPart: {
    fontStyle: 'italic'
  } 
}
