import { 
  useIonLoading, 
  IonAvatar, 
  IonButtons, 
  IonCard, 
  IonCardSubtitle , 
  IonText,
  IonIcon, IonContent, 
  IonCardContent,
  IonMenuButton,
  IonAlert,
  IonLabel,
  IonButton,
  IonHeader,
  IonPage, 
  IonTitle, 
  IonToolbar
} from '@ionic/react';
import './Home.css';
import { useState, useEffect, useContext } from 'react';
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
import api from '../services/api.js'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../services/AuthContext.jsx'
import { scanOutline, logOutOutline } from 'ionicons/icons'
import StudentLists from "../components/StudentLists.jsx"

export default function Home() {

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [QrResult, setQrResult] = useState(null);
  const [isSupported, setIsSupported] = useState(false)
  const history = useHistory();
  // const { logout, user } = useContext(AuthContext)
  const [present, dismiss] = useIonLoading();

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
      const response = await api.post('/api/attendance', {
        qrcode: barcodes[0].rawValue
      });
      if (response.statusText === 'OK') {
        setMessage(response.data.message)
        setIsOpen(true)
      }

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
    try {
      present();
      await logout();
      dismiss();
      history.push('/')
    } catch(err) {
      dismiss();
      console.error(err)
    }

  }

  return (<>
    <IonPage>
      <IonHeader>
          <IonToolbar>
            {/* Menu Button */}
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle></IonTitle>
          </IonToolbar>
        </IonHeader>
      <IonContent class='home-content'>
        <IonCard style={{ padding: '1em' }}>
          <IonCardContent class='profile-card'>
            <div>
              <IonText color='dark'>
                <h4 class='hello-text'>Hello</h4>
              </IonText>
            <IonCardSubtitle style={{ marginTop: '5px' }}>Beadle</IonCardSubtitle>
            </div>
            <IonAvatar>
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
          </IonCardContent>
        </IonCard>
          <IonAlert
            isOpen={isOpen}
            header="Success"
            message={`${message}`}
            buttons={['Close']}
            onDidDismiss={() => setIsOpen(false)}
          ></IonAlert>
          <IonLabel style={{ marginLeft: '12px' }} color='medium'>Today {}</IonLabel>

          <StudentLists/>
          <StudentLists/>
          <StudentLists/>
          <StudentLists/>
          <StudentLists/>
          


        { QrResult && JSON.stringify(QrResult)}
      </IonContent>
    </IonPage>
    </>
    );
};

