import { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import ServicesScreen from './components/ServicesScreen';

type Screen = 'login' | 'register' | 'patient' | 'doctor' | 'services' | 'dev-menu' | 'loading';
type UserRole = 'patient' | 'doctor' | null;

function App() {
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('loading');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState('');

  const handleLogin = (role: 'patient' | 'doctor', name: string) => {
    setUserRole(role);
    setUserName(name);
    if (role === 'patient') {
      setCurrentScreen('patient');
    } else {
      setCurrentScreen('doctor');
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (user && profile) {
        setUserRole(profile.user_type);
        setUserName(profile.full_name);
        setCurrentScreen(profile.user_type === 'patient' ? 'patient' : 'doctor');
      } else {
        setCurrentScreen('login');
      }
    }
  }, [user, profile, authLoading]);

  const handleLogout = async () => {
    await signOut();
    setUserRole(null);
    setUserName('');
    setCurrentScreen('login');
  };

  const navigateToServices = () => {
    setCurrentScreen('services');
  };

  const navigateBack = () => {
    if (userRole === 'patient') {
      setCurrentScreen('patient');
    } else if (userRole === 'doctor') {
      setCurrentScreen('doctor');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {currentScreen === 'loading' && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        </div>
      )}

      {currentScreen === 'login' && (
        <LoginScreen
          onLogin={handleLogin}
          onNavigateToRegister={() => setCurrentScreen('register')}
        />
      )}

      {currentScreen === 'register' && (
        <RegisterScreen
          onBack={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'patient' && (
        <PatientDashboard
          userName={userName}
          onLogout={handleLogout}
          onNavigateToServices={navigateToServices}
        />
      )}

      {currentScreen === 'doctor' && (
        <DoctorDashboard
          doctorName={userName}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === 'services' && (
        <ServicesScreen
          onBack={navigateBack}
        />
      )}

      {currentScreen === 'dev-menu' && (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h1 className="text-3xl font-bold text-teal-700 mb-8 text-center">VidaPlus</h1>
            <p className="text-gray-600 text-center mb-6">Menu de Desenvolvimento - Selecione uma tela para visualizar</p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  handleLogin('patient', 'Matheus Carvalho');
                  setCurrentScreen('patient');
                }}
                className="w-full bg-teal-600 text-white py-3 rounded font-semibold hover:bg-teal-700 transition-colors"
              >
                Dashboard Paciente
              </button>

              <button
                onClick={() => {
                  handleLogin('doctor', 'Dr Isabela Cristina');
                  setCurrentScreen('doctor');
                }}
                className="w-full bg-teal-600 text-white py-3 rounded font-semibold hover:bg-teal-700 transition-colors"
              >
                Dashboard Médico
              </button>

              <button
                onClick={() => {
                  handleLogin('patient', 'Matheus Carvalho');
                  setCurrentScreen('services');
                }}
                className="w-full bg-teal-600 text-white py-3 rounded font-semibold hover:bg-teal-700 transition-colors"
              >
                Tela de Serviços
              </button>

              <button
                onClick={() => setCurrentScreen('login')}
                className="w-full bg-gray-600 text-white py-3 rounded font-semibold hover:bg-gray-700 transition-colors"
              >
                Tela de Login
              </button>

              <button
                onClick={() => setCurrentScreen('register')}
                className="w-full bg-gray-600 text-white py-3 rounded font-semibold hover:bg-gray-700 transition-colors"
              >
                Tela de Cadastro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
