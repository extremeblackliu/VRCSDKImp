[![Github All Releases](https://img.shields.io/github/downloads/extremeblackliu/VRCSDKImp/total.svg)]()

# VRCSDKImp

通过修补一系列SDK的功能来改进编辑器内的体验（生活质量改进）

# 功能

* 支持代理 (跟随系统代理)
* API重定向  `api.vrchat.cloud` -> `vrcsdkimp.eeacks.cc`

``vrcp.keter.us.kg`` 或者 `vrcproxy.keter.us.kg` 已经弃用，几个月后将会不再可用，请及时升级到最新版的 VRCSDKImp 版本或者手动修补域名。

# 开始

1. 下载最新或者跟你的SDK版本匹配的VRCSDKImp。（如果你不介意，覆盖版本也是OK的）
2. 解压到 `你的项目文件夹/Packages`
3. 你应该会被询问是否要覆盖文件，点击确认。
4. 尝试上传看看是否起作用了。
5. 完成。

注: `你的项目文件夹/Packages/vpm-manifest.json` 不会更新 （当你覆盖不同的SDK版本时，像是 3.6.1 -> 3.7.0 ），手动编辑 json 文件然后修改为相同的版本号来修改这个问题。

# 常见问题

## 不会自动登录、登录页面卡住了

目前这个问题还没法确定源头，但是可以解决的途径是：访问一次 `vrcsdkimp.eeacks.cc` 之后重载SDK（VRCSDK 的 "Reload SDK" 功能），在几分钟内应该会恢复正常。

该问题不常见，但是一旦出现可以这样解决。

## 为什么对我没用？

考虑一下在 Issue 创建一个新的问题，然后提供一下上下文和必要的文件。

## 它为什么不会使用我的代理？

先确保你正确覆盖了文件，然后看看系统代理是否被正确设置了，大多数代理软件应该都会设置。如果你不确定或者不知道，阅读一下你代理软件的说明或者尝试重启一下代理软件。

## 这个安全吗？

老实讲，我不确定，他们要是真那么极端，有太多可以检测的东西了。完全看他们是否在乎。个人而言，我目前为止还没遇到任何问题。

## 你会偷我的数据吗？

不，我还鼓励你搭建一个自己的。[教程](https://github.com/extremeblackliu/VRCSDKImp/blob/main/create_own_proxy.md)
