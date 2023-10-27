import { useState } from 'react';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'
import useLocalStorage from 'use-local-storage'
import {useDispatch} from 'react-redux'
import {update} from '../redux/themeSlice.js'
import { useEffect } from 'react';


const Toggle = () => {
    const dispatch = useDispatch()
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'light' : 'dark');
  
    let [dark, setDark] = useState(true)
    let toggleTheme = () => {
      setDark(!dark)
      const currentTheme = theme === 'light'? 'dark':'light'
      setTheme(currentTheme)
    }
    useEffect(()=>{
        dispatch(update(theme))
    }, [theme])


  return (
    <div className="toggle-btn" onClick={toggleTheme}>
        {dark ? <FaToggleOff/> : <FaToggleOn/>}
    </div>
  )
}

export default Toggle