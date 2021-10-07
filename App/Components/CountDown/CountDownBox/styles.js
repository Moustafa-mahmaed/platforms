import { Colors, Fonts } from '../../../Theme'

export default {
  root: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'white',
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {},
  title: {
    textAlign: 'center',
    color: Colors.basic.white,
    fontWeight: 'bold',
    ...Fonts.style.description
  }
}
