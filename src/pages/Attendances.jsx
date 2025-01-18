import { 
	IonPage,
	IonHeader, 
	IonToolbar, 
	IonButtons, 
	IonMenuButton, 
	IonContent,
	IonFab,
	IonFabButton,
	IonIcon
} from '@ionic/react'
import { scan } from 'ionicons/icons';
import StudentLists from "../components/StudentLists.jsx"
import Scanner from '../components/Scanner.jsx'
export default function Attendances() {

  return (<>
    <IonPage>
      <IonHeader>
          <IonToolbar>
            {/* Menu Button */}
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      <IonContent class='home-content'>
	    <IonFab slot="fixed" horizontal="center" vertical="bottom">
		    <IonFabButton>
		    	<IonIcon icon={scan}></IonIcon>
		    </IonFabButton>
		</IonFab>
		<Scanner />
		<StudentLists/>
		<StudentLists/>
		<StudentLists/>
		<StudentLists/>

      </IonContent>
    </IonPage>
    </>
    );
};

