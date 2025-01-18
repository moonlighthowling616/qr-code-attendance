import { 
  useIonLoading, 
  IonAvatar, 
  IonButtons, 
  IonCard, 
  IonCardSubtitle , 
  IonText,
  IonIcon, IonContent, 
  IonCardContent,
  IonMenuButton,
  IonAlert,
  IonLabel,
  IonButton,
  IonHeader,
  IonPage, 
  IonTitle, 
  IonToolbar
} from '@ionic/react';
import StudentLists from "../components/StudentLists.jsx"

export default function Attendances() {

  return (<>
    <IonPage>
      <IonHeader>
          <IonToolbar>
            {/* Menu Button */}
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle></IonTitle>
          </IonToolbar>
        </IonHeader>
      <IonContent class='home-content'>
          <StudentLists/>
          <StudentLists/>
          <StudentLists/>
          <StudentLists/>
          <StudentLists/>
          


      </IonContent>
    </IonPage>
    </>
    );
};

