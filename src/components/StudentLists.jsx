import React from 'react';
import { IonText, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

function StudentLists({ student, time }) {

 const formatTimeTo12Hour = (time) => {
  const [hours, minutes, seconds] = time.split(":").map((n) => Number(n));

  let period = "AM";
  let formattedHours = hours;

  if (formattedHours >= 12) {
    period = "PM";
    if (formattedHours > 12) {
      formattedHours -= 12;
    }
  } else if (formattedHours === 0) {
    formattedHours = 12; 
  }

  return `${formattedHours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${period}`;
};

  return (
    <IonCard >
      <IonCardHeader>
        <IonCardTitle>{ student }</IonCardTitle>
        {time && 
          <IonCardSubtitle>{ formatTimeTo12Hour(time) }</IonCardSubtitle>
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