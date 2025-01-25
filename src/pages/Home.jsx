import { 
  useIonLoading, 
  IonAvatar, 
  IonCard, 
  IonCardSubtitle, 
  IonText, 
  IonContent, 
  IonCardContent, 
  IonLabel, 
  IonLoading, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonRouterLink,
  IonCardHeader,
  IonCardTitle,
  IonButton
} from '@ionic/react';
import { useState, useEffect, useContext } from 'react';
import StudentLists from "../components/StudentLists.jsx";
import api from '../services/api.js';
import { allStudents } from '../services/db.js';
import { ScannerContext } from '../services/ScannerContext.jsx';
import { 
  add, 
  personAddOutline, 
  people,
  createOutline,
  trashOutline
} from 'ionicons/icons';
import './Home.css'
export default function Home() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { recorded } = useContext(ScannerContext)

  useEffect(() => {
    const fetchAttendances = async() => {
      try {
        setLoading(true);
        const query = await allStudents(); 
        alert('query: ', JSON.stringify(query))
      } catch (err) {
        alert(JSON.stringify(err))
      } finally {
        setLoading(false);
      }
    }
    fetchAttendances()
  }, [])

  // const closeModal = () => {
  //   console.log('close')
  // }

  return (<>
    <IonPage>
      <IonHeader>
          <IonToolbar>
            {/* Menu Button */}
          </IonToolbar>
        </IonHeader>
      <IonContent className='ion-padding'>
        <IonCard style={{ padding: '1em' }}>
          <IonCardContent className='profile-card'>
            <div>
              <IonText color='dark' style={{ display: 'flex', alignItems: 'center', gap: '1.5em'}}>
                <IonIcon size='large' icon={people}></IonIcon>
              </IonText>
            <IonCardSubtitle style={{ marginTop: '5px' }}>Total: {students?.length > 0 ? students.length : 'No student available.'}</IonCardSubtitle>
            </div>
            <div>
            {/*<IonAvatar>*/}
              {/*<img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />*/}
            {/*</IonAvatar>*/}
            </div>
          {/*<IonLabel style={{ padding: '12px' }} color='medium'>Classmates records</IonLabel>*/}
          </IonCardContent>
        </IonCard>
           <IonFab  slot="fixed" horizontal="end" vertical="bottom">
              <IonRouterLink routerLink='/add-student'>
              <IonFabButton>
                <IonIcon icon={personAddOutline}></IonIcon>
              </IonFabButton>
              </IonRouterLink>
          </IonFab>
          {students?.length > 0 ? (
            students.map((student) => (
              <IonCard key={student.id}> 
                <IonCardHeader>
                  <IonCardTitle>{student.name}</IonCardTitle>
                  <IonCardSubtitle>{student.id_number}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonButton routerLink={`edit/${student.id}`} color='secondary'>
                    <IonIcon icon={createOutline}/>
                  </IonButton>
                  <IonButton color='danger'><IonIcon icon={trashOutline}/></IonButton>
                </IonCardContent>
              </IonCard>
            ))
          ) : (
            <p> students </p> 
          )}

          <IonLoading isOpen={loading} message="" />

      </IonContent>
    </IonPage>
    {/* Add student modal*/}
    </>
    );
};

