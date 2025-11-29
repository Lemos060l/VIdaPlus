import { Calendar, Settings, Bell, User } from 'lucide-react';

interface PatientDashboardProps {
  userName: string;
  onLogout: () => void;
  onNavigateToServices: () => void;
}

export default function PatientDashboard({ userName, onLogout, onNavigateToServices }: PatientDashboardProps) {
  const appointments = [
    { name: 'Matheus Carvalho', date: '31/10', time: '00:30' },
    { name: 'Thiago Chagas', date: '31/10', time: '01:30' },
    { name: 'Matheus Carvalho', date: '31/10', time: '00:30' },
    { name: 'Matheus Carvalho', date: '31/10', time: '00:30' },
    { name: 'Matheus Carvalho', date: '31/10', time: '00:30' },
    { name: 'Matheus Carvalho', date: '31/10', time: '00:30' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button className="p-2">
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-gray-600"></div>
              <div className="w-6 h-0.5 bg-gray-600"></div>
              <div className="w-6 h-0.5 bg-gray-600"></div>
            </div>
          </button>
          <h1 className="text-xl font-bold text-teal-700">VidaPlus</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <div className="bg-teal-600 text-white px-4 py-6">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={onNavigateToServices}
            className="bg-white text-gray-800 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col items-center gap-2">
              <User size={32} />
              <span className="text-sm font-medium">Consultas</span>
            </div>
          </button>

          <button className="bg-white text-gray-800 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col items-center gap-2">
              <Calendar size={32} />
              <span className="text-sm font-medium">Exames</span>
            </div>
          </button>

          <button className="bg-white text-gray-800 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col items-center gap-2">
              <Calendar size={32} />
              <span className="text-sm font-medium">Últimas Consultas</span>
            </div>
          </button>

          <button className="bg-white text-gray-800 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col items-center gap-2">
              <Settings size={32} />
              <span className="text-sm font-medium">Emergência</span>
            </div>
          </button>
        </div>
      </div>

      <main className="max-w-md mx-auto px-4 py-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Bem Vindo(a) Sr(a) {userName}
        </h2>
        <p className="text-sm text-gray-600 mb-6">Próximas Consultas</p>

        <div className="space-y-3">
          {appointments.map((appointment, index) => (
            <div key={index} className="bg-white border border-gray-300 rounded-lg p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{appointment.name}</p>
              </div>
              <div className="text-right text-sm text-gray-600">
                <p>{appointment.date}</p>
                <p>{appointment.time}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-gray-200 border-t border-gray-300">
        <div className="max-w-md mx-auto flex justify-around py-3">
          <button className="flex flex-col items-center text-teal-700">
            <User size={24} />
            <span className="text-xs mt-1">Paciente</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 hover:text-teal-700">
            <Bell size={24} />
            <span className="text-xs mt-1">Notificação</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 hover:text-teal-700">
            <Calendar size={24} />
            <span className="text-xs mt-1">Agenda</span>
          </button>
          <button
            onClick={onLogout}
            className="flex flex-col items-center text-gray-600 hover:text-teal-700"
          >
            <Settings size={24} />
            <span className="text-xs mt-1">Configuração</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
