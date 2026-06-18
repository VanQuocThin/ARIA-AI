-- Properties (hotels, restaurants, etc.)
create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  type text not null check (type in ('hotel', 'restaurant', 'spa', 'cafe')),
  address text not null default '',
  phone text not null default '',
  description text not null default '',
  ai_persona_name text not null default 'ARIA',
  ai_greeting text not null default 'Xin chào! Tôi là ARIA, tôi có thể giúp gì cho bạn?',
  working_hours_start text not null default '07:00',
  working_hours_end text not null default '22:00',
  auto_reply boolean not null default true,
  zalo_oa_id text,
  facebook_page_id text,
  created_at timestamptz not null default now()
);

alter table properties enable row level security;
create policy "Users manage own properties" on properties
  for all using (auth.uid() = user_id);

-- Conversations
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id) on delete cascade not null,
  channel text not null check (channel in ('zalo', 'facebook', 'widget', 'phone')),
  customer_name text,
  customer_phone text,
  customer_id_external text,
  status text not null default 'open' check (status in ('open', 'resolved', 'escalated')),
  last_message text not null default '',
  last_message_at timestamptz not null default now(),
  unread_count int not null default 0,
  created_at timestamptz not null default now()
);

alter table conversations enable row level security;
create policy "Users access own conversations" on conversations
  for all using (
    property_id in (select id from properties where user_id = auth.uid())
  );

-- Messages
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  created_at timestamptz not null default now()
);

alter table messages enable row level security;
create policy "Users access own messages" on messages
  for all using (
    conversation_id in (
      select c.id from conversations c
      join properties p on p.id = c.property_id
      where p.user_id = auth.uid()
    )
  );

-- Bookings
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id) on delete cascade not null,
  conversation_id uuid references conversations(id),
  customer_name text not null,
  customer_phone text not null,
  booking_type text not null check (booking_type in ('room', 'table', 'service')),
  date date not null,
  time time,
  guests int,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table bookings enable row level security;
create policy "Users manage own bookings" on bookings
  for all using (
    property_id in (select id from properties where user_id = auth.uid())
  );

-- Leads
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id) on delete cascade not null,
  name text,
  phone text,
  channel text not null,
  interest text not null default '',
  status text not null default 'new' check (status in ('new', 'contacted', 'converted', 'lost')),
  created_at timestamptz not null default now()
);

alter table leads enable row level security;
create policy "Users manage own leads" on leads
  for all using (
    property_id in (select id from properties where user_id = auth.uid())
  );

-- Create property on signup trigger
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into properties (user_id, name, type)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'property_name', 'Cơ sở của tôi'),
    coalesce(new.raw_user_meta_data->>'property_type', 'hotel')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
