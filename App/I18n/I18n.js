// @flow

import I18n from 'react-native-i18n'
import ReactNative from 'react-native'
// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true
I18n.locale = 'ar'
I18n.defaultLocale = 'ar'
ReactNative.I18nManager.allowRTL(false)
// English language is the main language for fall back:
I18n.translations = {
  ar: require('./languages/ar.json')
}

let languageCode = I18n.locale.substr(0, 2)

// All other translations for the app goes to the respective language file:
switch (languageCode) {
  case 'ar':
    I18n.translations.ar = require('./languages/ar.json')
    break
}

export default I18n
