
package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class RNHelloNativeModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNHelloNativeModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNHelloNative";
  }

  @ReactMethod
  public void sayHello(String name, Callback callback) {
        String hello = "Hello " + name + " !";
        callback.invoke(hello);
  }

}