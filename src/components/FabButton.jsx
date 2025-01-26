import React, { useContext } from 'react';
import { IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { addOutline, scan, qrCodeOutline } from "ionicons/icons";
import { ScannerContext } from '../services/ScannerContext.jsx'

function FabButton() {
  const { startScan, isOpen } = useContext(ScannerContext)
  return (
    <>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon icon={qrCodeOutline}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton  onClick={startScan}>
              <IonIcon color='primary' icon={scan}></IonIcon>
            </IonFabButton>
            <IonFabButton routerLink='add-student'>
              <IonIcon color='primary' icon={addOutline}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>
    </>
  );
}
export default FabButton;