-- 创建日志表
CREATE TABLE IF NOT EXISTS logs (
  id TEXT PRIMARY KEY,
  clientIP TEXT,
  rawContent TEXT,
  markedText TEXT,
  explanations TEXT,
  correctedText TEXT,
  result TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs (created_at); 