import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';

// 创建中间件，处理国际化路由
export default createMiddleware({
  // 支持的语言列表
  locales: ['en', 'zh', 'ja'],
  // 默认语言
  defaultLocale: 'en',
  // 禁用自动语言检测
  localeDetection: false,
});

const LOG_WORKER_URL = process.env.LOG_WORKER_URL || 'https://chinese-grammar-checker.your-subdomain.workers.dev';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  // 处理 API 请求的日志记录
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const requestId = crypto.randomUUID();
    const startTime = Date.now();
    
    // 克隆请求以便可以读取请求体
    const requestClone = request.clone();
    let requestBody;
    try {
      requestBody = await requestClone.json();
    } catch {
      // 忽略错误，将 requestBody 设为 null
      requestBody = null;
    }
    
    // 发送请求日志
    try {
      await fetch(LOG_WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'request',
          requestId,
          timestamp: new Date().toISOString(),
          path: request.nextUrl.pathname,
          method: request.method,
          data: requestBody
        }),
      });
    } catch (error) {
      console.error('Failed to send log to Worker:', error);
    }
    
    // 继续处理请求
    const response = NextResponse.next();
    
    // 使用 event.waitUntil 而不是 response.waitUntil
    event.waitUntil(
      fetch(LOG_WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'response',
          requestId,
          timestamp: new Date().toISOString(),
          duration: Date.now() - startTime,
          path: request.nextUrl.pathname,
          status: response.status
        }),
      }).catch(error => console.error('Failed to send log to Worker:', error))
    );
    
    return response;
  }
  
  // 处理国际化路径
  // 这里是国际化路径处理逻辑
  // 例如：检测用户语言、重定向到正确的语言路径等
  // 注意：这部分代码取决于您的国际化实现方式
  
  return NextResponse.next();
}

// 正确的 config 导出格式，同时匹配 API 路径和国际化路径
export const config = {
  matcher: [
    '/api/:path*',           // 匹配所有 API 路径，用于日志记录
    '/((?!api|_next|.*\\..*).*)'  // 匹配所有需要国际化的路径（排除 API、_next 和静态文件）
  ]
}; 
