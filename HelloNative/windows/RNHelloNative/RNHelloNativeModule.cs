using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Hello.Native.RNHelloNative
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNHelloNativeModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNHelloNativeModule"/>.
        /// </summary>
        internal RNHelloNativeModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNHelloNative";
            }
        }
    }
}
