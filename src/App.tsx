import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react'
// import { IonApp, IonRouterOutlet, setupIonicReact, IonTabBar } from '@ionic/react';
import { IonApp, IonFooter, setupIonicReact, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';

import { initdb } from "./dataservice.tsx";
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home.tsx';
import Attendances from './pages/Attendances.jsx';
import AddStudent from './pages/AddStudent.tsx';
import EditStudent from './pages/EditStudent.tsx';
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
import { home, homeOutline, calendarOutline, calendar } from 'ionicons/icons';
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

/* Custom styles*/
import './css/styles.css'

import { useLocation } from 'react-router-dom';
setupIonicReact();


const App = () => {
  useEffect(() => {
    initdb().catch(() => window.alert("ERROR INITIALIZING"));
  }, [])
  const tabs = [
    {
      name: 'home',
      url: '/home',
      icon: homeOutline,
      activeIcon: home,
    },

    {
      name: 'attendances',
      url: '/attendances',
      icon: calendarOutline,
      activeIcon: calendar,
    },

  ]

  const [ activeTab, setActiveTab ] = useState(tabs[0].name);



  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs >
          <IonRouterOutlet>
            <Redirect exact path="/" to="/home" />
            
            {/* Routes for each tab */}
            <Route path="/home" render={() => <Home />} exact={true}/>
            <Route path="/attendances" render={() => <Attendances />} exact={true}/>
            <Route path="/add-student" render={() => <AddStudent />} exact={true}/>
            <Route path="/edit/:id" render={() => <EditStudent />} exact={true}/>
          </IonRouterOutlet>

          <IonTabBar slot="bottom" id="footer" onIonTabsDidChange={ e => setActiveTab(e.detail.tab) }>
             { tabs.map((tab, barIndex) => {

              const active = tab.name === activeTab;

              return (

                <IonTabButton key={ `tab_${ barIndex }` } tab={ tab.name } href={ tab.url }>
                  <IonIcon icon={ active ? tab.activeIcon : tab.icon } />
                </IonTabButton>
              );
            })}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
