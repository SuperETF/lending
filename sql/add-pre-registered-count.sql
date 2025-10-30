-- Add pre_registered_count column to running_sessions table
-- This column tracks the number of participants who registered outside of the website

ALTER TABLE running_sessions 
ADD COLUMN pre_registered_count INTEGER DEFAULT 0 NOT NULL;

-- Add comment to explain the column purpose
COMMENT ON COLUMN running_sessions.pre_registered_count IS 'Number of participants who registered outside of the website (e.g., through other channels)';
