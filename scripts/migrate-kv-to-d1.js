// 从KV迁移日志到D1数据库的脚本
// 使用方法: node scripts/migrate-kv-to-d1.js

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 配置
const KV_NAMESPACE = 'chinese-grammar-checker-LOGS';
const D1_DATABASE = 'grammar-checker-logs';
const BATCH_SIZE = 100; // 每批处理的日志数量
const OUTPUT_DIR = path.join(__dirname, '../temp-migration');

// 确保临时目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 获取所有KV日志键
async function getAllKVKeys() {
  console.log('获取KV日志键列表...');
  
  try {
    const result = execSync(`wrangler kv:key list --binding=${KV_NAMESPACE} --json`).toString();
    const keys = JSON.parse(result);
    console.log(`找到 ${keys.length} 个KV日志键`);
    return keys;
  } catch (error) {
    console.error('获取KV键列表失败:', error.message);
    process.exit(1);
  }
}

// 获取KV日志值
async function getKVValue(key) {
  try {
    const result = execSync(`wrangler kv:key get --binding=${KV_NAMESPACE} "${key}" --json`).toString();
    return JSON.parse(result);
  } catch (error) {
    console.error(`获取键 "${key}" 的值失败:`, error.message);
    return null;
  }
}

// 将日志批量写入D1
async function writeBatchToD1(batch) {
  const sqlFile = path.join(OUTPUT_DIR, 'batch-insert.sql');
  
  // 创建SQL插入语句
  let sql = '';
  for (const log of batch) {
    if (!log.value) continue;
    
    const {
      id,
      timestamp,
      path,
      method,
      clientIP,
      userAgent,
      status,
      message,
      requestData,
      error,
      source,
      processingTime
    } = log.value;
    
    // 处理可能的NULL值和转义字符串
    const safeStr = (str) => str ? `'${str.replace(/'/g, "''")}'` : 'NULL';
    const safeJson = (obj) => obj ? `'${JSON.stringify(obj).replace(/'/g, "''")}'` : 'NULL';
    const safeNum = (num) => num !== undefined && num !== null ? num : 'NULL';
    
    sql += `INSERT OR IGNORE INTO logs (
      id, timestamp, path, method, clientIP, userAgent, 
      status, message, requestData, error, source, processingTime
    ) VALUES (
      '${log.key}',
      ${safeStr(timestamp)},
      ${safeStr(path)},
      ${safeStr(method)},
      ${safeStr(clientIP)},
      ${safeStr(userAgent)},
      ${safeNum(status)},
      ${safeStr(message)},
      ${safeJson(requestData)},
      ${safeStr(error)},
      ${safeStr(source)},
      ${safeNum(processingTime)}
    );\n`;
  }
  
  // 写入SQL文件
  fs.writeFileSync(sqlFile, sql);
  
  // 执行SQL
  try {
    execSync(`wrangler d1 execute ${D1_DATABASE} --file=${sqlFile}`);
    console.log(`成功迁移 ${batch.length} 条日志到D1`);
    return true;
  } catch (error) {
    console.error('执行D1批量插入失败:', error.message);
    return false;
  }
}

// 主函数
async function migrateKVToD1() {
  console.log('开始从KV迁移日志到D1...');
  
  // 获取所有KV键
  const keys = await getAllKVKeys();
  
  // 分批处理
  const batches = [];
  for (let i = 0; i < keys.length; i += BATCH_SIZE) {
    batches.push(keys.slice(i, i + BATCH_SIZE));
  }
  
  console.log(`将分 ${batches.length} 批处理，每批 ${BATCH_SIZE} 条日志`);
  
  // 处理每一批
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < batches.length; i++) {
    console.log(`处理批次 ${i + 1}/${batches.length}...`);
    
    // 获取每个键的值
    const batch = [];
    for (const key of batches[i]) {
      const value = await getKVValue(key.name);
      batch.push({
        key: key.name,
        value: value
      });
    }
    
    // 写入D1
    const success = await writeBatchToD1(batch);
    if (success) {
      successCount += batch.length;
    } else {
      failCount += batch.length;
    }
  }
  
  console.log('迁移完成!');
  console.log(`成功: ${successCount} 条日志`);
  console.log(`失败: ${failCount} 条日志`);
  
  // 清理临时文件
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
}

// 执行迁移
migrateKVToD1().catch(error => {
  console.error('迁移过程中出错:', error);
  process.exit(1);
}); 