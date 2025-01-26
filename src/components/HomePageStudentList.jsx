import React, { useContext } from 'react';
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOptions,
  IonItemOption,
  IonItemSliding,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';
import {
  deleteStudentById
} from "../dataservice.tsx";
import { ScannerContext } from '../services/ScannerContext.jsx'

function HomePageStudentList({ name, id }) {
  const { recorded, setRecorded } = useContext(ScannerContext)

  const deleteStudent = async(id) => {
    try {
      await deleteStudentById(id)
      setRecorded(!recorded)
    } catch(err) {
      alert('Error deleting: ' + err)
    }
  }

  return (
    <>
      <IonItemSliding>
            <IonItem button={true}>
              <IonAvatar aria-hidden="true" slot="start">
                <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
              </IonAvatar>
              <IonLabel color='dark'>{ name }</IonLabel>
            </IonItem>
            <IonItemOptions slot="end">
              <IonItemOption color="success" routerLink={`edit/${id}`}>
                <IonIcon slot="icon-only" icon={pencil}></IonIcon>
              </IonItemOption>
              <IonItemOption color="danger" expandable={true} onClick={() => deleteStudent(id)}>
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    </>
  );
}
export default HomePageStudentList;