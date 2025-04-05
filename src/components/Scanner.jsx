import { 
  IonFab,
  IonFabButton,
  IonIcon,
  IonAlert
} from '@ionic/react'
import { useState, useEffect, useContext } from 'react';
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
import { scan } from 'ionicons/icons';
import { ScannerContext } from '../services/ScannerContext.jsx'

export default function Scanner() {
  const [QrResult, setQrResult] = useState(null);
  const [isSupported, setIsSupported] = useState(false)
  const { startScan, isOpen } = useContext(ScannerContext)

  return (<>
      <IonFab onClick={startScan} slot="fixed" horizontal="end" vertical="bottom">
          <IonFabButton>
            <IonIcon icon={scan}></IonIcon>
          </IonFabButton>
      </IonFab>

      {/* <IonToast
        isOpen={isOpen}
        header="Success"
        message="Attendance recorded."
        buttons={['Close']}
        onDidDismiss={() => setIsOpen(false)}
      ></IonToast> */}

    </>
    );
};

