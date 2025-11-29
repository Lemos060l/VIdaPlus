import { User } from 'lucide-react';

interface ServicesScreenProps {
  onBack: () => void;
}

export default function ServicesScreen({ onBack }: ServicesScreenProps) {
  const services = [
    { type: 'Dentista', doctor: 'Isabela Cristina', price: '20.00', date: '31/10', time: '00:30' },
    { type: 'Ginecologista', doctor: 'Marcela Castro', price: '60.00', date: '01/11', time: '11:30' },
    { type: 'Dentista', doctor: 'Isabela Cristina', price: '20.00', date: '31/10', time: '00:30' },
    { type: 'Ginecologista', doctor: 'Marcela Castro', price: '60.00', date: '01/11', time: '11:30' },
    { type: 'Dentista', doctor: 'Isabela Cristina', price: '20.00', date: '31/10', time: '00:30' },
    { type: 'Ginecologista', doctor: 'Marcela Castro', price: '60.00', date: '01/11', time: '11:30' },
    { type: 'Dentista', doctor: 'Isabela Cristina', price: '20.00', date: '31/10', time: '00:30' },
    { type: 'Ginecologista', doctor: 'Marcela Castro', price: '60.00', date: '01/11', time: '11:30' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button onClick={onBack} className="p-2">
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-gray-600"></div>
              <div className="w-6 h-0.5 bg-gray-600"></div>
              <div className="w-6 h-0.5 bg-gray-600"></div>
            </div>
          </button>
          <h1 className="text-xl font-bold text-gray-700">Serviços</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 pb-20">
        <div className="space-y-3">
          {services.map((service, index) => (
            <div key={index} className="bg-white border border-gray-300 rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-600 rounded flex items-center justify-center flex-shrink-0">
                  <User className="text-white" size={24} />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-bold text-gray-800">{service.type}</p>
                    <p className="font-bold text-gray-800">{service.price}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">{service.doctor}</p>
                    <div className="text-right text-sm text-gray-600">
                      <span>{service.date}</span>
                      <span className="ml-2">{service.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-gray-200 border-t border-gray-300">
        <div className="max-w-md mx-auto flex justify-around py-3">
          <button onClick={onBack} className="flex flex-col items-center text-teal-700">
            <User size={24} />
            <span className="text-xs mt-1">Paciente</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 hover:text-teal-700">
            <div className="relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <span className="text-xs mt-1">Notificação</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 hover:text-teal-700">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="text-xs mt-1">Agenda</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 hover:text-teal-700">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6m8.66-13.66l-4.24 4.24m-4.24 4.24l-4.24 4.24M23 12h-6m-6 0H1m17.66 8.66l-4.24-4.24m-4.24-4.24l-4.24-4.24" />
            </svg>
            <span className="text-xs mt-1">Configuração</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
