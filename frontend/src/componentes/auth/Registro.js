import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import  GoogleLogin  from 'react-google-login';
import { connect } from 'react-redux'
import authActions from '../../redux/actions/authActions'
import GoogleButton from 'react-google-button'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {NavLink} from 'react-router-dom'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PublicIcon from '@material-ui/icons/Public';
import { withRouter } from 'react-router-dom';

const Registro = (props) => {
   
    const [usuario, setUsuario] = useState({nombre: '', apellido: '', email: '', password: '', provincia: ''})
    const [provincias, setProvincias] = useState([])
    const [eye, setEye] = useState(false)
    const [errores, setErrores] = useState({nombre: '', apellido: '', email: '', password: '', provincia: ''})
    useEffect(()=>{
        window.scrollTo(0,0)
        axios.get('https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre')
        .then( response => {
            setProvincias(response.data.provincias)})
        .catch(error => console.log(error))
    },[])
    const leerInput = (e) => {
        setUsuario({
          ...usuario,
          [e.target.name]: e.target.value
        })
    }

    const enviarFormulario = async (e = null, googleUsuario = null) => {
        setErrores({nombre: '', apellido: '', email: '', password: '',provincia: ''})
        e && e.preventDefault()
        let usuarioGenerico = e ? usuario : googleUsuario
        
        if(Object.values(usuarioGenerico).some(value => value === "")){
            return toast.error('Hay campos vacios')
        }
        const response = await props.createUser(usuarioGenerico)
        if(response){
            if(response.controllers){
                if(response.controllers === "There was an error in the user engraving. Retry"){
                    return toast.error("Ah ocurrido un error, intentelo mas tarde")
                }
                return setErrores({'email': response.controllers})
            }
            response.map(error => setErrores((prevState) =>{ 
                return {...prevState, [error.context.label]: error.message}
             }))
        }else{
            toast.success(`Bienvenida/o ${usuarioGenerico.nombre}`)
            setTimeout(function(){ props.history.push('/') }, 3000);
        }
    }
    const responseGoogle = (response) => {
        
        const {givenName, familyName, email, googleId} = response.profileObj
        enviarFormulario(null, {nombre: givenName, apellido: familyName , email, password: "a"+googleId,  provincia: 'google', google: true, administrador: false})
    }
   
    return (
        <div className='BContainerContenido BContainerRegistro'>
            <form className="c-formRegistro">
                {/* <h1>Create una cuenta:</h1> */}
                <div className='BContainerPassword'>
                    <PermIdentityIcon className='BIcon'/>
                    <input type="text"  placeholder="Tu nombre"
                    onChange={leerInput} value={usuario.nombre} name="nombre" />
                    {errores.nombre ? <h6 className='BErrores'>{errores.nombre}</h6> : null} 
                </div>
                <div className='BContainerPassword'>
                    <PermIdentityIcon className='BIcon'/>
                    <input type="text"  placeholder="Tu apellido"
                    onChange={leerInput} value={usuario.apellido} name="apellido" />
                    {errores.apellido ? <h6 className='BErrores'>{errores.apellido}</h6> : null} 
                </div>
                <div className='BContainerPassword'>
                    <MailOutlineIcon className='BIcon'/>
                    <input type="text"  placeholder="Tu correo electrónico"
                    onChange={leerInput} value={usuario.email} name="email" />
                    {errores.email ? <h6 className='BErrores'>{errores.email}</h6> : null} 
                </div>
                <div className='BContainerPassword'>
                    <VpnKeyIcon className='BIcon'/>
                    <input type= {eye ? "text" : "password"}  placeholder="Tu contraseña"
                    onChange={leerInput} value={usuario.password} name="password" />
                    {eye ? <VisibilityOffOutlinedIcon className='BEye' onClick={()=>setEye(!eye)} /> : <VisibilityOutlinedIcon className='BEye' onClick={()=>setEye(!eye)}/>}
                    {errores.password ? <h6 className='BErrores'>{errores.password}</h6> : null} 
                </div>
                <div className='BContainerPassword'>
                    <PublicIcon className='BIcon'/>
                    <select className='BSelect' onChange={leerInput} name="provincia" >
                        <option value='random'>Seleccione su provincia</option>
                        {provincias.map(provincia => {
                            return <option key={provincia.nombre} value={provincia.nombre}>{provincia.nombre}</option>
                        })}
                    </select>
                    {errores.provincia ? <h6 className='BErrores'>{errores.provincia}</h6> : null} 
                </div>
               <div className="botones-cd">
               <div>
                    <button className='BButon BButonRegistro' onClick={enviarFormulario}>REGISTRARSE</button>
                </div>

                <NavLink to='/ingreso'>
                    <div className='BContainerIniciar'>
                        <button className='BButon BButonRegistro'>YA ESTOY REGISTRADO</button>
                    </div>
                </NavLink>
                        
                <GoogleLogin
                    clientId="687710738267-u7vhsurru0vso24f0vclhghbvro81mfa.apps.googleusercontent.com"
                    buttonText="Registrar con Google"
                    render={renderProps => (
                        <GoogleButton buttonText="REGISTRO CON GOOGLE" className='btn-google' onClick={renderProps.onClick} disabled={renderProps.disabled} label="REGISTRO CON GOOGLE"></GoogleButton>
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />   
               </div>
                
            </form>
            <div className='BImagenRegistro' style={{backgroundImage:'url("/assets/1.jpg")'}}>  
            </div>
        </div>
    )
}
const mapDispatchToProps ={
 
    createUser: authActions.createUser 
 
   }
   
export default withRouter(connect (null , mapDispatchToProps)(Registro))
