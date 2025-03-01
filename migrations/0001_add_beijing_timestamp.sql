-- 添加北京时间时间戳列
ALTER TABLE logs ADD COLUMN beijingTimestamp TEXT;

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_logs_beijing_timestamp ON logs (beijingTimestamp); 