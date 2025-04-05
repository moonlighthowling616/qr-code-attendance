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
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
} from "@ionic/react";
import {
  setLateTime,
  fetchLateTime,
  exportDatabase,
  importDatabase,
  resetDatabase,
} from "../dataservice.js";
import { App } from "@capacitor/app";
import {
  cloudDownloadOutline,
  cloudUploadOutline,
  refreshOutline,
} from "ionicons/icons";

function Settings() {
  const [timeInput, setTimeInput] = useState("");
  const [showRestartAlert, setShowRestartAlert] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleReset = async () => {
    try {
      if (confirm("Are you sure you want to reset the database? This action cannot be undone.")) {
        await resetDatabase();
        alert("Database reset successfully.");
        setShowRestartAlert(true);
      }

    } catch (err: any) {
      alert("Failed to reset database: " + err.message);
    }
  };

  const setTimeSubmitHandler = async () => {
    try {
      if (!timeInput) {
        return alert("Please enter a valid time.");
      }
      await setLateTime(timeInput);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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
      const content = await selectedFile.text();

      try {
        JSON.parse(content);
      } catch (err) {
        alert("Invalid JSON file. Please check the file content.");
        return;
      }

      const success = await importDatabase(content);

      if (success) {
        setShowRestartAlert(true);
      }
    } catch (err: any) {
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
          onIonInput={(e) => setTimeInput(e.detail.value!)}
        />
        <IonButton
          expand="block"
          style={{ marginTop: "20px" }}
          onClick={setTimeSubmitHandler}
        >
          SET LATE TIME
        </IonButton>

        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Backup & Restoration</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="6">
                        <IonButton expand="block" onClick={exportDatabase} color="primary">
                          <IonIcon icon={cloudUploadOutline} slot="start" />
                          Create Backup
                        </IonButton>
                      </IonCol>
                      <IonCol size="6">
                        <div style={{ position: "relative" }}>
                          <IonButton
                            expand="block"
                            color="secondary"
                            onClick={() => document.getElementById("fileInput")?.click()}
                          >
                            <IonIcon icon={cloudDownloadOutline} slot="start" />
                            Restore
                          </IonButton>
                          <input
                            id="fileInput"
                            type="file"
                            accept=".json"
                            onChange={handleFileChange}
                            style={{
                              position: "absolute",
                              opacity: 0,
                              width: "100%",
                              height: "100%",
                              top: 0,
                              left: 0,
                            }}
                          />
                        </div>
                      </IonCol>
                    </IonRow>
                    {selectedFile && (
                      <IonRow>
                        <IonCol>
                          <p>Selected: {selectedFile.name}</p>
                          <IonButton expand="block" onClick={handleImport} color="success">
                            Confirm Import
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    )}
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <IonCard color="warning">
                <IonCardHeader>
                  <IonCardTitle>Danger Zone</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonButton expand="block" onClick={handleReset} color="danger" fill="outline">
                    <IonIcon icon={refreshOutline} slot="start" />
                    Reset Database
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

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
          <IonText
                // className="credits"
                style={{ fontSize: "0.75em", marginTop: "20px", display: "block", textAlign: "center" }}
              >
                <p>TVL 12 - ST. ISIDORE OF SEVILLE BATCH 2024-2025</p>
                {/* <IonText color="primary" style={{ fontSize: "0.75em" }}> */}
                  {/* JynJo and Puting Lobo Studios | ©2024-2025 */}
                {/* </IonText> */}
              </IonText>
      </IonContent>
    </IonPage>
  );
}

export default Settings;
