// 导入Cloudflare Workers类型
import { KVNamespace, KVNamespaceListOptions, D1Database } from '@cloudflare/workers-types';

export interface Env {
  // KV命名空间绑定
  "chinese-grammar-checker-LOGS": KVNamespace;
  // 环境变量
  API_LOGS_TOKEN: string;
  // D1数据库绑定
  DB: D1Database;
}

// 生成唯一的日志ID
function generateLogId(): string {
  return Date.now().toString() + '-' + Math.random().toString(36).substring(2, 15);
}

// 获取北京时间的ISO字符串
function getBeijingTime(): string {
  const now = new Date();
  // 获取UTC时间的毫秒数
  const utcTime = now.getTime();
  // 北京时间比UTC早8小时，所以加上8小时的毫秒数
  const beijingTime = new Date(utcTime + 8 * 60 * 60 * 1000);
  // 返回ISO格式的字符串
  return beijingTime.toISOString();
}

// 确保日志表存在
async function ensureLogTableExists(db: D1Database): Promise<void> {
  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS logs (
        id TEXT PRIMARY KEY,
        clientIP TEXT,
        inputText TEXT,        -- 用户输入的原始文本
        rawContent TEXT,       -- AI的原始响应
        markedText TEXT,       -- 标记错误的文本
        explanations TEXT,     -- 错误解释(JSON格式)
        correctedText TEXT,    -- 修正后的文本
        result TEXT,          -- 最终结果(JSON格式)
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('确保日志表存在');
  } catch (error) {
    console.error('创建日志表时出错:', error);
    throw error;
  }
}

// 将日志写入D1数据库
async function writeLogToD1(db: D1Database, logId: string, logEntry: any): Promise<void> {
  try {
    // 将对象转换为适合SQL插入的格式
    const {
      clientIP,
      inputText,
      rawContent,
      markedText,
      explanations,
      correctedText,
      result
    } = logEntry;

    // 将对象转换为JSON字符串
    const explanationsStr = explanations ? JSON.stringify(explanations) : null;
    const resultStr = result ? JSON.stringify(result) : null;

    await db.prepare(`
      INSERT INTO logs (
        id, clientIP, inputText, rawContent, markedText, explanations, correctedText, result
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      logId,
      clientIP || null,
      inputText || null,
      rawContent || null,
      markedText || null,
      explanationsStr,
      correctedText || null,
      resultStr
    ).run();
    
    console.log(`日志已写入D1，ID: ${logId}`);
  } catch (error) {
    console.error(`写入日志到D1时出错:`, error);
    throw error;
  }
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: any
  ): Promise<Response> {
    // 记录请求开始时间
    const startTime = Date.now();
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    const userAgent = request.headers.get('User-Agent') || 'unknown';
    
    // 添加调试日志
    console.log(`处理请求: ${method} ${path}`);
    console.log(`D1绑定是否存在: ${"DB" in env}`);
    
    // 确保日志表存在
    try {
      await ensureLogTableExists(env.DB);
    } catch (error) {
      console.error('确保日志表存在时出错:', error);
      // 继续执行，不要因为表创建失败而中断请求处理
    }
    
    // 添加测试端点，测试D1数据库
    if (path === '/api/test-d1') {
      try {
        const testId = 'test-' + Date.now();
        const testEntry = {
          clientIP: request.headers.get('CF-Connecting-IP') || '未知',
          inputText: '这是测试输入',
          rawContent: '这是AI的原始响应',
          markedText: '这是<mark>测试</mark>内容',
          explanations: { test: '这是测试解释' },
          correctedText: '这是测试内容',
          result: { success: true }
        };
        
        console.log(`测试D1写入，ID: ${testId}`);
        await writeLogToD1(env.DB, testId, testEntry);
        
        // 读取最近的10条日志
        const logs = await env.DB.prepare(`
          SELECT * FROM logs 
          ORDER BY created_at DESC 
          LIMIT 10
        `).all();
        
        return new Response(JSON.stringify({
          success: true,
          testId,
          written: testEntry,
          recentLogs: logs
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        console.error(`测试D1时出错:`, error);
        return new Response(JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    // 处理日志查询API
    if (path === '/api/logs') {
      // 处理 POST 请求 - 接收来自 Next.js API 路由的日志
      if (method === 'POST') {
        // 使用环境变量中的令牌进行认证检查
        const authHeader = request.headers.get('Authorization');
        const expectedToken = env.API_LOGS_TOKEN || 'my-secure-api-logs-token-2025'; // 如果环境变量未设置，使用默认值
        if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
          return new Response('Unauthorized', { status: 401 });
        }
        
        try {
          const data = await request.json();
          
          // 添加额外的日志信息
          const logEntry = {
            clientIP,
            inputText: data.inputText,
            rawContent: data.rawContent,
            markedText: data.markedText,
            explanations: data.explanations,
            correctedText: data.correctedText,
            result: data.result
          };
          
          // 生成日志ID并存储日志
          const logId = generateLogId();
          console.log(`接收到来自 Next.js API 的日志:`, logEntry);
          
          // 使用D1存储日志
          await writeLogToD1(env.DB, logId, logEntry);
          console.log(`成功存储 Next.js API 日志，ID: ${logId}`);
          
          return new Response(JSON.stringify({ 
            success: true, 
            message: 'Log stored successfully',
            logId
          }), {
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error) {
          console.error(`存储 Next.js API 日志时出错:`, error);
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: error instanceof Error ? error.message : 'Unknown error' 
            }),
            { 
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
      }
      
      // 只允许GET请求查询日志
      if (method !== 'GET') {
        return new Response('Method not allowed', { status: 405 });
      }
      
      // 使用环境变量中的令牌进行认证检查
      const authHeader = request.headers.get('Authorization');
      const expectedToken = env.API_LOGS_TOKEN || 'my-secure-api-logs-token-2025'; // 如果环境变量未设置，使用默认值
      if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
        return new Response('Unauthorized', { status: 401 });
      }
      
      try {
        // 获取查询参数
        const limit = parseInt(url.searchParams.get('limit') || '100');
        const offset = parseInt(url.searchParams.get('offset') || '0');
        
        // 构建SQL查询
        let sql = `SELECT * FROM logs`;
        const conditions = [];
        const params = [];
        
        // 移除type, startDate, endDate等条件检查，因为相关字段已被移除
        // 只保留limit和offset参数
        
        // 更新排序方式
        sql += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
        params.push(limit, offset);
        
        console.log(`执行SQL查询:`, sql, params);
        
        // 执行查询
        const stmt = env.DB.prepare(sql);
        const result = await stmt.bind(...params).all();
        
        return new Response(JSON.stringify(result), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        console.error(`获取日志时出错:`, error);
        return new Response(
          JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
          { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }
    
    // 处理 CORS 预检请求
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    // 只接受 POST 请求
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const data = await request.json();
      
      // 中文语法检查逻辑
      const response = {
        original: data.text,
        corrected: data.text, // 实际应用中这里会是修正后的文本
        errors: [],           // 实际应用中这里会包含错误信息
        success: true
      };

      return new Response(JSON.stringify(response), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: error instanceof Error ? error.message : "Unknown error" 
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  },
}; 