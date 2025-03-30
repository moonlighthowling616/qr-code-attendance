import React from 'react';
import { IonText, IonCard, IonIcon, IonCardContent } from '@ionic/react';
import { alarm, alarmOutline, checkmarkCircle } from 'ionicons/icons';
import './StudentCard.css';

function StudentCard({ student, time, status }) {
  
  const formatTimeTo12Hour = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
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

    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const indicator = (status) => {
    if (status === 'late') {
      return (
        <div>
          <IonIcon className='late-icon' size='lg' icon={alarmOutline} />
          <p style={{ fontSize: '.8em' }}>Late</p>
        </div>
      );
    } else if (status === 'halfday') {
      return (
        <div>
          <IonIcon className='halfday-icon' size='lg' icon={alarmOutline} />
          <p style={{ fontSize: '.8em' }}>Half-day</p>
        </div>
      );
    } else if (status === 'present') {
      return (
        <div>
          <IonIcon className='check-icon' size='lg' icon={checkmarkCircle} />
          <p style={{ fontSize: '.8em' }}>Present</p>
        </div>
      );
    }
    return null;
  };

  return (
    <IonCard>
      <IonCardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flexGrow: 1 }}>
          <IonText color='dark'>
            <span style={{ fontWeight: 'bold' }}>{student}</span>
          </IonText>
          {time && (
            <small style={{ fontSize: '.9em' }}>Entered at {formatTimeTo12Hour(time)}</small>
          )}
        </div>
        {time ? (
          indicator(status)
        ) : (
          <div>
            <IonIcon className='ellipse-icon' size='lg' icon={alarm} />
            <p style={{ fontSize: '.8em' }}>Absent</p>
          </div>
        )}
      </IonCardContent>
    </IonCard>
  );
}

export default StudentCard;
