import React, { useState, useEffect, createContext } from 'react'
import api from './api.js'
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isAuthed, setIsAuthed] = useState(false)

	useEffect(() => {
		const token = localStorage.getItem('auth_token');
		if (token) {
			setIsAuthed(true)
		} else {
			setIsAuthed(false)
		}
	})

	const login = async (email, password) => {  
	    try {
	      	const response = await api.post('/api/login', { email, password });
	      	console.log(response)
	      	setUser(response.data.user)
			setIsAuthed(true)
	      	localStorage.setItem('auth_token', response.data.access_token);
	  	} catch(err) {
		  console.error(err)
	    }
  	};

  	const logout = async () => {
  		const token = localStorage.getItem('auth_token');
	    try {
	      await api.get('/sanctum/csrf-cookie')
	      const response = await api.post('/api/logout', {}, {
	        headers: {
	          'Authorization': `Bearer ${token}`
	        }
	      });
	      console.log(response)
			setIsAuthed(false)
	      localStorage.removeItem('auth_token');
	    } catch(err) {
	      alert(err)
	    }
  	}

  return (<AuthContext.Provider value={{ login, logout,  user, setUser, isAuthed }}>
  	{ children }
  </AuthContext.Provider>)

}