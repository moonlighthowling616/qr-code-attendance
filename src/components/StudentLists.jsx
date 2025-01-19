import React from 'react';
import { IonText, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

function StudentLists({ student, time }) {
  return (
    <IonCard >
      <IonCardHeader>
        <IonCardTitle>{ student }</IonCardTitle>
        {time && 
          <IonCardSubtitle>{ time }</IonCardSubtitle>
        }
      </IonCardHeader>
      <IonCardContent>
        <IonText color={`${time ? 'success' : 'danger'}`}>
          <p>{ time ? 'Present' : 'Absent / not marked yet.'}</p>
        </IonText>
      </IonCardContent>
    </IonCard>
  );
}
export default StudentLists;