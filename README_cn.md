# VRCSDKImp

通过修补一系列SDK的功能来改进编辑器内的体验（生活质量改进）


# 功能

* 支持代理 (跟随系统代理)
* API重定向  `api.vrchat.cloud` -> `vrcsdkimp.eeacks.cc`

``vrcp.keter.us.kg`` 或者 `vrcproxy.keter.us.kg` 已经弃用，几个月后将会不再可用，请及时升级到最新版的 VRCSDKImp 版本或者手动修补域名。

# 开始

1. 下载最新或者跟你的SDK版本匹配的VRCSDKImp。（如果你不介意，覆盖版本也是OK的）
2. 解压到 `YourProjectFolder/Packages`
3. 你应该会被询问是否要覆盖文件，点击确认。
4. 尝试上传看看是否起作用了。
5. 完成。

注: `YourProjectFolder/Packages/vpm-manifest.json` 不会更新 （当你覆盖不同的SDK版本时，像是 3.6.1 -> 3.7.0 ），手动编辑 json 文件然后修改为相同的版本号来修改这个问题。


# 常见问题

[点我](https://github.com/extremeblackliu/VRCSDKImp/blob/main/faq_cn.md)
