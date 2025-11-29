import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { validators, formatters } from '../lib/validators';
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

interface RegisterScreenProps {
  onBack: () => void;
}

type UserType = 'patient' | 'doctor';

export default function RegisterScreen({ onBack }: RegisterScreenProps) {
  const { signUp, error: authError } = useAuth();
  const [userType, setUserType] = useState<UserType>('patient');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cpf: '',
    phone: '',
    specialization: '',
    crm: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validators.fullName(formData.fullName)) {
      newErrors.fullName = 'Nome completo deve ter pelo menos 3 caracteres e sobrenome';
    }

    if (!validators.email(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (userType === 'patient' && !validators.cpf(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (!validators.phone(formData.phone)) {
      newErrors.phone = 'Telefone inválido (10-11 dígitos)';
    }

    if (userType === 'doctor') {
      if (!formData.specialization.trim()) {
        newErrors.specialization = 'Especialização obrigatória';
      }

      if (!validators.crm(formData.crm)) {
        newErrors.crm = 'CRM inválido (4-8 dígitos)';
      }
    }

    const passwordValidation = validators.password(formData.password);
    if (!passwordValidation.valid) {
      newErrors.password = `Senha deve conter: ${passwordValidation.errors.join(', ')}`;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não conferem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    let formattedValue = value;

    if (field === 'cpf') {
      formattedValue = formatters.cpf(value);
    } else if (field === 'phone') {
      formattedValue = formatters.phone(value);
    } else if (field === 'crm') {
      formattedValue = formatters.crm(value);
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }));

    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await signUp(formData.email, formData.password, {
        user_type: userType,
        full_name: formData.fullName,
        email: formData.email,
        cpf: userType === 'patient' ? formData.cpf : undefined,
        phone: formData.phone,
        specialization: userType === 'doctor' ? formData.specialization : undefined,
        crm: userType === 'doctor' ? formData.crm : undefined,
      });

      setSuccess(true);
      setTimeout(() => {
        onBack();
      }, 2000);
    } catch (err) {
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cadastro Realizado!</h2>
          <p className="text-gray-600">Você será redirecionado para o login em instantes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-teal-700 mb-2">VidaPlus</h1>
        <p className="text-gray-600 text-sm mb-6">Crie sua conta</p>

        <div className="flex gap-3 mb-6">
          <button
            type="button"
            onClick={() => {
              setUserType('patient');
              setErrors({});
            }}
            className={`flex-1 py-2 rounded font-semibold transition-colors text-sm ${
              userType === 'patient'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            PACIENTE
          </button>
          <button
            type="button"
            onClick={() => {
              setUserType('doctor');
              setErrors({});
            }}
            className={`flex-1 py-2 rounded font-semibold transition-colors text-sm ${
              userType === 'doctor'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            MÉDICO
          </button>
        </div>

        {authError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded flex gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{authError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="Nome completo"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className={`w-full px-4 py-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                errors.fullName ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-4 py-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>

          {userType === 'patient' && (
            <div>
              <input
                type="text"
                placeholder="CPF"
                value={formData.cpf}
                onChange={(e) => handleChange('cpf', e.target.value)}
                maxLength={14}
                className={`w-full px-4 py-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                  errors.cpf ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.cpf && <p className="text-xs text-red-600 mt-1">{errors.cpf}</p>}
            </div>
          )}

          <div>
            <input
              type="tel"
              placeholder="Telefone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              maxLength={15}
              className={`w-full px-4 py-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                errors.phone ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
          </div>

          {userType === 'doctor' && (
            <>
              <div>
                <input
                  type="text"
                  placeholder="Especialização"
                  value={formData.specialization}
                  onChange={(e) => handleChange('specialization', e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                    errors.specialization ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.specialization && <p className="text-xs text-red-600 mt-1">{errors.specialization}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="CRM"
                  value={formData.crm}
                  onChange={(e) => handleChange('crm', e.target.value)}
                  maxLength={8}
                  className={`w-full px-4 py-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                    errors.crm ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.crm && <p className="text-xs text-red-600 mt-1">{errors.crm}</p>}
              </div>
            </>
          )}

          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className={`w-full px-4 py-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors pr-10 ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
          </div>

          <div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirmar senha"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              className={`w-full px-4 py-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-2.5 rounded font-semibold hover:bg-teal-700 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading ? 'Cadastrando...' : 'CADASTRAR'}
          </button>
        </form>

        <button
          onClick={onBack}
          className="w-full mt-4 text-gray-600 hover:text-gray-800 text-sm"
        >
          Voltar ao login
        </button>
      </div>
    </div>
  );
}
