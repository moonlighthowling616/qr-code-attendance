import React, { useContext, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButton,
  IonContent,
  IonInput,
  IonLoading,
  IonTitle,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { ScannerContext } from "../services/ScannerContext.jsx";
import { createStudent } from "../dataservice.tsx";

export default function AddStudent() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [strand, setStrand] = useState("");
  const [loading, setLoading] = useState(false);
  const { recorded, setRecorded }: any = useContext(ScannerContext);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const studentData = { name, strand, id_number: idNumber };

      await createStudent(studentData); // Save the student data to the database
    } catch (err) {
      alert(
        "Something went wrong, please confirm that the ID number is not taken."
      );
    } finally {
      setRecorded(!recorded);
      history.push("/home");
      setLoading(false);
    }
  };

  return (
    <>
      <IonPage>
        <IonHeader className="ion-header">
          <IonToolbar className="tool-bar">
            <IonTitle>Student Registration</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <IonInput
              label="Name"
              labelPlacement="floating"
              placeholder="e.g. Ashvites, Reynard"
              color="primary"
              // fill="outline"
              onIonInput={(e) => setName(e.detail.value!)}
            />
            <IonInput
              label="ID Number"
              labelPlacement="floating"
              placeholder="e.g. S23-0401"
              // fill="outline"
              helperText="Please make sure the ID number is not taken."
              onIonInput={(e) => setIdNumber(e.detail.value!)}
              required
            />
            <IonInput
              label="Track, Grade & Section"
              labelPlacement="floating"
              // fill="solid"
              placeholder="e.g. TVL 12 - IOS"
              onIonInput={(e) => setStrand(e.detail.value!)}
            />

            <IonButton onClick={handleSubmit}>
              Save
            </IonButton>
          </div>
          <IonLoading isOpen={loading} message="" />
        </IonContent>
      </IonPage>
    </>
  );
}
