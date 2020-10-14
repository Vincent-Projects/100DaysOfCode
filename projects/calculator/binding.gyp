   {
    "targets": [
      {
        "target_name": "my_addon",
        "sources": [ "cppsrc/main.cpp" ],
        "include_dirs" : [
          "<!(node -e \"require('nan')\")"
        ]
      }
    ]
  }