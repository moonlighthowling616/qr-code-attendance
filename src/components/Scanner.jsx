import { 
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/react'
import { useState, useEffect, useContext } from 'react';
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
import { scan } from 'ionicons/icons';

export default function Home() {

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [QrResult, setQrResult] = useState(null);
  const [isSupported, setIsSupported] = useState(false)

  const installGoogleBarcodeScanner = async () => {
    try {
      await BarcodeScanner.installGoogleBarcodeScannerModule();
    } catch (error) {
      alert(error)
    }
  };

  const isGoogleBarcodeScannerAvailable = async() => {
    try {
      const isAvailable = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable()
      return isAvailable;
    } catch(err) {
      alert(err)
    }
  }

  useEffect(() => {
    if (!isGoogleBarcodeScannerAvailable) {
      installGoogleBarcodeScanner();
    }
  }, []);


  useEffect(() => {
    const check = async () => {
      const { supported } = await BarcodeScanner.isSupported();
      setIsSupported(supported);
    };
    check()
  }, [])

  const startScan = async () => {
    try {
      const granted = await requestPermissions();
      if (!granted) {
        alert('Permission denied.');
        return
      }

      const { barcodes } = await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode],
      });

      // Store QR in the database
      // const response = await api.post('/api/attendance', {
      //   qrcode: barcodes[0].rawValue
      // });
      // if (response.statusText === 'OK') {
      //   setMessage(response.data.message)
      //   setIsOpen(true)
      // }

    } catch(err) {
      alert(err)
    }
  };
  
  const requestPermissions = async () => {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera == 'granted' || camera == 'limited';
  };


  return (<>
      <IonFab onClick={startScan} slot="fixed" horizontal="center" vertical="bottom">
          <IonFabButton>
            <IonIcon icon={scan}></IonIcon>
          </IonFabButton>
      </IonFab>
    </>
    );
};

