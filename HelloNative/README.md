
# react-native-hello-native

## Getting started

`$ npm install react-native-hello-native --save`

### Mostly automatic installation

`$ react-native link react-native-hello-native`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-hello-native` and add `RNHelloNative.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNHelloNative.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNHelloNativePackage;` to the imports at the top of the file
  - Add `new RNHelloNativePackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-hello-native'
  	project(':react-native-hello-native').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-hello-native/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-hello-native')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNHelloNative.sln` in `node_modules/react-native-hello-native/windows/RNHelloNative.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Hello.Native.RNHelloNative;` to the usings at the top of the file
  - Add `new RNHelloNativePackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNHelloNative from 'react-native-hello-native';

// TODO: What to do with the module?
RNHelloNative;
```
  