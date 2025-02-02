import React from 'react';
import { IonText, IonCard, IonIcon, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { checkmarkCircle, ellipse } from 'ionicons/icons'
import './StudentCard.css'

function StudentCard({ student, time }) {

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
    <IonCard>
      <IonCardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'between', alignItems: 'center' }}>
        <div style={{ flexGrow: 1 }}>
          <IonText color='dark'>
            <span style={{ fontWeight: 'bold' }}>{ student }</span>
          </IonText>
          { time && 
            <sm style={{ fontSize: '.9em'}}>At { time }</sm>
          }
        </div>
        {time ? (<IonIcon class='check-icon' size='lg' icon={checkmarkCircle} />)
          : (<IonIcon class='ellipse-icon' size='lg' icon={ellipse} />)
        }
        {/*<IonText color={`${time ? 'success' : 'danger'}`}>*/}
          {/*<IonIcon class='check-icon' size='lg' icon={checkmarkCircle} />*/}
          {/*<p>{ time ? 'Present' : 'Absent / not marked yet.'}</p>*/}
        {/*</IonText>*/}
      </IonCardContent>
    </IonCard>
  );
}
export default StudentCard;