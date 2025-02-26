# 项目结构

## 概述

这是一个基于 Next.js 的中文语法检查器应用，使用了 App Router 和国际化功能。项目采用 TypeScript 开发，使用 Tailwind CSS 进行样式设计。

## 目录结构 
chinese-grammar-checker/
├── .next/ # Next.js 构建输出目录
├── public/ # 静态资源目录
├── src/ # 源代码目录
│ ├── app/ # Next.js App Router 目录
│ │ ├── [locale]/ # 国际化路由
│ │ │ ├── layout.tsx # 带有语言切换的布局组件
│ │ │ └── page.tsx # 主页面组件
│ │ ├── api/ # API 路由
│ │ │ └── grammar-check/ # 语法检查 API
│ │ │ └── route.ts # API 处理逻辑
│ │ ├── components/ # 应用组件
│ │ │ ├── GrammarInput.tsx # 语法输入组件
│ │ │ └── GrammarOutput.tsx # 语法输出组件
│ │ ├── globals.css # 全局样式
│ │ ├── layout.tsx # 根布局
│ │ └── types/ # 类型定义
│ │ └── grammar.ts # 语法相关类型
│ ├── components/ # 共享组件
│ │ ├── LanguageSwitcher.tsx # 语言切换组件
│ │ └── ui/ # UI 组件库
│ ├── i18n/ # 国际化配置
│ │ ├── config.ts # 国际化配置
│ │ └── request.ts # 国际化请求处理
│ ├── lib/ # 工具库
│ │ └── utils.ts # 通用工具函数
│ ├── messages/ # 国际化消息
│ │ ├── en/ # 英文翻译
│ │ │ └── common.json # 英文翻译文件
│ │ └── zh/ # 中文翻译
│ │ └── common.json # 中文翻译文件
│ └── middleware.ts # Next.js 中间件（处理国际化路由）
├── .eslintrc.json # ESLint 配置
├── components.json # UI 组件配置
├── next.config.ts # Next.js 配置
├── package.json # 项目依赖
├── README.md # 项目说明
├── tailwind.config.ts # Tailwind CSS 配置
└── tsconfig.json # TypeScript 配置


## 核心功能模块

### 1. 国际化 (i18n)

- 使用 `next-intl` 实现多语言支持
- 支持中文 (zh) 和英文 (en) 两种语言
- 通过 `[locale]` 动态路由参数实现语言切换
- 使用 `middleware.ts` 处理语言路由重定向

### 2. 语法检查功能

- `GrammarInput.tsx`: 用户输入界面，包含文本输入、语言选择和风格选择
- `GrammarOutput.tsx`: 显示语法检查结果，包括错误标记和修改建议
- `/api/grammar-check/route.ts`: 处理语法检查请求，与 OpenRouter API 交互

### 3. UI 组件

- 使用 shadcn/ui 组件库 (基于 Radix UI)
- 使用 Tailwind CSS 进行样式设计
- 响应式设计，适配不同设备尺寸

### 4. 页面结构

- 主页面包含语法检查工具和相关教育内容
- 内容分为多个部分：语法挑战、常见错误、写作风格指南等
- 所有内容支持国际化，根据用户选择的语言显示

## 技术栈

- **框架**: Next.js 15.1.7
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **国际化**: next-intl
- **UI 组件**: Radix UI
- **API 集成**: OpenRouter API (用于 AI 语法检查)
- **部署**: 可部署到 Vercel 平台

## 开发指南

1. 安装依赖: `npm install`
2. 开发模式: `npm run dev`
3. 构建项目: `npm run build`
4. 启动生产服务: `npm run start`