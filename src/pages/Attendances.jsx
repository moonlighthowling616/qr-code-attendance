import { 
	IonPage,
	IonHeader, 
	IonToolbar, 
	IonButtons, 
	IonMenuButton, 
	IonContent,
	IonFab,
	IonFabButton,
	IonIcon,
	IonLoading
} from '@ionic/react'
import { scan } from 'ionicons/icons';
import StudentLists from "../components/StudentLists.jsx"
import Scanner from '../components/Scanner.jsx'
import { useEffect, useState, useContext } from 'react'
import api from '../services/api.js'
import { ScannerContext } from '../services/ScannerContext.jsx'

export default function Attendances() {
	const [attendances, setAttendances] = useState([]);
	const [loading, setLoading] = useState(false);
	const { recorded } = useContext(ScannerContext)
	useEffect(() => {
		const fetchAttendances = async() => {
			try {
				setLoading(true);
				const { data } = await api.get('/api/attendance')
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
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      <IonContent class='home-content'>
	    <IonFab slot="fixed" horizontal="center" vertical="bottom">
		    <IonFabButton>
		    	<IonIcon icon={scan}></IonIcon>
		    </IonFabButton>
		</IonFab>
		<Scanner attendances={attendances} setAttendances={setAttendances} />
		{ attendances?.length > 0 ? (attendances.map((attendance) => 
			<StudentLists key={attendance.student} student={attendance.student}/>)) 
		: '' 
		}
		<IonLoading isOpen={loading} message="Loading..." />
      </IonContent>
    </IonPage>
    </>
    );
};

