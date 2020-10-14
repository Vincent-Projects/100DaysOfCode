#include <iostream>
#include <node.h>
#include <v8.h>

void Method(const v8::FunctionCallbackInfo<v8::Value> &args)
{
    v8::Isolate *isolate = args.GetIsolate();
    std::cout << "Hello World !\n";
}

void Init(v8::Local<v8::Object> exports)
{
    NODE_SET_METHOD(exports, "hello", Method);
}

NODE_MODULE(my_addon, Init)