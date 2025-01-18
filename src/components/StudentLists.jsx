import React from 'react';
import { IonText, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

function StudentLists({ student, time }) {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{ student }</IonCardTitle>
        <IonCardSubtitle>{ time }</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonText color="success">
          <p>Present</p>
        </IonText>
      </IonCardContent>
    </IonCard>
  );
}
export default StudentLists;