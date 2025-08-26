import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  User,
  Bell,
  Download
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { UserProfile } from '../../common/UserProfile';

export const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState<'dashboard' | 'profile'>('dashboard');

  const userStats = [
    {
      title: 'Mis Contratos',
      value: '12',
      description: 'Contratos activos',
      icon: FileText,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Vencimientos',
      value: '3',
      description: 'Próximos 30 días',
      icon: Calendar,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Completados',
      value: '45',
      description: 'Contratos finalizados',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'En Revisión',
      value: '2',
      description: 'Esperando aprobación',
      icon: Clock,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const myContracts = [
    {
      id: 'CNT-001',
      title: 'Contrato de Servicios IT',
      client: 'TechCorp S.A.',
      status: 'Activo',
      startDate: '2024-01-15',
      endDate: '2024-12-15',
      value: '$15,000'
    },
    {
      id: 'CNT-002',
      title: 'Consultoría Digital',
      client: 'InnovaLab',
      status: 'Pendiente',
      startDate: '2024-02-01',
      endDate: '2024-08-01',
      value: '$8,500'
    },
    {
      id: 'CNT-003',
      title: 'Desarrollo Web',
      client: 'StartupXYZ',
      status: 'En Revisión',
      startDate: '2024-01-20',
      endDate: '2024-06-20',
      value: '$12,000'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo':
        return 'text-green-600 bg-green-100';
      case 'Pendiente':
        return 'text-orange-600 bg-orange-100';
      case 'En Revisión':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'profile':
        return <UserProfile />;
      case 'dashboard':
      default:
        return <DashboardContent userStats={userStats} myContracts={myContracts} getStatusColor={getStatusColor} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SIMAUD</h1>
                <p className="text-sm text-gray-500">Portal de Usuario</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Navigation Tabs */}
              <div className="hidden md:flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentView === 'dashboard'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('profile')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentView === 'profile'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Mi Perfil
                </button>
              </div>
              
              <button className="relative p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={() => setCurrentView('profile')}
                className="text-right hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
              >
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </button>
              <button
                onClick={logout}
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderMainContent()}
      </main>
    </div>
  );
};

// Dashboard Content Component
const DashboardContent: React.FC<{ userStats: any[], myContracts: any[], getStatusColor: (status: string) => string }> = ({ 
  userStats, 
  myContracts, 
  getStatusColor 
}) => {
  const { user } = useAuth();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Welcome Section */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Hola, {user?.name}
            </h2>
            <p className="text-gray-600">
              Gestiona tus contratos y mantente al día con tus proyectos.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {userStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-gray-900 font-medium text-sm mb-1">{stat.title}</p>
                    <p className="text-gray-500 text-xs">{stat.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contracts Table */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Mis Contratos</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Gestiona y revisa tus contratos actuales
                  </p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                  Nuevo Contrato
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contrato
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fechas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {myContracts.map((contract) => (
                    <tr key={contract.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{contract.title}</div>
                          <div className="text-sm text-gray-500">{contract.id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{contract.client}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                          {contract.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{contract.startDate}</div>
                        <div>{contract.endDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{contract.value}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-700 transition-colors duration-200">
                            Ver
                          </button>
                          <button className="text-green-600 hover:text-green-700 transition-colors duration-200">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Alerts and Notifications */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximos Vencimientos</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium text-orange-900">Contrato CNT-001</p>
                    <p className="text-xs text-orange-700">Vence en 15 días</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">Revisión CNT-003</p>
                    <p className="text-xs text-yellow-700">Pendiente de aprobación</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Crear Nuevo Contrato</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Programar Reunión</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
                  <Download className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">Descargar Documentos</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
  );
};