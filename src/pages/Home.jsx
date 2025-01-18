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
  IonToolbar
} from '@ionic/react';
import { useState, useEffect, useContext } from 'react';
import StudentLists from "../components/StudentLists.jsx";
import api from '../services/api.js';
import { ScannerContext } from '../services/ScannerContext.jsx';


export default function Home() {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);
  const { recorded } = useContext(ScannerContext)

  useEffect(() => {
    const fetchAttendances = async() => {
      try {
        setLoading(true);
        const { data } = await api.get('/api/presents-today')
        setAttendances(data.attendances)
      } catch (err) {
        alert(err)
      } finally {
        setLoading(false);
      }
    }
    fetchAttendances()
  }, [recorded])


  return (<>
    <IonPage>
      <IonHeader>
          <IonToolbar>
            {/* Menu Button */}
          </IonToolbar>
        </IonHeader>
      <IonContent class='home-content'>
        <IonCard style={{ padding: '1em' }}>
          <IonCardContent class='profile-card'>
            <div>
             {/* <IonText color='dark'>
                <h4 class='hello-text'>Hello</h4>
              </IonText>
            <IonCardSubtitle style={{ marginTop: '5px' }}>Beadle</IonCardSubtitle>
            </div>
            <IonAvatar>
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>*/}
            </div>
          <IonLabel style={{ padding: '12px' }} color='medium'>Present today</IonLabel>
          </IonCardContent>
        </IonCard>
          { attendances?.length > 0 ? (attendances.map((attendance) => 
            <StudentLists key={attendance.student} student={attendance.student} time={attendance.time_in}/>)) 
          : '' 
          }   
          <IonLoading isOpen={loading} message="Loading..." />

      </IonContent>
    </IonPage>
    </>
    );
};

