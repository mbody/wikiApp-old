
#import "RNHelloNative.h"
#import <React/RCTLog.h>

@implementation RNHelloNative

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(sayHello:(NSString *)name callback:(RCTResponseSenderBlock)callback)
{
  RCTLogInfo(@"Saying hello to %@", name);
  NSString *hello = [NSString stringWithFormat: @"Hello %@ !", name];
  callback(@[hello]);
}

@end

