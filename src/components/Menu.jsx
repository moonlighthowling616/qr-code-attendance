import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem } from '@ionic/react';

const Menu = () => {
  return (
    <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">This is the menu content.</IonContent>
      </IonMenu>
  );
};

export default Menu;
