import { Colors, Fonts } from '../../Theme'
export default {
  root: {
    flex: 1
  },
  tag: {
    color: Colors.gunmetal,
    ...Fonts.style.h5
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    marginTop: 50,
    marginLeft: 25
  }
}
