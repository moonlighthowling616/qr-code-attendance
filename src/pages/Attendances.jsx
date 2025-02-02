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
import StudentCard from "../components/StudentCard.jsx"
import Scanner from '../components/Scanner.jsx'
import { useEffect, useState, useContext } from 'react'
import { 
	queryAllPresents, 
	queryAllAbsents,
	filterPresentAttendances,
	filterAbsentAttendances
	} from '../dataservice.tsx'
import { ScannerContext } from '../services/ScannerContext.jsx'

export default function Attendances() {
	const [presents, setPresents] = useState();
	const [absents, setAbsents] = useState();
	const [loading, setLoading] = useState(false);
	const { scanned, toastOpen, setToastOpen } = useContext(ScannerContext)
	
	useEffect(() => {
		const fetchAttendances = async() => {
			try {
				setLoading(true);
				const get_presents = await queryAllPresents();
				const get_absents = await queryAllAbsents();
				// const presents_response = await api.get('/api/presents-today')
				// const absents_response  = await api.get('/api/absents-today')
				setPresents(get_presents.values)
				setAbsents(get_absents.values)
				// console.log(presents_response.data.attendances)
				// console.log(absents_response.data.absentees)

			} catch (err) {
				alert(err)
			} finally {
				setLoading(false);
			}
		}
		fetchAttendances()
	}, [scanned])

	const handleDateChange = async(e) => {
		try {
			setLoading(true);
			const date = formatDate(e.detail.value)
			const filter_presents = await filterPresentAttendances(date);
			const filter_absents = await filterAbsentAttendances(date);
			setPresents(filter_presents.values)
			setAbsents(filter_absents.values)
		} catch (err) {
			alert(err)
			console.log(err)
		} finally {
			setLoading(false);
		}
	}

	const formatDate = (date) => {
	  const d = new Date(date);
	  const year = d.getFullYear();
	  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
	  const day = String(d.getDate()).padStart(2, '0');

	  return `${year}-${month}-${day}`;
	};

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
	    
	    <IonDatetimeButton  
	    	datetime="datetime"
	    />

	    <IonModal keepContentsMounted={true}>
	        <IonDatetime 
	        	id="datetime" 
	        	presentation='date'
	        	color='primary'
	        	onIonChange={handleDateChange}
	        />
	    </IonModal>
			{/*<StudentCard student='Benedetta Sen'/> */}
		{ presents?.length > 0 && (presents.map((present) => 
			<StudentCard key={present.id} student={present.student_name} time={present.time_in}/>)) 
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

