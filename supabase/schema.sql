create extension if not exists "uuid-ossp";

create table profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text not null default 'Learner',
  created_at timestamptz default now()
);

create table progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  week int not null,
  day int not null,
  phase text not null,
  completed boolean default false,
  attempts int default 0,
  completed_at timestamptz,
  unique(user_id, week, day, phase)
);

create table session_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  week int not null,
  day int not null,
  phase text not null,
  messages jsonb not null default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, week, day, phase)
);

alter table profiles enable row level security;
alter table progress enable row level security;
alter table session_logs enable row level security;

create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can view own progress" on progress for select using (auth.uid() = user_id);
create policy "Users can insert own progress" on progress for insert with check (auth.uid() = user_id);
create policy "Users can update own progress" on progress for update using (auth.uid() = user_id);
create policy "Users can view own session logs" on session_logs for select using (auth.uid() = user_id);
create policy "Users can insert own session logs" on session_logs for insert with check (auth.uid() = user_id);
create policy "Users can update own session logs" on session_logs for update using (auth.uid() = user_id);

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, display_name)
  values (new.id, split_part(new.email, '@', 1));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();