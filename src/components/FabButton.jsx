import React, { useContext } from 'react';
import { IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { addOutline, scan, qrCodeOutline, personAddOutline } from "ionicons/icons";
import { ScannerContext } from '../services/ScannerContext.jsx'

function FabButton() {
  const { startScan, isOpen } = useContext(ScannerContext)
  return (
    <>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={startScan}>
            <IonIcon icon={qrCodeOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
    </>
  );
}
export default FabButton;