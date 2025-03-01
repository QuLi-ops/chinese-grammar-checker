# API日志存储系统

本项目使用Cloudflare Workers KV存储API请求日志，以便于监控和分析API使用情况。

## 设置步骤

1. 确保已安装并登录Wrangler CLI：
   ```bash
   npm install -g wrangler
   wrangler login
   ```

2. 创建KV命名空间：
   ```bash
   node scripts/create-kv-namespace.js
   ```
   或手动创建：
   ```bash
   wrangler kv:namespace create chinese-grammar-checker-LOGS
   wrangler kv:namespace create chinese-grammar-checker-LOGS --preview
   ```

3. 更新`wrangler.toml`文件，添加KV命名空间配置：
   ```toml
   [[kv_namespaces]]
   binding = "chinese-grammar-checker-LOGS"
   id = "your-kv-namespace-id"
   preview_id = "your-preview-kv-namespace-id"
   ```

4. 设置API日志访问令牌（在`wrangler.toml`中）：
   ```toml
   [vars]
   API_LOGS_TOKEN = "your-secure-token"
   ```

## 日志记录内容

每个API请求会记录以下信息：

- 时间戳
- 请求路径
- 请求方法
- 客户端IP
- 用户代理
- 响应状态码
- 处理时间
- 请求数据摘要（仅记录部分文本，保护隐私）
- 错误信息（如果有）

## 查询日志

可以通过`/api/logs`端点查询日志：

```
GET /api/logs?limit=100&prefix=2023-01&full=true
```

查询参数：
- `limit`: 返回的日志条目数量上限（默认100，最大1000）
- `prefix`: 按日志ID前缀筛选
- `full`: 设为`true`时返回完整日志内容，否则只返回日志ID列表

请求头：
```
Authorization: Bearer my-secure-api-logs-token-2025
```

**注意**：这个令牌值必须与`wrangler.toml`中设置的`API_LOGS_TOKEN`环境变量值相匹配。

## 安全注意事项

1. 在生产环境中，应使用更安全的认证方式保护日志API
2. 避免在日志中存储敏感个人信息
3. 定期清理旧日志，避免KV存储空间过大
4. 考虑设置日志过期时间
5. 使用复杂的随机令牌，并定期更换

## 日志管理

清理旧日志：
```bash
# 列出所有日志键
wrangler kv:key list --binding=chinese-grammar-checker-LOGS

# 删除特定日志
wrangler kv:key delete --binding=chinese-grammar-checker-LOGS "log-key-to-delete"
```

## 故障排除

如果日志记录不工作：

1. 检查KV命名空间是否正确配置
2. 确认Worker有权限访问KV命名空间
3. 查看Worker错误日志
4. 确保使用`waitUntil`方法异步写入日志 