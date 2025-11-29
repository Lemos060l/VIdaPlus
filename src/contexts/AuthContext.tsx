import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, UserProfile, AuthUser } from '../lib/supabase';

type AuthContextType = {
  user: AuthUser | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, profile: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();

        if (sessionData.session?.user) {
          const authUser = {
            id: sessionData.session.user.id,
            email: sessionData.session.user.email || '',
            user_metadata: sessionData.session.user.user_metadata,
          };
          setUser(authUser);

          const { data: profileData, error: profileError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', sessionData.session.user.id)
            .maybeSingle();

          if (profileError) {
            console.error('Error fetching profile:', profileError);
            setError('Erro ao carregar perfil do usuário');
          } else if (profileData) {
            setProfile(profileData as UserProfile);
          }
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        setError('Erro ao inicializar autenticação');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const authUser = {
          id: session.user.id,
          email: session.user.email || '',
          user_metadata: session.user.user_metadata,
        };
        setUser(authUser);

        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
        } else if (profileData) {
          setProfile(profileData as UserProfile);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    profileData: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>
  ) => {
    try {
      setError(null);

      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          throw new Error('Este email já está registrado');
        }
        throw signUpError;
      }

      if (!authData.user?.id) {
        throw new Error('Erro ao criar usuário');
      }

      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: authData.user.id,
          ...profileData,
        });

      if (profileError) {
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw profileError;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao cadastrar usuário';
      setError(message);
      throw err;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          throw new Error('Email ou senha incorretos');
        }
        throw signInError;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(message);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);

      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        throw signOutError;
      }

      setUser(null);
      setProfile(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao fazer logout';
      setError(message);
      throw err;
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut, error, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
