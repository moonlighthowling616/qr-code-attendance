/* import { IonCol, IonRow, IonText } from "@ionic/react";

const NoStudents = () => (

	<IonRow className="ion-text-center ion-justify-content-center">
    <IonCol size="9">
      <IonText class='brand-text' color='primary' style={{ fontSize: '2em' }}>Lourdes College QR Attendance Checker</IonText>
      <img src="/assets/icon2.png" alt="icon" />
      <p> This app is currently in its prototype stage and is still under development. You may encounter bugs, incomplete features, or unexpected behavior. <IonText color="primary"> Welcome! </IonText>. Please click the button in the bottom right to get started.</p>
    </IonCol>
  </IonRow>
);

export default NoStudents; */

import { IonCol, IonRow, IonText } from "@ionic/react";

const NoStudents = () => (
  <IonRow className="ion-text-center ion-justify-content-center">
    <IonCol >
      <IonText
        color="dark"
      >
        <h1 style={{fontWeight: 'bold'}}>eBeadle: QR Code-Based Attendance Checker</h1>
      </IonText>
      <img src="/assets/icon2.png" alt="icon" />
      <p>
        This app is currently in its <span style={{ fontWeight: "bold" }}>prototype stage</span> and still
        under development. You may encounter <b>bugs, </b> <b>incomplete features</b> or <b> unexpected behavior </b>
      </p>
      <span>
        Welcome! Please click the QR icon to get started.
      </span>

      <IonText
        // className="credits"
        style={{ fontSize: "0.75em", marginTop: "20px", display: "block" }}
      >
        Developed by{" "}
        <IonText color="dark" style={{ fontSize: "0.75em" }}>
          JynJo and Puting Lobo Studios | ©2024-2025
        </IonText>
      </IonText>
    </IonCol>
  </IonRow>
);

export default NoStudents;
