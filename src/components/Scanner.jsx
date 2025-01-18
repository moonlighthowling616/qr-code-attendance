import { 
  IonFab,
  IonFabButton,
  IonIcon,
  IonToast
} from '@ionic/react'
import { useState, useEffect, useContext } from 'react';
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
import { scan } from 'ionicons/icons';
import api from '../services/api.js'
import { ScannerContext } from '../services/ScannerContext.jsx'

export default function Scanner({ setAttendances }) {
  const [QrResult, setQrResult] = useState(null);
  const [isSupported, setIsSupported] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { startScan } = useContext(ScannerContext)

  return (<>
      <IonFab onClick={startScan} slot="fixed" horizontal="center" vertical="bottom">
          <IonFabButton>
            <IonIcon icon={scan}></IonIcon>
          </IonFabButton>
      </IonFab>

      <IonToast
        isOpen={isOpen}
        trigger="open-toast"
        message="Attendance recorded."
        duration={3000}
      ></IonToast>

    </>
    );
};

