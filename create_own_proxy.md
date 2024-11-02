# 不信任我？来教你搭建一个自己的代理

前排提醒：如果你只是想用而不是自己搭建，不要看这个！不要搞错了！

注意：本文仅介绍目前本库中使用的反向代理的办法，并不代表只能通过这种办法来达到反向代理的目的。本文仅限于高级用户，如果您在尝试本文中的步骤时遇到您无法解决的困难，我无法提供帮助。

本文将介绍使用 Cloudflare Worker 来搭建反向代理，唯一使用到的源代码位于 [这里](https://github.com/extremeblackliu/VRCSDKImp/blob/main/worker.js)

### 要求

- Cloudflare 账号。
- 在自己的 Cloudflare 账号中有一个自己的域名，这是因为 worker.dev 被墙了，你必须要有一个自己的域名。
- [dnSpy](https://github.com/dnSpyEx/dnSpy) 用于反编译，修改 VRCSDK 中的请求地址。

没有cloudflare账号的我就不教怎么注册账号了，访问 https://dash.cloudflare.com 按照页面指引注册就可以。

如果有cloudflare账号的直接用上面的链接登录就行了

# 创建 Worker

登录之后会在主页，点击 Worker 和 Pages

![](https://i0.hdslb.com/bfs/new_dyn/4365f494a3d06913e2d9bd878bc8150d182460046.png)

然后点击 创建应用程序

![](https://i0.hdslb.com/bfs/new_dyn/c40d86cd4ab0b0d6b6dd03115475d61e182460046.png)

然后到这个页面，默认就是Worker 然后点创建 Worker

![](https://i0.hdslb.com/bfs/new_dyn/f626357c357cdc9b3c75a4dbe163d0ee182460046.png)

然后会要求你为项目命名，随便写一个就行，或者你喜欢填什么就填什么，为了方便记忆你可以写个 vrcproxy 之类的

![](https://i0.hdslb.com/bfs/new_dyn/00484f8c1f0407ed4d6a7fae296092cb182460046.png)

接着点保存，如果保存的时候说什么名字被占用了就换一个，保存之后多出一个框，不用管，直接点完成

![](https://i0.hdslb.com/bfs/new_dyn/d8c75f7d963f2e9e7f84381a96fa8da1182460046.png)

接下来点编辑代码

![](https://i0.hdslb.com/bfs/new_dyn/86ff31f086ce328c68b4e0dbd3b40a86182460046.png)

然后按图片操作

![](https://i0.hdslb.com/bfs/new_dyn/23fff42de403be426c2d6c00b4107b8a182460046.png)

```js
export default {
 async fetch(request, env) {
   const url = new URL(request.url);
   url.host = "api.vrchat.cloud"; 
   return await fetch(url, {
     headers: request.headers,
     method: request.method,
     body: (request.method !== 'GET' ? request.body : null),
     redirect: 'follow'
   });
}}
```


然后部署

![](https://i0.hdslb.com/bfs/new_dyn/43e6143538a108859cba2f9d357d0645182460046.png)

保存并部署之后，点左上角 ← 退回去

![](https://i0.hdslb.com/bfs/new_dyn/04d1998b233afca04b490c2da39a24e4182460046.png)

退回来之后，我们要设置绑定的域名了

![](https://raw.githubusercontent.com/extremeblackliu/VRCSDKImp/refs/heads/main/images/firefox_vRl9GT3lXc.png)

![](https://raw.githubusercontent.com/extremeblackliu/VRCSDKImp/refs/heads/main/images/firefox_VQ8tvg5NvS.png)

然后填入你在cloudflare中托管的域名

![](https://raw.githubusercontent.com/extremeblackliu/VRCSDKImp/refs/heads/main/images/firefox_KpFqOyQP7P.png)

此时，访问 `https://你绑定的域名/api/1/config`

![](https://i0.hdslb.com/bfs/new_dyn/fb7b110382a42b3e4558cbf7a55e821e182460046.png)

对于其它浏览器可能看到的格式不一样，但是只要有数据返回基本上是没有问题的。

# VRCSDK 修改

接下来是修改SDK的部分，你需要使用 dnSpy 来修改 VRCSDK 的代码，这里就不再赘述如何下载安装。

解压之后，在你解压到的目录下运行 dnSpy.exe

此时你有一个空的窗口

![](https://i0.hdslb.com/bfs/new_dyn/9f77a445e57dde803490abb3ba48f4ed182460046.png)

确保你已经从 `Release` 中下载了打了补丁的SDK，解压到任意位置

然后导航到 `.\com.vrchat.base\Runtime\VRCSDK\Plugins`

在同目录下找到 `VRCCore-Editor.dll`

直接把该文件拖拽到 dnSpy 的左侧小窗口处

然后 dnSpy 会加载该文件

加载完成之后先在下方的搜索框中筛选搜索条件

选择最底下的 `Number/String` ，中文应该是 `数值/字符串`

![](https://i0.hdslb.com/bfs/new_dyn/e272d0bbe70402032d7abdcb7021d5f8182460046.png)

然后右边的筛选选择 `Selected Files` ， 中文应该是 `(仅)选中的文件`

![](https://i0.hdslb.com/bfs/new_dyn/1819748746f30e98898e86ed086358af182460046.png)

在左侧窗口单击 `VRCCore-Editor` 就可以开始搜索了

![](https://i0.hdslb.com/bfs/new_dyn/5dafbb390de9b530d8a173f294c22a7a182460046.png)

注意：在下文中所有你看到的 `keter.tech` 的域名都是老域名（图片是老图片），目前库中的域名是 `eeacks.cc` ，因此你要替换的是 `eeacks.cc` -> `你的域名.com` ，请在替换的时候注意到这一点。

在下方搜索框中输入 `eeacks.cc`

![](https://i0.hdslb.com/bfs/new_dyn/aaed8902edd229a6721686e89977cb15182460046.png)

接着我们逐个修改，首先双击第一个，然后它会导航到目标代码处，接着右键，点击 `Edit IL Instructions`  中文：`编辑IL指令`

![](https://i0.hdslb.com/bfs/new_dyn/2ad4cc6c8de91ed5fcd742c08ded0baf182460046.png)

注意：替换的时候只需要替换域名，不要动别的东西

例如这里替换之前：https://vrcsdkimp.eeacks.cc/api/1/

替换之后理应是：https://你的域名/api/1/

接着在搜索框双击下一条进行修改

![](https://i0.hdslb.com/bfs/new_dyn/f5d64ce877028d5f8b3fbcb7199d2ce2182460046.png)

这里有一个小细节，修改的时候右键的地方最好右键到字符串上，以便弹出修改窗口时位于前面的字符串是需要修改的域名

注意：对于这种

`public const string releaseApiUrl = "https://vrc-proxy.keter.tech/api/1/";`

带有 `const` 的声明，编辑的方法有些不一样，

![](https://i0.hdslb.com/bfs/new_dyn/191b6e7052dedd43930aaed24a300ee1182460046.png)

然后修改再点OK就行了

![](https://i0.hdslb.com/bfs/new_dyn/9cd5321f382542533444b40e7c5c06fe182460046.png)

按照这种办法对其它地方如法炮制，然后就可以保存了

![](https://i0.hdslb.com/bfs/new_dyn/466f20834a00b480ee41fcf0d26c367b182460046.png)

不用动其它的直接点击OK就行了

![](https://i0.hdslb.com/bfs/new_dyn/2b366f0c3e93ca019edaab1763987f03182460046.png)

然后你就可以把修改的SDK导入Unity了，只需要把Packages文件夹直接覆盖到项目根文件夹就可以了

项目根文件夹看起来像是这样：

![](https://i0.hdslb.com/bfs/new_dyn/75fe21d1f8c9b6bb5db577f9997a7172182460046.png)

然后返回到Unity等待其重载即可测试上传功能
