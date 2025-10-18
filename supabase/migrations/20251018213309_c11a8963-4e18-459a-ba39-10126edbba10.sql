-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create users table
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  auth_provider text check (auth_provider in ('google', 'microsoft', 'email')),
  email text unique not null,
  display_name text,
  photo_url text,
  dob date,
  time_zone text default 'America/Santiago',
  data_consent boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS on users
alter table public.users enable row level security;

-- RLS policies for users
create policy "Users can view their own data"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can insert their own data"
  on public.users for insert
  with check (auth.uid() = id);

create policy "Users can update their own data"
  on public.users for update
  using (auth.uid() = id);

-- Create trigger to auto-create user profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, display_name, photo_url, auth_provider)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url',
    coalesce(new.raw_user_meta_data->>'provider', 'email')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create numerology archetypes table
create table if not exists public.numerology_archetypes (
  id text primary key,
  title text not null,
  strengths text,
  challenges text,
  breathing text not null,
  affirmation text not null,
  extras jsonb,
  updated_at timestamptz default now()
);

-- Enable RLS on archetypes (public read, admin write)
alter table public.numerology_archetypes enable row level security;

create policy "Anyone can view archetypes"
  on public.numerology_archetypes for select
  using (true);

-- Insert default numerology archetypes
insert into public.numerology_archetypes (id, title, strengths, challenges, breathing, affirmation, extras) values
('1', 'Iniciador', 'Enfoque, liderazgo, iniciativa', 'Tensión por control', '4-7-8', 'Respiro y confío en mi ritmo', '{"color": "#FF6B6B"}'),
('2', 'Cooperador', 'Sensibilidad, cooperación, diplomacia', 'Ansiedad social', 'coherente', 'Me escucho con amabilidad', '{"color": "#4ECDC4"}'),
('3', 'Expresivo', 'Alegría, creatividad, expresión', 'Dispersión mental', 'box', 'Centro mi energía con calma', '{"color": "#FFD93D"}'),
('4', 'Constructor', 'Estabilidad, orden, disciplina', 'Rigidez', '4-4-6', 'Flexibilizo mi estructura con suavidad', '{"color": "#95E1D3"}'),
('5', 'Explorador', 'Libertad, adaptabilidad, curiosidad', 'Inquietud constante', 'coherente', 'Encuentro calma en el movimiento', '{"color": "#A8E6CF"}'),
('6', 'Cuidador', 'Responsabilidad, servicio, armonía', 'Sobre-exigencia', '4-7-8', 'Me permito recibir tanto como doy', '{"color": "#FFB6B9"}'),
('7', 'Buscador', 'Análisis, introspección, sabiduría', 'Aislamiento', 'coherente', 'Confío en mi intuición profunda', '{"color": "#B4A7D6"}'),
('8', 'Realizador', 'Poder, logro, manifestación', 'Presión por resultados', 'box', 'Mi valor no depende de mis logros', '{"color": "#FFDAC1"}'),
('9', 'Humanitario', 'Compasión, altruismo, visión', 'Dificultad para soltar', '4-7-8', 'Libero con amor lo que ya no sirve', '{"color": "#C7CEEA"}'),
('11', 'Maestro Iluminador', 'Intuición elevada, inspiración', 'Hipersensibilidad', 'coherente', 'Canalizo mi luz con serenidad', '{"color": "#E2F0CB"}'),
('22', 'Maestro Constructor', 'Visión práctica, construcción masiva', 'Presión extrema', '4-4-6', 'Construyo mi visión paso a paso', '{"color": "#FFEAA7"}'),
('33', 'Maestro Sanador', 'Amor universal, sanación colectiva', 'Carga emocional intensa', '4-7-8', 'Mi amor incluye cuidarme a mí', '{"color": "#DFE6E9"}');

-- Create numerology reports table
create table if not exists public.numerology_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  full_name text not null,
  dob date not null,
  life_path text not null,
  expression_number text not null,
  soul_urge text not null,
  personality text not null,
  personal_year text not null,
  recommendations jsonb,
  raw_calc jsonb,
  created_at timestamptz default now()
);

-- Enable RLS on numerology reports
alter table public.numerology_reports enable row level security;

-- RLS policies for numerology reports
create policy "Users can view their own reports"
  on public.numerology_reports for select
  using (auth.uid() = user_id);

create policy "Users can insert their own reports"
  on public.numerology_reports for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own reports"
  on public.numerology_reports for update
  using (auth.uid() = user_id);

create policy "Users can delete their own reports"
  on public.numerology_reports for delete
  using (auth.uid() = user_id);

-- Update timestamp function
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Add trigger for users table
create trigger update_users_updated_at
  before update on public.users
  for each row
  execute function public.update_updated_at_column();