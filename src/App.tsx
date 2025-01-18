import { Redirect, Route } from 'react-router-dom';
// import { IonApp, IonRouterOutlet, setupIonicReact, IonTabBar } from '@ionic/react';
import { IonApp, setupIonicReact, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home.jsx';
import Attendances from './pages/Attendances.jsx';
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
import { home, layers } from 'ionicons/icons';
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

const App = () => {
  return (
    // <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Redirect exact path="/" to="/home" />
            
            {/* Routes for each tab */}
            <Route path="/home" render={() => <Home />} exact={true}/>
            <Route path="/attendances" render={() => <Attendances />} exact={true}/>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={home} size="large" />
              <IonLabel style={{ fontSize: '1.2em' }}>Home</IonLabel>
            </IonTabButton>

            <IonTabButton tab="attendances" href="/attendances">
              <IonIcon icon={layers} size="large" />
              <IonLabel style={{ fontSize: '1.3em' }}>Records</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    // </IonApp>
  );
};

export default App;
