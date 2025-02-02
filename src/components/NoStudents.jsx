import { IonCol, IonRow, IonText } from "@ionic/react";

const NoStudents = () => (

	<IonRow className="ion-text-center ion-justify-content-center">
    <IonCol size="9">
      <IonText color='primary' style={{ fontSize: '2em'}}>Lourdes College</IonText>
      <img src="/assets/icon2.png" alt="icon" />

      {/*<p>Click the <IonText color="primary">button</IonText> in the bottom right to add a new student.</p>*/}
    </IonCol>
  </IonRow>
);

export default NoStudents;