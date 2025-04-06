import React, { useState, useEffect, createContext } from 'react'
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
import { createAttendance } from '../dataservice.tsx'
import { IonLoading } from '@ionic/react';

export const ScannerContext = createContext();
export default function ScannerProvider({ children }) {
	const [recorded, setRecorded] = useState(false);
	const [scanned, setScanned] = useState(false);
	const [isSupported, setIsSupported] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [toastOpen, setToastOpen] = useState(false);
	const [isInstalling, setIsInstalling] = useState(false);

	useEffect(() => {
		const check = async () => {
			const { supported } = await BarcodeScanner.isSupported();
			setIsSupported(supported);
		};
		check()
	}, [])

	useEffect(() => {
		const checkAndInstallModule = async () => {
			const isAvailable = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
			if (!isAvailable.available) {
				await BarcodeScanner.installGoogleBarcodeScannerModule();
			}
		};
	
		checkAndInstallModule();
	}, []);

	const startScan = async () => {
		try {
		  if (!isSupported) {
			return alert('Barcode Scanner is not supported on this platform.');
		  }
	  
		  const granted = await requestPermissions();
		  if (!granted) {
			return alert('Camera permission denied.');
		  }
	  
		  let isAvailable = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
	  
		  if (!isAvailable.available) {
			setIsInstalling(true); // Show loading indicator
			await BarcodeScanner.installGoogleBarcodeScannerModule();
	  
			 let retries = 10;
			 while (retries > 0) {
			   await new Promise(res => setTimeout(res, 1000)); // wait 1 second
			   isAvailable = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
			   if (isAvailable.available) break;
			   retries--;
			 }
	  
			setIsInstalling(false); // Hide loading indicator
	  
			if (!isAvailable.available) {
			  return alert('Barcode scanner module failed to download. Please try again.');
			}
		  }
	  
		  // Start scanning
		  const { barcodes } = await BarcodeScanner.scan({
			formats: [BarcodeFormat.QrCode],
		  });
	  
		try {
			const response = await createAttendance(barcodes[0].rawValue);
		} catch(err) {
			alert(err)
		}
	  
		  setToastOpen(true);
		  setScanned(!scanned);
		  setIsOpen(true);
	  
		} catch (err) {
		  setIsInstalling(false); // Hide loading indicator in case of error
		  alert('Scan failed: ' + (err.message || err));
		}
	  };
	  


	const requestPermissions = async () => {
		const { camera } = await BarcodeScanner.requestPermissions();
		return camera == 'granted' || camera == 'limited';
	};


	return (<>
		<ScannerContext.Provider value={{startScan, isOpen, setIsOpen,  recorded, scanned, setRecorded, setToastOpen, toastOpen }}>
			{ children }
		</ScannerContext.Provider>
		{isInstalling && <IonLoading isOpen={isInstalling} message="Installing barcode scanner module..." />}
	</>)
}