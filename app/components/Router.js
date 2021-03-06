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
import Example from './Example';
import ProcesoSelectionLoteForm from './ProcesoSelectionLoteForm';
import ProcesarLoteForm from './ProcesarLoteForm';
import ProcesoAlmacenajeLoteForm from './ProcesoAlmacenajeLoteForm';
import ReporteStock from './ReporteStock';
import ReporteCompras from './ReporteCompras';
import ReporteVentas from './ReporteVentas';

import Compras2Form from './Compras2Form';


const AuthStack = createStackNavigator({
  Login: {
    screen: LoginForm,
    navigationOptions: {header: null}
  },
  Example: {
    screen: Example,
    navigationOptions: { header: null }
  },
  Register: {
    screen: RegisterForm,
    navigationOptions: {
      title: 'Registro',
      headerMode: 'screen',
      headerStyle: {backgroundColor: '#2ecc71',},
      headerTintColor: 'black',
      headerTitleStyle: {fontWeight: 'bold',}
    }
  },
  ResetPassword: {
    screen: ResetPasswordForm,
    navigationOptions: {
      title: 'Recuperar contraseña',
      headerMode: 'screen',
      headerStyle: {backgroundColor: '#2ecc71',},
      headerTintColor: 'black',
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
      headerStyle: { backgroundColor: '#2ecc71', },
      headerTintColor: 'black',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },
  Compras: {
    screen: Compras2Form,
    navigationOptions: {
      title: 'Comprar',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#2ecc71', },
      headerTintColor: 'black',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },  
  Ventas: {
    screen: VentasForm,
    navigationOptions: {
      title: 'Vender',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#2ecc71', },
      headerTintColor: 'black',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },  
  Procesos: {
    screen: ProcesosForm,
    navigationOptions: {
      title: 'Procesamiento de Materia Prima',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#2ecc71', },
      headerTintColor: 'black',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },  
  Materiales: {
    screen: MantMaterialesForm,
    navigationOptions: {
      title: 'Materiales',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#2ecc71', },
      headerTintColor: 'black',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },
  Clientes: {
    screen: MantClientesForm,
    navigationOptions: {
      title: 'Clientes',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#2ecc71', },
      headerTintColor: 'black',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },
  Proveedores: {
    screen: MantProveedoresForm,
    navigationOptions: {
      title: 'Proveedores',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#2ecc71', },
      headerTintColor: 'black',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },
  DashboardProcesos: {
    screen: DashboardProcesos,
    navigationOptions: {
      title: 'Operaciones',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#2ecc71', },
      headerTintColor: 'black',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },
  DashboardReportes: {
    screen: DashboardReportes,
    navigationOptions: {
      title: 'Reportes',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#2ecc71', },
      headerTintColor: 'black',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },
  LoteSeleccionamiento: {
    screen: ProcesoSelectionLoteForm,
    navigationOptions: {
      title: 'Proceso selección',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#2ecc71', },
      headerTintColor: 'black',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },
  ProcesarLoteForm: {
    screen: ProcesarLoteForm,
    navigationOptions: {
      title: 'Proceso trituración',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#2ecc71', },
      headerTintColor: 'black',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },
  ProcesoAlmacenajeLoteForm: {
    screen: ProcesoAlmacenajeLoteForm,
    navigationOptions: {
      title: 'Proceso almacenaje',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#2ecc71', },
      headerTintColor: 'black',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },
  ReporteStock: {
    screen: ReporteStock,
    navigationOptions: {
      title: 'Stocks para la venta',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#2ecc71', },
      headerTintColor: 'black',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  }, 
  ReporteCompras: {
    screen: ReporteCompras,
    navigationOptions: {
      title: 'Reporte - Compras',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#2ecc71', },
      headerTintColor: 'black',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  }, 
  ReporteVentas: {
    screen: ReporteVentas,
    navigationOptions: {
      title: 'Reporte - Ventas',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#2ecc71', },
      headerTintColor: 'black',
      headerTitleStyle: { fontWeight: 'bold', }
    }
  },

},
{
  initialRouteName: 'Login',
  //initialRouteName: 'ProcesoAlmacenajeLoteForm',
  defaultNavigationOptions: {headerMode: 'screen'},
});

const AppNavigator = createSwitchNavigator({Auth: AuthStack,},{initialRouteName: 'Auth',});

export default createAppContainer(AppNavigator);