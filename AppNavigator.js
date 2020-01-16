import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from './src/pages/signIn';
import SignUp from './src/pages/signUp';
import Main from './src/pages/main';
import Profile from './src/pages/profile';
import Institutions from './src/pages/institutions';


const AppNavigator = createAppContainer(
    createStackNavigator({
        SignIn: SignIn,
        SignUp: SignUp,
        Main: Main,
        Profile: Profile,
        Institution: Institutions,
    })
  );

export default AppNavigator;