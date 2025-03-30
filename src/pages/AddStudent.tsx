import React, { useContext, useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonList,
  IonText,
  IonLoading,
  IonTitle,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { ScannerContext } from "../services/ScannerContext.jsx";
import { createStudent, initdb } from "../dataservice.tsx";
import "./AddStudent.css";

export default function AddStudent() {

  const history = useHistory();
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [strand, setStrand] = useState("");
  const [loading, setLoading] = useState(false);
  const { recorded, setRecorded } = useContext(ScannerContext);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const studentData = { name, strand, id_number: idNumber };
      await createStudent(studentData);
    } catch (err) {
      alert("Something wen't terribly wrong, please check if the ID number is already taken.");
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
          <IonToolbar>
            <IonTitle>Add Student</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding">
          {/*<IonText color='dark'><h2>Add Classmate</h2></IonText>*/}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <IonInput
              label="Name"
              labelPlacement="floating"
              placeholder="e.g. Ashvites, Reynard"
              // fill="solid"
              color="primary"
              onIonInput={(e) => setName(e.detail.value!)}
            />
            <IonInput
              label="ID Number"
              labelPlacement="floating"
              placeholder="e.g. S23-0401"
              // fill="outline"
              onIonInput={(e) => setIdNumber(e.detail.value!)}
            />
            <IonInput
              label="Track, Grade & Section"
              labelPlacement="floating"
              // fill="outline"
              placeholder="e.g. TVL 12 - IOS"
              helperText="Please make sure the ID number is not taken."
              onIonInput={(e) => setStrand(e.detail.value!)}
            />
            <button
              onClick={handleSubmit}
              // color="primary"
              className="submit-btn"
            >
              Save
            </button>
          </div>
          <IonLoading isOpen={loading} message="" />
        </IonContent>
      </IonPage>
    </>
  );
}
