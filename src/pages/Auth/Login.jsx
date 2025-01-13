import React, { useState } from 'react';
import { useIonLoading, IonPage, IonContent, IonCard, IonRow, IonCol, IonCardContent, IonList, IonItem, IonInput, IonButton, IonInputPasswordToggle } from '@ionic/react';
import api from '../../services/api.js'
import { useHistory } from 'react-router-dom'


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [present, dismiss] = useIonLoading();

  const handleLogin = async (e) => {  
    e.preventDefault();
    try {
      present({ message: 'Logging in...'});
      const response = await api.post('/api/login', { email, password });
      console.log(response)
      dismiss();
      localStorage.setItem('auth_token', response.data.access_token);
      history.push('/home')
    } catch(err) {
      dismiss();
      console.error(err)
    }
  };

  return (
    <IonPage>
      <IonContent>
        {/* Centering the content using CSS Grid */}
        <div style={{ display: 'grid', placeItems: 'center', height: '90vh' }}>
          <IonCard>
            <IonRow>
              <IonCol size-md="9" size="12">
                {/* Content */}
                <IonCardContent>
                  {/* Form */}
                  <form onSubmit={handleLogin}>
                  <IonList>
                    <IonItem>
                      <IonInput 
                        value={email}
                        onInput={e => setEmail(e.target.value)} // Using e.target.value instead of e.detail.value
                        color="dark" 
                        type="email" 
                        label="Email" 
                        labelPlacement="floating" 
                        placeholder="@lccdo.edu.ph" />

                    </IonItem>

                    <IonItem>
                      <IonInput 
                        value={password}
                        onInput={e => setPassword(e.target.value)} // Using e.target.value instead of e.detail.value
                        type="password" 
                        label="Password">
                        <IonInputPasswordToggle slot="end" color="dark" />
                      </IonInput>
                    </IonItem>

                    <IonButton 
                      type='submit'
                      color='dark' 
                      expand='block' 
                      style={{ marginTop: '12px' }}>Sign In</IonButton>
                  </IonList>
                  </form>
                  {/* End Form */}
                </IonCardContent>
                {/* End Content */}
              </IonCol>
            </IonRow>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
