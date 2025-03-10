-- 删除旧表
DROP TABLE IF EXISTS logs;

-- 创建新表
CREATE TABLE logs (
  id TEXT PRIMARY KEY,
  clientIP TEXT,
  rawContent TEXT,
  markedText TEXT,
  explanations TEXT,
  correctedText TEXT,
  result TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 