# 晓程序模版启动

#### 各种命令

```bash
# 生成api
npm run api [init] （首次生成的时候添加init）

# 本地开发
npm run serve

# 编译运行于各种环境
npm run build

# 编译上线包（包含sentry相关）
npm run release

# 需要手动填写的文件
config.json 里填写appId
./config/sentry.properties 里填写sentry配置
.env.release 里填写sentry项目dsn配置

```
