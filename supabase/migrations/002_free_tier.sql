-- ============================================================
-- Free Tier: add plan & message quota columns to properties
-- ============================================================

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS plan text NOT NULL DEFAULT 'free'
    CHECK (plan IN ('free', 'starter', 'pro', 'enterprise')),
  ADD COLUMN IF NOT EXISTS messages_used int NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS messages_quota int NOT NULL DEFAULT 200,
  ADD COLUMN IF NOT EXISTS messages_reset_at timestamptz NOT NULL
    DEFAULT (date_trunc('month', now()) + interval '1 month');

-- Update new-user trigger to include plan fields
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO properties (
    user_id, name, type,
    plan, messages_used, messages_quota, messages_reset_at
  )
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'property_name', 'Cơ sở của tôi'),
    COALESCE(new.raw_user_meta_data->>'property_type', 'hotel'),
    'free',
    0,
    200,
    date_trunc('month', now()) + interval '1 month'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Monthly reset function (call via cron or pg_cron)
CREATE OR REPLACE FUNCTION reset_monthly_message_quota()
RETURNS void AS $$
BEGIN
  UPDATE properties
  SET
    messages_used = 0,
    messages_reset_at = date_trunc('month', now()) + interval '1 month'
  WHERE
    plan = 'free'
    AND messages_reset_at <= now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
