[![Github All Releases](https://img.shields.io/github/downloads/extremeblackliu/VRCSDKImp/total.svg)]()

# VRCSDKImp

Patched VRChat SDK for improve experience (quality of life)

[中文说明戳我](https://github.com/extremeblackliu/VRCSDKImp/blob/main/README_cn.md)

# Features

* Proxy support (Follow system proxy)
* API Redirection  `api.vrchat.cloud` -> `vrcsdkimp.eeacks.cc`

``vrcp.keter.us.kg`` and `vrcproxy.keter.us.kg` is deprecated and will be unavailable in months, please upgrade to latest patched sdk or manually patch to latest proxy domain.

# Start

1. Download latest or version that matches your current VRCSDK. (override is okay if you don't care)
2. Unzip to `YourProjectFolder/Packages`
3. You should be asked for if overwrite files, confirm it
4. Test upload to check if successed.
5. Profit.

NB: `YourProjectFolder/Packages/vpm-manifest.json` will not update (when you overwrite SDK that version differents, e.x. 3.6.1 -> 3.7.0), manually edit the json file and change the version number to fix.

# FAQ

[FAQ](https://github.com/extremeblackliu/VRCSDKImp/blob/main/faq.md)
