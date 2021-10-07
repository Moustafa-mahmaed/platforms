package com.trendleez.forums;

import com.facebook.react.ReactActivity;

      import com.facebook.react.ReactActivityDelegate;
      import com.facebook.react.ReactRootView;
      import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
// react-native-splash-screen >= 0.3.1 
import org.devio.rn.splashscreen.SplashScreen; // here 


import android.os.Bundle; // required for onCreate parameter

public class MainActivity extends ReactActivity {

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }   
    
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
        return "TrendLeez";
  }
  @Override
  protected void onCreate(Bundle savedInstanceState) {
       SplashScreen.show(this);  // here 
       super.onCreate(savedInstanceState);
   }
}
