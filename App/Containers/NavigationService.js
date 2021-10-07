
import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
  console.log('**********7777777777777777*************')
  console.log(navigatorRef)
}

function navigate(routeName, params) {
    console.log('==================Navigator=================================')
    console.log(_navigator)
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
        
        );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
};