-- Fix trigger để không crash khi lỗi
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO properties (user_id, name, type, plan)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'property_name', 'Cơ sở của tôi'),
    COALESCE(NEW.raw_user_meta_data->>'property_type', 'hotel'),
    'free'
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();
