import React from 'react';
import { IonText, IonCard, IonIcon, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { alarm, alarmOutline, batteryHalf, checkmarkCircle, ellipse, heartHalf, shieldHalf, starHalf } from 'ionicons/icons'
import './StudentCard.css'

function StudentCard({ student, time, status }) {

 const formatTimeTo12Hour = (time) => {
  const [hours, minutes, _] = time.split(":").map((n) => Number(n));

  let period = "AM";
  let formattedHours = hours;

  if (formattedHours >= 12) {
    period = "PM";
    if (formattedHours > 12) {
      formattedHours -= 12;
    }
  } else if (formattedHours == 0) {
    formattedHours = 12; 
  }

  return `${formattedHours}:${minutes.toString().padStart(2, "0")}:${period}`;
};

  function indicator(status) {
    if (status == 'late') {
      return <div>
      <IonIcon class='late-icon' size='lg' icon={alarmOutline}/>
      <p style={{fontSize: '.8em'}}>Late</p>
      </div>
    } else if (status == 'halfday') {
        return <div>
        <IonIcon class='halfday-icon' size='lg' icon={heartHalf} />
        <p style={{fontSize: '.8em'}}>Halfday</p>
        </div>
    } else if (status == 'present') {
        return <>
        <IonIcon class='check-icon' size='lg' icon={checkmarkCircle} />
        <p style={{fontSize: '.8em'}}>Ontime</p>
        </>
    } 
  }

  return (
    <IonCard>
      <IonCardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'between', alignItems: 'center' }}>
        <div style={{ flexGrow: 1 }}>
          <IonText color='dark'>
            <span style={{ fontWeight: 'bold' }}>{ student }</span>
          </IonText>
          { time && <>
            <sm style={{ fontSize: '.9em'}}>Entered at { formatTimeTo12Hour(time) }</sm>
            </>
          }
        </div>
        {/* {time ? (<IonIcon class='check-icon' size='lg' icon={checkmarkCircle} />)
        } */}
      { time ? indicator(status) : <IonIcon class='ellipse-icon' size='lg' icon={ellipse} /> }

      </IonCardContent>
    </IonCard>
  );
}
export default StudentCard;