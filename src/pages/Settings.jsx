import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonAlert,
} from "@ionic/react";
import { setLateTime, fetchLateTime } from "../dataservice.tsx";
import { App } from "@capacitor/app"; 

function Settings() {
  const [timeInput, setTimeInput] = useState();
  const [showRestartAlert, setShowRestartAlert] = useState(false);

  const setTimeSubmitHandler = async () => {
    try {
      if (!timeInput) {
        return alert("Please enter a valid time.");
      }
      await setLateTime(timeInput);

      // Show the restart alert
      setShowRestartAlert(true);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const time = await fetchLateTime();
        if (time.values.length > 0) {
          setTimeInput(time.values[0].time);
        }
      } catch (err) {
        alert(err);
      }
    };

    fetchTime();
  }, []);

  const handleRestart = () => {
    App.exitApp(); 
  };

  return (
    <IonPage>
      <IonHeader className="ion-header">
        <IonToolbar>
          <IonTitle style={{ textAlign: "center" }}>SETTINGS</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonInput
          label="Set late time"
          labelPlacement="floating"
          // fill="outline"
          type="time"
          value={timeInput}
          helperText="The default late time is 7:40 AM"
          onIonInput={(e) => setTimeInput(e.detail.value)}
        />
        <IonButton
          expand="block"
          style={{ marginTop: "20px" }}
          onClick={setTimeSubmitHandler}
        >
          SET LATE TIME
        </IonButton>

        <IonAlert
          isOpen={showRestartAlert}
          onDidDismiss={() => setShowRestartAlert(false)}
          header="Restart Required"
          message="The app needs to be restarted for the changes to take effect."
          buttons={[
            {
              text: "Restart",
              handler: handleRestart, 
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
}

export default Settings;
