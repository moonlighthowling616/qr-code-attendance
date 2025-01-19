import React, { useState, useEffect, createContext } from 'react'
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
import api from './api.js'


export const ScannerContext = createContext();
export default function ScannerProvider({ children }) {
	const [recorded, setRecorded] = useState(false);
	const [scanned, setScanned] = useState(false);
	const [isSupported, setIsSupported] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [toastOpen, setToastOpen] = useState(false);

	useEffect(() => {
		const check = async () => {
			const { supported } = await BarcodeScanner.isSupported();
			setIsSupported(supported);
		};
		check()
	}, [])

	const startScan = async () => {
		try {
			if (!isSupported) {
				return alert('Barcode Scanner is not supported in this platform.')
			}

			const granted = await requestPermissions();

			if (!granted) {
				return alert('Permission denied.');
			}

			const isAvailable = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable()
			if (!isAvailable.available) {
				await BarcodeScanner.installGoogleBarcodeScannerModule();
			}

			const { barcodes } = await BarcodeScanner.scan({
				formats: [BarcodeFormat.QrCode],
			});


			const response = await api.post('/api/attendance', {
				id_number: barcodes[0].rawValue
			});
			if (response.status == 200) {
				setToastOpen(true)
				setScanned(!scanned)
				setIsOpen(true)
			}

		} catch(err) {
			alert(err.response?.data.error)
		}
	};


	const requestPermissions = async () => {
		const { camera } = await BarcodeScanner.requestPermissions();
		return camera == 'granted' || camera == 'limited';
	};


	return (<>
		<ScannerContext.Provider value={{startScan, isOpen, recorded, scanned, setRecorded, setToastOpen, toastOpen }}>
			{ children }
		</ScannerContext.Provider>

	</>)
}