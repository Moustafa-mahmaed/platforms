import { ApplicationStyles, Fonts, Colors } from '../../../../Theme'

export default {
  root: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    // paddingHorizontal: 20
  },
  gradientHeader: {
    ...ApplicationStyles.gradientHeader,
    height: 300
  },
  titleContainer: {
    top: 40,
    height: 300
  },
  title: {
    textAlign: 'center',
    color: Colors.basic.white,
    // fontWeight: 'bold',
    ...Fonts.style.h5
  },
  subTitle: {
    textAlign: 'center',
    color: Colors.basic.white,
    // fontWeight: 'bold',
    marginVertical: 8,
    ...Fonts.style.h5
  },
  
  filterButton: {
    marginVertical: 20
  },
  body: {
    flex: 9,
    paddingTop: 20
  },
  fetching: {
    backgroundColor: Colors.basic.white,
    borderRadius: 15,
    padding: 20
  },
  fetchingBox: {
    backgroundColor: Colors.basic.white,
    borderRadius: 15,
    padding: 20,
    width: 40,
    height: 40,
    alignSelf: 'center'
  },
  backButton: {
    position: 'absolute',
    top: 85,
    paddingVertical:15
  },
  backButtonIcon: {
    left: 20,
    top: 0,
     elevation:10
  },
  AddForm:{
    position: 'absolute',
    width:60,
    height:60,
    bottom:15,
    left:20,
    borderRadius:35,
    backgroundColor:Colors.deepSkyBlue,
    alignItems:"center",
    justifyContent:"center"

  },titlecontainer:{
    alignItems:"center",
    justifyContent:"center",
    
  },
  titletext:{
    fontSize:28,
    // fontWeight:"bold",
    
    ...Fonts.style.h3,
    color:Colors.deepSkyBlue
  },
  titletext1:{
    fontSize:20,
    // fontWeight:"bold",
    color:Colors.ceruleanopacity
  }
}
