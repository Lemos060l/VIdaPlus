/*
  # Create Users and Profiles Tables

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `user_type` (text: 'patient' or 'doctor')
      - `full_name` (text)
      - `email` (text)
      - `cpf` (text, unique for patients)
      - `phone` (text)
      - `specialization` (text, for doctors)
      - `crm` (text, CRM number for doctors)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `user_profiles` table
    - Add policies for users to read/update their own profile
    - Add policy for authentication
    
  3. Important Notes
    - CPF is unique for patients to prevent duplicate registrations
    - CRM is unique for doctors
    - user_type defines role: 'patient' or 'doctor'
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type text NOT NULL CHECK (user_type IN ('patient', 'doctor')),
  full_name text NOT NULL,
  email text NOT NULL,
  cpf text,
  phone text,
  specialization text,
  crm text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_cpf UNIQUE NULLS NOT DISTINCT (cpf),
  CONSTRAINT unique_crm UNIQUE NULLS NOT DISTINCT (crm)
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_type ON user_profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_cpf ON user_profiles(cpf);
CREATE INDEX IF NOT EXISTS idx_user_profiles_crm ON user_profiles(crm);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow insert during signup"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);
