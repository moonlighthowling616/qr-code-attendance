import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

function StudentLists({ student }) {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{ student }</IonCardTitle>
        <IonCardSubtitle>Student</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>Status: Present </IonCardContent>
    </IonCard>
  );
}
export default StudentLists;