import './assets/styles/main.scss'
import { loginModule } from './modules/login';
import { layoutModule } from './modules/layout';
import { init } from './modules/init';

const notLoggedIn = false;

if(!notLoggedIn) {
   const user = loginModule.loginHTMl();
   console.log("hello");
   if(user) layoutModule.layoutHTMl();
}
else {
    layoutModule.layoutHTMl();
    init();

}
