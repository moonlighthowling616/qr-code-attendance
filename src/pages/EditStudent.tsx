import React, { useState, useContext, useEffect } from 'react';
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
  IonLoading
} from '@ionic/react'
import api from '../services/api.js'
import { useParams, useNavigate } from 'react-router-dom'
import { ScannerContext } from '../services/ScannerContext.jsx'

export default function AddStudent() {
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [strand, setStrand] = useState('');
  const [loading, setLoading] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate();
  const { recorded, setRecorded } = useContext(ScannerContext)
  // const { recorded } = useContext(ScannerContext)


  useEffect(() => {
    const fetchStudent = async() => {
      try {
        setLoading(true)
        const { data } = await api.get(`/api/student/edit/${id}`)
        setName(data.data.name)
        setIdNumber(data.data.id_number)
        setStrand(data.data.strand)
      } catch(err) {
        alert(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStudent()


  }, [])


  const handleSubmit = async() => {
    try {
      setLoading(true)
      const response = await api.put(`/api/student/update/${id}`, {
        name: name,
        id_number: idNumber,
        strand: strand
      });

      navigate('/home');

    } catch(err) {
      console.log(err)
      alert("Something went wrong, please check if all fields are filled.")
    } finally {
      // redirect here
      setLoading(false)
      setRecorded(!recorded)
    }
  }

  return (
  	<>
  		<IonPage>
        <IonHeader>
            <IonToolbar>
            </IonToolbar>
        </IonHeader>
        <IonContent class='ion-padding' >
        {/*<IonText color='dark'><h2>Add Classmate</h2></IonText>*/}
         <div style={{ display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <IonInput 
                label="Full name" 
                labelPlacement="floating" 
                fill='outline'
                value={name}
                onIonInput={(e) => setName(e.detail.value!) } 
              />
              <IonInput 
                label="ID Number" 
                labelPlacement="floating" 
                fill='outline'
                value={idNumber}
                onIonInput={(e) => setIdNumber(e.detail.value!) } 
                />
              <IonInput 
                label="Strand-Level-Section"
                labelPlacement="floating" 
                fill='outline' 
                placeholder="STRAND-LEVEL-SECTION"
                value={strand}
                onIonInput={(e) => setStrand(e.detail.value!) } 
                />
              <IonButton onClick={handleSubmit} expand='block' color='dark'>Save Changes</IonButton>
          </div>
          <IonLoading isOpen={loading} message="" />
        </IonContent>
      </IonPage>
  	</>
  );
}
