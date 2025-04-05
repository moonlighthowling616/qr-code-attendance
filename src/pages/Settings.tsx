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
  IonIcon,
} from "@ionic/react";
import { setLateTime, fetchLateTime, exportDatabase, importDatabase } from "../dataservice.js";
import { App } from "@capacitor/app"; 
import { fileTrayOutline } from "ionicons/icons";

function Settings() {
  const [timeInput, setTimeInput] = useState();
  const [showRestartAlert, setShowRestartAlert] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State for the selected file

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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }
  
    try {
      // Read file content
      const content = await selectedFile.text();
  
      // Validate JSON format
      try {
        JSON.parse(content); // Ensure the file content is valid JSON
      } catch (err) {
        alert("Invalid JSON file. Please check the file content.");
        return;
      }
  
      // Execute import
      const success = await importDatabase(content);
  
      if (success) {
        alert("Database imported successfully!");
        // Refresh your app data here if needed
      }
    } catch (err) {
      alert(`File processing failed: ${err.message}`);
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-header">
        <IonToolbar>
          <IonTitle style={{ textAlign: "center" }}>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonInput
          label="Set late time"
          labelPlacement="floating"
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

      {/* BACKUP OPTIONS */}
        <div style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
        }}>
          <IonButton onClick={exportDatabase} expand="full" color="primary"> 
            Create Backup{" "} <IonIcon icon={fileTrayOutline}></IonIcon>
          </IonButton>

          {/* File Picker */}
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            style={{ marginTop: "10px", marginBottom: "10px" }}
          />
          <IonButton expand="block" onClick={handleImport}>
            Import Database
          </IonButton>

        </div>



      {/* ALERTS */}
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
