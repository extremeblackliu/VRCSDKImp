# 不信任我？来教你搭建一个自己的代理

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

[](https://i0.hdslb.com/bfs/new_dyn/4365f494a3d06913e2d9bd878bc8150d182460046.png)
