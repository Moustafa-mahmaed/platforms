const type = {
//  base: 'Avenir-Book',
  base: 'frutiger-lt-arabic-65-bold',
//  base: 'moheeb',

  bold: 'Avenir-Black',
  emphasis: 'HelveticaNeue-Italic'
}

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 14,
  medium1: 17,
  small: 12,
  tiny: 8.5
}

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.base,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.base,
    fontSize: size.h6
  },
   medium1: {
    fontFamily: type.base,
    fontSize: size.medium1
  },
  h7: {
    fontFamily: type.base,
    fontSize: size.medium
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  },
  small: {
    fontFamily: type.base,
    fontSize: size.small
  },
  link: {
    fontFamily: type.base,
    fontSize: size.small
  },
  tiny: {
    fontFamily: type.base,
    fontSize: size.tiny
  }
}

export default {
  type,
  size,
  style
}
