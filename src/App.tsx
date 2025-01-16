import { Redirect, Route } from 'react-router-dom';
// import { IonApp, IonRouterOutlet, setupIonicReact, IonTabBar } from '@ionic/react';
import { IonApp, setupIonicReact, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home.jsx';
import Login from './pages/Auth/Login.jsx'
import { useContext } from 'react'
import { AuthContext } from './services/AuthContext.jsx'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Ionic icons */
import { home, bookmark } from 'ionicons/icons';
/** 
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const { isAuthed } = useContext(AuthContext)
  console.log(isAuthed)
  return (<IonApp>
    <IonReactRouter>
    <IonTabs mode='ios'>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/home" />
          <Route path="/home" render={() => <Home />} exact={true} />
          <Redirect exact path="/attendances" to="/home" />
 
          {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} size='large'/>
            <IonLabel style={{ fontSize: '1.2em'}} type='ios'>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="attendances" href="/attendances">
            <IonIcon icon={bookmark} size='large'/>
            <IonLabel style={{ fontSize: '1.3em'}} type='ios'>Records</IonLabel>
          </IonTabButton>


        </IonTabBar>



      </IonTabs>
      <IonRouterOutlet>
      {/*Home Route*/}
        

        {/*{ isAuthed ? (<>
          <Route exact path="/home">
            <Home />
          </Route>
        </>) : ( 
          <Redirect to="/" />
        )}

        <Route exact path="/">
         { isAuthed ?  <Redirect to="/home" /> : <Login/>}
        </Route>*/}
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>)
};

export default App;
