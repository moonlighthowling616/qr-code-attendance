import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
  IonIcon,
  IonLoading,
  IonDatetime,
  IonModal,
  IonToast,
  IonTitle,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";
import { calendarOutline } from "ionicons/icons";
import StudentCard from "../components/StudentCard.jsx";
import { useEffect, useState, useContext } from "react";
import {
  queryAllPresents,
  queryAllAbsents,
  filterPresentAttendances,
  filterAbsentAttendances,
} from "../dataservice.tsx";
import { ScannerContext } from "../services/ScannerContext.jsx";
import { fetchLateTime } from "../dataservice.tsx";
import FabButton from "../components/FabButton.jsx";

export default function Attendances() {
  const [presents, setPresents] = useState();
  const [absents, setAbsents] = useState();
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState();
  const [lateTime, setLateTime] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const { scanned, toastOpen, setToastOpen } = useContext(ScannerContext);

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        setLoading(true);

        // Fetching late time
        try {
          const lateTime = await fetchLateTime();
          if (lateTime.values.length > 0) {
            setLateTime(lateTime.values[0].time);
          } else {
            setLateTime("07:40"); // Default late time
          }
        } catch (err) {
          console.error("Error fetching late time:", err);
          alert("Failed to fetch late time.");
        }

        // Setting the current date to be displayed
        const date = new Date();
        const options = { year: 'numeric', month: 'long', day: '2-digit' };
        const currentDate = date.toLocaleDateString('en-US', options);
        setCurrentDate(currentDate)


        // Fetching records        
        try {
          const get_presents = await queryAllPresents();
          const get_absents = await queryAllAbsents();
          setPresents(get_presents.values || []);
          setAbsents(get_absents.values || []);
        } catch (err) {
          alert(err);
        }

      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendances();
  }, [scanned]);

  const handleDateChange = async (e) => {
    try {
      setLoading(true);

      const selectedDate = new Date(formatDate(e.detail.value));
      const options = { year: 'numeric', month: 'long', day: '2-digit' };
      const currentDate = selectedDate.toLocaleDateString('en-US', options);
      setCurrentDate(currentDate)

      const date = formatDate(e.detail.value);
      const filter_presents = await filterPresentAttendances(date);
      const filter_absents = await filterAbsentAttendances(date);
      setPresents(filter_presents?.values || []);
      setAbsents(filter_absents?.values || []);
    } catch (err) {
      alert(err);
      console.log(err);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    alert(`${year}-${month}-${day}`)
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <IonPage>
        <IonHeader className="ion-header">
          <IonToolbar >
            <IonTitle>Student Logbook</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsModalOpen(true)}>
                <IonIcon color='light' icon={calendarOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonModal
            className="ion-padding "
            isOpen={isModalOpen}
            onDidDismiss={() => setIsModalOpen(false)}
          >
            <div style={{ padding: '12px' }}>
              <span style={{ color: 'gray', fontSize: '.9em' }}>Filter attendances by date</span>
              <IonDatetime
                presentation="date"
                color="primary"
                style={{ margin: "10px" }}
                onIonChange={handleDateChange}
                // max={new Date().toISOString().slice(0, 10)} // Ensures the format is YYYY-MM-DD
                // value={new Date().toISOString().slice(0, 10)} // Default to today's date
              />
            </div>
            <IonButton
              expand="block"
              color="primary"
              onClick={() => setIsModalOpen(false)}
              style={{ margin: "10px" }}
            >
              Close
            </IonButton>
          </IonModal>
          <IonGrid>
            <div style={{ padding: '.9em', textAlign: 'center' }}>
              <span>Selected date: </span><h2 style={{ fontWeight: 'bold' }}>{currentDate && currentDate}</h2>
            </div>
            <IonRow
              style={{
                backgroundColor: "#f4f4f4",
                padding: "2px",
                paddingLeft: "12px",
                paddingRight: "12px",
                fontSize: '.9em',
                textTransform: 'uppercase'
              }}
            >
              <IonCol>Student</IonCol>
              <IonCol>Status</IonCol>
            </IonRow>
          </IonGrid>
          <IonList style={{ backgroundColor: "white" }}>
            {presents?.length > 0 &&
              presents.map((present) => (
                <StudentCard
                  key={present.id}
                  student={present.student_name || "Unknown"}
                  lateTime={lateTime || "N/A"}
                  time={present.time_in || "N/A"}
                />
              ))
            }

            {absents?.length > 0 &&
              absents.map((absent) => (
                <StudentCard key={absent.id} student={absent.name} />
              ))}
          </IonList>

          <IonLoading isOpen={loading} message='Please wait...' />
          <IonToast
            isOpen={toastOpen}
            position="bottom"
            positionAnchor="footer"
            message="Attendance recorded."
            onDidDismiss={() => setToastOpen(false)}
            duration={3000}
          ></IonToast>
          <FabButton />

        </IonContent>

      </IonPage>
    </>
  );
}