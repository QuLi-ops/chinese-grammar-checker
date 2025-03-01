// 导入Cloudflare Workers类型
import { KVNamespace, KVNamespaceListOptions } from '@cloudflare/workers-types';

export interface Env {
  // KV命名空间绑定
  "chinese-grammar-checker-LOGS": KVNamespace;
  // 环境变量
  API_LOGS_TOKEN: string;
}

// 生成唯一的日志ID
function generateLogId(): string {
  return Date.now().toString() + '-' + Math.random().toString(36).substring(2, 15);
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
    
    // 处理日志查询API
    if (path === '/api/logs') {
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
        const prefix = url.searchParams.get('prefix') || '';
        
        // 列出日志条目
        const listOptions: KVNamespaceListOptions = {
          limit: Math.min(limit, 1000), // 限制最大返回数量
        };
        
        if (prefix) {
          listOptions.prefix = prefix;
        }
        
        const logsList = await env["chinese-grammar-checker-LOGS"].list(listOptions);
        
        // 如果需要获取完整日志内容
        if (url.searchParams.get('full') === 'true') {
          const logEntries = await Promise.all(
            logsList.keys.map(async (key) => {
              const value = await env["chinese-grammar-checker-LOGS"].get(key.name);
              return {
                key: key.name,
                value: value ? JSON.parse(value) : null
              };
            })
          );
          
          return new Response(JSON.stringify(logEntries), {
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // 否则只返回键列表
        return new Response(JSON.stringify(logsList), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
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
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // 只接受 POST 请求
    if (request.method !== "POST") {
      // 记录非法请求日志
      const logEntry = {
        timestamp: new Date().toISOString(),
        path,
        method,
        clientIP,
        userAgent,
        status: 405,
        message: "Method not allowed",
        processingTime: Date.now() - startTime
      };
      
      // 使用waitUntil确保日志写入不会阻塞响应
      ctx.waitUntil(env["chinese-grammar-checker-LOGS"].put(generateLogId(), JSON.stringify(logEntry)));
      
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

      // 记录成功请求日志
      const logEntry = {
        timestamp: new Date().toISOString(),
        path,
        method,
        clientIP,
        userAgent,
        status: 200,
        requestData: { text: data.text.substring(0, 100) + (data.text.length > 100 ? '...' : '') }, // 只记录部分文本
        processingTime: Date.now() - startTime
      };
      
      // 使用waitUntil确保日志写入不会阻塞响应
      ctx.waitUntil(env["chinese-grammar-checker-LOGS"].put(generateLogId(), JSON.stringify(logEntry)));

      return new Response(JSON.stringify(response), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      // 记录错误日志
      const logEntry = {
        timestamp: new Date().toISOString(),
        path,
        method,
        clientIP,
        userAgent,
        status: 400,
        error: error instanceof Error ? error.message : "Unknown error",
        processingTime: Date.now() - startTime
      };
      
      // 使用waitUntil确保日志写入不会阻塞响应
      ctx.waitUntil(env["chinese-grammar-checker-LOGS"].put(generateLogId(), JSON.stringify(logEntry)));
      
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