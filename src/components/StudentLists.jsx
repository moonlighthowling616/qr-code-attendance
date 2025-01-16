import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

function StudentLists() {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Kim Minji</IonCardTitle>
        <IonCardSubtitle>Student</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>Status: </IonCardContent>
    </IonCard>
  );
}
export default StudentLists;