import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { validators } from '../lib/validators';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (role: 'patient' | 'doctor', name: string) => void;
  onNavigateToRegister: () => void;
}

export default function LoginScreen({ onLogin, onNavigateToRegister }: LoginScreenProps) {
  const { signIn, profile, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validators.email(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!password) {
      newErrors.password = 'Senha obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await signIn(email, password);

      if (profile) {
        onLogin(profile.user_type, profile.full_name);
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-4xl font-bold text-center text-teal-700 mb-2">VidaPlus</h1>
        <p className="text-gray-600 text-center text-sm mb-8">Faça login na sua conta</p>

        {authError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded flex gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{authError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.email;
                    return newErrors;
                  });
                }
              }}
              className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors(prev => {
                      const newErrors = { ...prev };
                      delete newErrors.password;
                      return newErrors;
                    });
                  }
                }}
                className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors pr-10 ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-3 rounded font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'LOGIN'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <button className="text-gray-400 text-sm hover:text-gray-600">
            Esqueceu sua senha?
          </button>

          <div className="pt-3 border-t border-gray-200">
            <button
              onClick={onNavigateToRegister}
              className="text-gray-700 hover:text-gray-900 text-sm"
            >
              Não tem uma conta? <span className="font-semibold">Cadastrar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
