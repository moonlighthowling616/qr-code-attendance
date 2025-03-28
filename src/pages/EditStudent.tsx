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
  IonTitle,
  IonText,
  IonLoading
} from '@ionic/react'
import { 
  getStudentById,
  updateStudentData
} from '../dataservice.tsx'
import { useParams, useHistory } from 'react-router-dom'
import { ScannerContext } from '../services/ScannerContext.jsx'

export default function AddStudent() {
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [strand, setStrand] = useState('');
  const [loading, setLoading] = useState(false)
  const { id } = useParams();
  const history = useHistory();
  const { recorded, setRecorded } = useContext(ScannerContext)
  // const { recorded } = useContext(ScannerContext)


  useEffect(() => {
    const fetchStudent = async() => {
      try {
        setLoading(true)
        const { values } = await getStudentById(id)
        setName(values[0].name)
        setIdNumber(values[0].id_number)
        setStrand(values[0].strand)
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
      const response = await updateStudentData(id,{
        name: name,
        id_number: idNumber,
        strand: strand
      });

      history.push('/home');

    } catch(err) {
      console.log(err)
      alert('error: ' + err)
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
            <IonTitle>Edit Details</IonTitle>
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
                label="Additional Information (Specialization/Section/Level)"
                labelPlacement="floating" 
                fill='outline' 
                placeholder="(Specialization/Section/Level)"
                value={strand}
                onIonInput={(e) => setStrand(e.detail.value!) } 
                />
              <IonButton onClick={handleSubmit} expand='block' color='primary'>Save Changes</IonButton>
          </div>
          <IonLoading isOpen={loading} message="" />
        </IonContent>
      </IonPage>
  	</>
  );
}
