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
	IonModal,
	IonToast,
} from '@ionic/react'
import { scan } from 'ionicons/icons';
import StudentLists from "../components/StudentLists.jsx"
import Scanner from '../components/Scanner.jsx'
import { useEffect, useState, useContext } from 'react'
import api from '../services/api.js'
import { ScannerContext } from '../services/ScannerContext.jsx'

export default function Attendances() {
	const [presents, setPresents] = useState([]);
	const [absents, setAbsents] = useState();
	const [loading, setLoading] = useState(false);
	const { scanned, toastOpen, setToastOpen } = useContext(ScannerContext)
	
	// useEffect(() => {
	// 	const fetchAttendances = async() => {
	// 		try {
	// 			setLoading(true);
	// 			const presents_response = await api.get('/api/presents-today')
	// 			const absents_response  = await api.get('/api/absents-today')
	// 			setPresents(presents_response.data.attendances)
	// 			setAbsents(absents_response.data.absentees)
	// 			console.log(presents_response.data.attendances)
	// 			console.log(absents_response.data.absentees)

	// 		} catch (err) {
	// 			alert(err)
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	}
	// 	fetchAttendances()
	// }, [scanned])

	// const handleDateChange = async(e) => {
	// 	try {
	// 		setLoading(true);
	// 		const presents_response = await api.post('/api/date-present-filter', { date: e.detail.value })
	// 		const absents_response = await api.post('/api/date-absent-filter', { date: e.detail.value })
	// 		setPresents(presents_response.data.attendances)
	// 		setAbsents(absents_response.data.attendances)
	// 		console.log('absent', absents_response)
	// 		console.log(presents_response)
	// 	} catch (err) {
	// 		alert(err)
	// 		console.log(err)
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// }

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
	        	// onIonChange={handleDateChange}
	        ></IonDatetime>
	    </IonModal>
		<Scanner />
		{ presents?.length > 0 && (presents.map((present) => 
			<StudentLists key={present.id} student={present.student.name} time={present.time_in}/>)) 
		}
		{ absents?.length > 0 && (absents.map((absent) => 
			<StudentLists key={absent.id} student={absent.name} />)) 
		}
		<IonLoading 
		isOpen={loading}/>
		<IonToast
          isOpen={toastOpen}
          position="top"
          // positionAnchor="footer"
          message="Attendance recorded."
          onDidDismiss={() => setToastOpen(false)}
          duration={3000}
     ></IonToast>
      </IonContent>
    </IonPage>
    </>
    );
};

