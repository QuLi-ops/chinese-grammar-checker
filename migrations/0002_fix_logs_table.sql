-- 删除旧表
DROP TABLE IF EXISTS logs;

-- 创建新表
CREATE TABLE logs (
  id TEXT PRIMARY KEY,
  clientIP TEXT,
  inputText TEXT,        -- 用户输入的原始文本
  rawContent TEXT,       -- AI的原始响应
  markedText TEXT,       -- 标记错误的文本
  explanations TEXT,     -- 错误解释(JSON格式)
  correctedText TEXT,    -- 修正后的文本
  result TEXT,          -- 最终结果(JSON格式)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 