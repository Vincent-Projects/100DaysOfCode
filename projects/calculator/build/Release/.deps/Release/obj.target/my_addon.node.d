cmd_Release/obj.target/my_addon.node := g++ -o Release/obj.target/my_addon.node -shared -pthread -rdynamic -m64  -Wl,-soname=my_addon.node -Wl,--start-group Release/obj.target/my_addon/cppsrc/main.o -Wl,--end-group 
