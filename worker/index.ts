type KVNamespace = /*unresolved*/ any

export interface Env {
  // 如果有绑定，在这里声明它们
  LOGS: KVNamespace;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: any
  ): Promise<Response> {
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
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const data = await request.json();
      
      // 生成唯一的日志 ID
      const logId = `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      // 记录日志到 KV
      await env.LOGS.put(logId, JSON.stringify({
        timestamp: new Date().toISOString(),
        data: data,
        userAgent: request.headers.get('User-Agent'),
        ip: request.headers.get('CF-Connecting-IP')
      }));
      
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
      // 记录错误
      const errorId = `error_${Date.now()}`;
      await env.LOGS.put(errorId, JSON.stringify({
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      }));
      
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