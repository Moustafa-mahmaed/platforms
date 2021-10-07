import { ApplicationStyles, Fonts, Colors } from '../../../../Theme'

export default {
  root: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    paddingHorizontal: 20
  },
  gradientHeader: {
    ...ApplicationStyles.gradientHeader
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 170
  },
  title: {
    textAlign: 'center',
    color: Colors.basic.white,
    // fontWeight: 'bold',
    ...Fonts.style.h4
  },
  filterButton: {
    marginVertical: 20
  },
  body: {
    flex: 9
  },
  fetching: {
    backgroundColor: Colors.basic.white,
    borderRadius: 15,
    padding: 20
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
  AddForm:{
    position: 'absolute',
    width:60,
    height:60,
    bottom:15,
    left:20,
    borderRadius:35,
    backgroundColor:Colors.shockingPink,
    alignItems:"center",
    justifyContent:"center"

  }
}
