- Tests system. Maybe based on `neck` on top of `findhit`s test hardware?

- Module loading based on `NativeModule` constructor, just like `nodejs` does,
the only difference would be on how files are loaded into a module.

- **requirehit** package loading, unless we start a repo just for that, since
building is extendible enough to handle natives injection!

- natives:
  - assert
  - child_process
  - crypto
  - dgram
  - fs
  - os
  - path
  - punnycode
  - querystring
  - readline
  - string_decoder
  - url
  - zlib
