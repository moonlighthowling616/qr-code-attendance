import {
  IonContent,
  IonLoading,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { useState, useEffect, useContext } from "react";
import StudentLists from "../components/StudentLists.jsx";
import NoStudents from "../components/NoStudents.jsx";
import HomePageStudentList from "../components/HomePageStudentList.jsx";
import { ScannerContext } from "../services/ScannerContext.jsx";

import "./Home.css";

import {
  queryAllStudents,
  initdb,
} from "../dataservice.tsx";
import FabButton from "../components/FabButton.jsx";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { recorded, setRecorded } = useContext(ScannerContext);
 
  function generateStudents() {
    const newItems = []

    for (let i = 0; i < 10; i++) {
      newItems.push()
    }

  }

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
            <IonTitle style={{ textAlign: "center" }}>How       me</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="">
          {/* <IonSearchbar animated={true} placeholder="Animated"></IonSearchbar> */}
          <FabButton />
          {students?.length > 0 ? (
            <>
             {/* <div>
              <h4 style={{textAlign:'center', fontWeight: 'bold'}}>Student List</h4>
             </div> */}

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
          <IonLoading isOpen={loading} message="Please wait..." />
        </IonContent>
      </IonPage>
      {/* Add student modal*/}
    </>
  );
}
