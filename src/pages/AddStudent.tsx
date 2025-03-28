import React, { useContext, useState, useEffect } from 'react';
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
  IonTitle
} from '@ionic/react'
import { useHistory } from 'react-router-dom'
import { ScannerContext } from '../services/ScannerContext.jsx'
import { createStudent, initdb } from "../dataservice.tsx";
import './AddStudent.css'

export default function AddStudent() {
  const history = useHistory(); 
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [strand, setStrand] = useState('');
  const [loading, setLoading] = useState(false);
  const { recorded, setRecorded } = useContext(ScannerContext)

  const handleSubmit = async() => {
    try {
      setLoading(true)
      const studentData = {name, strand, id_number: idNumber}
      await createStudent(studentData)
    } catch(err) {
      alert(err)
    } finally {
      setRecorded(!recorded)
      history.push('/home');
      setLoading(false)
    }
  }

  return (
  	<>
  		<IonPage>
        <IonHeader>
           <IonToolbar>
            <IonTitle>Add Student</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class='ion-padding' >
        {/*<IonText color='dark'><h2>Add Classmate</h2></IonText>*/}
         <div style={{ display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <IonInput 
                label="Name" 
                labelPlacement="floating" 
                placeholder="Last Name, First Name M.I (e.g. Ashvites, Reynard C.)"
                fill='outline'
                onIonInput={(e) => setName(e.detail.value!) } 
              />
              <IonInput 
                label="ID Number" 
                labelPlacement="floating" 
                placeholder="SYY-1234 (e.g. S23-0401)"
                fill='outline'
                onIonInput={(e) => setIdNumber(e.detail.value!) } 
                />
              <IonInput 
                label="Additional Information"
                labelPlacement="floating" 
                fill='outline' 
                placeholder="(Track Grade - Section (e.g. TVL 12 - IOS)"
                onIonInput={(e) => setStrand(e.detail.value!) } 
                />
              <IonButton onClick={handleSubmit} expand='block' color='primary'>add student</IonButton>
          </div>
          <IonLoading isOpen={loading} message="" />
        </IonContent>
      </IonPage>
  	</>
  );
}
