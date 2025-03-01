import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

export async function middleware(request: NextRequest) {
  // 只处理 API 请求
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const requestId = crypto.randomUUID();
    const startTime = Date.now();
    
    // 克隆请求以便可以读取请求体
    const requestClone = request.clone();
    let requestBody;
    try {
      requestBody = await requestClone.json();
    } catch (e) {
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
    
    // 在响应返回后记录响应日志
    // NextResponse 没有 waitUntil 方法，直接发送日志请求
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
      }).catch(error => console.error('Failed to send log to Worker:', error));
    
    
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  // 匹配所有需要国际化的路径
  matcher: ['/((?!api|_next|.*\\..*).*)'],
  middleware: [middleware],
}; 