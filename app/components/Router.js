import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ResetPasswordForm from './ResetPasswordForm';

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
  }
},
{
  initialRouteName: 'Login',
  defaultNavigationOptions: {headerMode: 'screen'},
});

const AppNavigator = createSwitchNavigator({Auth: AuthStack,},{initialRouteName: 'Auth',});

export default createAppContainer(AppNavigator);