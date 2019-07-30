import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ResetPasswordForm from './ResetPasswordForm';
import Dashboard from './Dashboard';
import DashboardMantenimientos from './DashboardMantenimientos';
import ComprasForm from './ComprasForm';
import VentasForm from './VentasForm';
import ProcesosForm from './ProcesosForm';
import MantMaterialesForm from './MantMaterialesForm';
import MantClientesForm from './MantClientesForm';
import MantProveedoresForm from './MantProveedoresForm';
import DashboardProcesos from './DashboardProcesos';
import DashboardReportes from './DashboardReportes';


const AuthStack = createStackNavigator({
  Login: {
    screen: LoginForm,
    navigationOptions: {header: null}
  },
  Register: {
    screen: RegisterForm,
    navigationOptions: {
      title: 'Registro',
      headerMode: 'screen',
      headerStyle: {backgroundColor: '#000000',},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold',}
    }
  },
  ResetPassword: {
    screen: ResetPasswordForm,
    navigationOptions: {
      title: 'Recuperar contraseña',
      headerMode: 'screen',
      headerStyle: {backgroundColor: '#000000',},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold',}
    }
  }, 
  Dashboard: {
    screen: Dashboard,
    navigationOptions: { header: null }
  },
  Mantenimientos: {
    screen: DashboardMantenimientos,
    navigationOptions: {
      title: 'Mantenimientos',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#000000', },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },
  Compras: {
    screen: ComprasForm,
    navigationOptions: {
      title: 'Comprar',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#000000', },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },  
  Ventas: {
    screen: VentasForm,
    navigationOptions: {
      title: 'Vender',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#000000', },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },  
  Procesos: {
    screen: ProcesosForm,
    navigationOptions: {
      title: 'Procesar',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#000000', },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },  
  Materiales: {
    screen: MantMaterialesForm,
    navigationOptions: {
      title: 'Materiales',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#000000', },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },
  Clientes: {
    screen: MantClientesForm,
    navigationOptions: {
      title: 'Clientes',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#000000', },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },
  Proveedores: {
    screen: MantProveedoresForm,
    navigationOptions: {
      title: 'Proveedores',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#000000', },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },

  DashboardProcesos: {
    screen: DashboardProcesos,
    navigationOptions: {
      title: 'Operaciones',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#000000', },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },

  DashboardReportes: {
    screen: DashboardReportes,
    navigationOptions: {
      title: 'Reportes',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#000000', },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },
},
{
  initialRouteName: 'Login',
  //initialRouteName: 'Materiales',
  defaultNavigationOptions: {headerMode: 'screen'},
});

const AppNavigator = createSwitchNavigator({Auth: AuthStack,},{initialRouteName: 'Auth',});

export default createAppContainer(AppNavigator);