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
  IonButton,
  useIonViewWillEnter,
  IonSearchbar,
  IonList,
  IonRow,
  IonGrid,
  IonCol,
} from "@ionic/react";
import { useState, useEffect, useContext } from "react";
import StudentLists from "../components/StudentLists.jsx";
import NoStudents from "../components/NoStudents.jsx";
import HomePageStudentList from "../components/HomePageStudentList.jsx";
import { ScannerContext } from "../services/ScannerContext.jsx";
import {
  add,
  personAddOutline,
  people,
  createOutline,
  trashOutline,
} from "ionicons/icons";
import "./Home.css";

import {
  queryAllStudents,
  initdb,
  deleteStudentById,
} from "../dataservice.tsx";
import FabButton from "../components/FabButton.jsx";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { recorded, setRecorded } = useContext(ScannerContext);

  useEffect(() => {
    initdb()
      .then((db) => {
        return queryAllStudents();
      })
      .then((results) => {
        setStudents(results.values);
      })
      .catch((err) => alert(err));
    // queryAllStudents()
    //   .then((result) => {
    //     return setStudents(result.value)
    //   })
    //   .catch((err) => alert(err))
  }, [recorded]);

  return (
    <>
      <IonPage>
        <IonHeader className="ion-header">
          <IonToolbar>
            <IonTitle style={{ textAlign: "center" }}>Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="">
          {/* <IonSearchbar animated={true} placeholder="Animated"></IonSearchbar> */}
          <FabButton />
          {students?.length > 0 ? (
            <>
              <IonGrid >
                <IonRow
                  style={{
                    backgroundColor: "#f4f4f4",
                    padding: "4px",
                    margin: "2px",
                    fontWeight: "bolder",
                  }}
                >
                  <IonCol>Student Name</IonCol>
                  <IonCol>Actions</IonCol>
                </IonRow>
              </IonGrid>

              <IonList style={{backgroundColor: "white"}}>
                {students.map((student, index) => (
                  <HomePageStudentList
                    key={index}
                    name={student.name}
                    id_number={student.id_number}
                    id={student.id}
                  />
                ))}
              </IonList>
            </>
          ) : (
            <NoStudents />
          )}
          <IonLoading isOpen={loading} message="" />
        </IonContent>
      </IonPage>
      {/* Add student modal*/}
    </>
  );
}
