import './assets/styles/main.scss'
import { loginModule } from './modules/login';
import { layoutModule } from './modules/layout';
import { init } from './modules/init';
import { getLoggedInUser } from './modules/utils';

const loggedIn = getLoggedInUser('currentloggedin');

if(loggedIn === null) {

   const user = loginModule.loginHTMl();
   if(user) layoutModule.layoutHTMl();

}
else {

    layoutModule.layoutHTMl();
    init();

}
