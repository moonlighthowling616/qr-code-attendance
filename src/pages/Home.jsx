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
import './Home.css';
import { useState,  } from 'react';
import StudentLists from "../components/StudentLists.jsx"

export default function Home() {
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
        <IonCard style={{ padding: '1em' }}>
          <IonCardContent class='profile-card'>
            <div>
              <IonText color='dark'>
                <h4 class='hello-text'>Hello</h4>
              </IonText>
            <IonCardSubtitle style={{ marginTop: '5px' }}>Beadle</IonCardSubtitle>
            </div>
            <IonAvatar>
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
          </IonCardContent>
        </IonCard>
          <IonLabel style={{ marginLeft: '12px' }} color='medium'>Present today</IonLabel>


      </IonContent>
    </IonPage>
    </>
    );
};

