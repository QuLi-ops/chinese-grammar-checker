# 使用Cloudflare D1数据库存储日志

本项目使用Cloudflare D1数据库来存储和查询应用日志。D1是Cloudflare的SQL数据库服务，提供了更好的查询能力和可读性，相比KV存储更适合结构化数据。

## 日志类型

系统只存储以下三种类型的日志：

1. **AI Raw Response** (`ai_raw_response`) - AI模型的原始响应内容
2. **Parsed AI Response** (`ai_parsed_response`) - 解析后的AI响应，包含错误标记和解释
3. **Final Result** (`final_result`) - 最终处理结果

## 部署步骤

### 1. 创建D1数据库

如果你还没有创建D1数据库，请运行以下命令：

```bash
wrangler d1 create grammar-checker-logs
```

命令输出会包含数据库ID，类似于：

```
✅ Successfully created DB 'grammar-checker-logs' in region 'enam'
Created D1 database 'grammar-checker-logs' (14bba2f0-7764-4982-b1b5-81743472db41)
```

### 2. 更新wrangler.toml配置

将输出的数据库ID复制到`wrangler.toml`文件中：

```toml
[[d1_databases]]
binding = "DB"
database_name = "grammar-checker-logs"
database_id = "你的数据库ID" # 替换为实际的数据库ID
migrations_dir = "migrations"
```

### 3. 应用数据库迁移

运行以下命令应用数据库迁移，创建必要的表结构：

```bash
wrangler d1 migrations apply grammar-checker-logs
```

### 4. 部署Worker

运行以下命令部署Worker：

```bash
wrangler deploy
```

## 日志表结构

日志表(`logs`)包含以下字段：

| 字段名 | 类型 | 描述 |
|-------|------|------|
| id | TEXT | 主键，唯一标识符 |
| clientIP | TEXT | 客户端IP地址 |
| rawContent | TEXT | 原始文本内容 |
| markedText | TEXT | 标记错误的文本 |
| explanations | TEXT | 错误解释(JSON格式) |
| correctedText | TEXT | 修正后的文本 |
| result | TEXT | 结果(JSON格式) |
| created_at | TIMESTAMP | 记录创建时间 |

## 查询日志

可以通过`/api/logs`端点查询日志，支持以下查询参数：

- `limit`: 返回的最大记录数(默认100)
- `offset`: 分页偏移量(默认0)

示例请求：

```
GET /api/logs?limit=50&offset=0
```

## 测试D1连接

可以通过`/api/test-d1`端点测试D1数据库连接：

```
GET /api/test-d1
```

响应将包含测试日志ID、写入的数据以及最近的10条日志记录。

## 从KV迁移到D1

本项目已从KV存储迁移到D1数据库。如果你有大量历史日志存储在KV中，可以考虑编写迁移脚本将数据从KV导入到D1。

## 故障排除

如果遇到D1相关问题，请检查：

1. 确保数据库ID正确配置在`wrangler.toml`中
2. 确保已应用数据库迁移
3. 检查Worker日志中的错误信息
4. 尝试使用`/api/test-d1`端点测试数据库连接 