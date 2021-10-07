import { Colors, Fonts } from '../../Theme'

export default {
  root: {},
  boxes: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    marginTop: 20
  },
  title: {
    textAlign: 'center',
    color: Colors.basic.white,
    fontWeight: 'bold',
    ...Fonts.style.h4
  }
}
