import { IonContent, IonButton, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useState, useEffect } from 'react';
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
import api from '../services/api.js'
import { useHistory } from 'react-router-dom'


export default function Home() {
  const [QrResult, setQrResult] = useState(null);
  const [isSupported, setIsSupported] = useState(false)
  const history = useHistory();
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
      alert(barcodes[0].rawValue)

      // Store QR in the database
      const response = await api.post('/api/attendance', {
        qrcode: barcodes[0].rawValue
      });

      alert(JSON.stringify(response))

    } catch(err) {
      alert(err)
    }
  };
  
  const requestPermissions = async () => {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera == 'granted' || camera == 'limited';
  };

  const getRequest = async () => {
    try {
      // await api.get('/sanctum/csrf-cookie')
      const response = await api.get('/api/attendance');
      alert(JSON.stringify(response))
      console.log(response)
    } catch(err) {
      alert(err)
    }
  }

  const handleLogout = async () =>  {
    const token = localStorage.getItem('auth_token');
    try {
      await api.get('/sanctum/csrf-cookie')
      const response = await api.post('/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response)
      localStorage.removeItem('auth_token');
      history.push('/')
    } catch(err) {
      alert(err)
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Capston Dustin</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={() => startScan()} expand='block'>Scan</IonButton> 
        <IonButton onClick={() => getRequest()} expand='block'>Get request test</IonButton> 
        <IonButton onClick={() => handleLogout()} expand='block'>Logout</IonButton> 
        { QrResult && JSON.stringify(QrResult)}
      </IonContent>
    </IonPage>
    );
};

