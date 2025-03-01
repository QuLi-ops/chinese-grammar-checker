// 创建KV命名空间的脚本
// 使用方法: node scripts/create-kv-namespace.js

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 创建KV命名空间
console.log('创建KV命名空间...');
try {
  // 创建生产环境KV命名空间
  const prodResult = execSync('npx wrangler kv:namespace create API_LOGS').toString();
  console.log('生产环境KV命名空间创建成功!');
  console.log(prodResult);
  
  // 从输出中提取KV命名空间ID
  const prodIdMatch = prodResult.match(/id\s*=\s*"([^"]+)"/);
  const prodId = prodIdMatch ? prodIdMatch[1] : null;
  
  // 创建预览环境KV命名空间
  const previewResult = execSync('npx wrangler kv:namespace create API_LOGS --preview').toString();
  console.log('预览环境KV命名空间创建成功!');
  console.log(previewResult);
  
  // 从输出中提取预览KV命名空间ID
  const previewIdMatch = previewResult.match(/preview_id\s*=\s*"([^"]+)"/);
  const previewId = previewIdMatch ? previewIdMatch[1] : null;
  
  if (prodId && previewId) {
    // 读取wrangler.toml文件
    const wranglerPath = path.join(__dirname, '..', 'wrangler.toml');
    let wranglerContent = fs.readFileSync(wranglerPath, 'utf8');
    
    // 更新KV命名空间配置
    const kvConfig = `
# KV命名空间配置
[[kv_namespaces]]
binding = "API_LOGS" # 在Worker中使用的变量名
id = "${prodId}" # 生产环境KV命名空间ID
preview_id = "${previewId}" # 预览环境KV命名空间ID
`;
    
    // 检查是否已有KV配置
    if (wranglerContent.includes('[[kv_namespaces]]')) {
      console.log('wrangler.toml中已存在KV配置，请手动更新ID。');
      console.log(`生产环境ID: ${prodId}`);
      console.log(`预览环境ID: ${previewId}`);
    } else {
      // 添加KV配置到wrangler.toml
      wranglerContent += kvConfig;
      fs.writeFileSync(wranglerPath, wranglerContent);
      console.log('已自动更新wrangler.toml文件。');
    }
    
    console.log('\n配置完成! 现在你可以使用KV存储API日志了。');
  } else {
    console.error('无法从命令输出中提取KV命名空间ID。');
  }
} catch (error) {
  console.error('创建KV命名空间时出错:', error.message);
  console.error('请确保已安装并登录Wrangler CLI。');
  console.error('可以通过运行 `npx wrangler login` 来登录。');
} 