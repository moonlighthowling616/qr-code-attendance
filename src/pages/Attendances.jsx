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
	IonLoading,
	IonDatetime,
	IonDatetimeButton,
	IonModal
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
				const { data } = await api.get('/api/presents-today')
				setAttendances(data.attendances)
				console.log(data.attendances)
			} catch (err) {
				alert(err)
			} finally {
				setLoading(false);
			}
		}
		fetchAttendances()
	}, [recorded])

	const handleDateChange = async(e) => {
		try {
			setLoading(true);
			const { data } = await api.post('/api/date-filter', { date: e.detail.value })
			setAttendances(data.attendances)
		} catch (err) {
			alert(err)
		} finally {
			setLoading(false);
		}

	}

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
      <IonContent class='home-content ion-padding'>
	    
	    <IonDatetimeButton style={{ marginTop: '.5em'}}datetime="datetime" mode='ios'></IonDatetimeButton>
	    <IonModal keepContentsMounted={true}>
	        <IonDatetime 
	        	id="datetime" 
	        	presentation='date'
	        	onIonChange={handleDateChange}
	        ></IonDatetime>
	    </IonModal>
		<Scanner attendances={attendances} setAttendances={setAttendances} />
		{ attendances?.length > 0 ? (attendances.map((attendance) => 
			<StudentLists key={attendance.id} student={attendance.student.name} time={attendance.time_in}/>)) 
		: '' 
		}
		<IonLoading 
		isOpen={loading}/>
      </IonContent>
    </IonPage>
    </>
    );
};

