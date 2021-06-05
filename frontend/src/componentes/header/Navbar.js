import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LocalMallRoundedIcon from '@material-ui/icons/LocalMallRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import PersonIcon from '@material-ui/icons/Person';
import { ToastContainer, toast } from 'react-toastify'

import { Menu, Dropdown } from "antd";
import authActions from '../../redux/actions/authActions'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserShield, faMarker, faHome} from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from '@material-ui/core';

const Navbar = (props) => {
  let articulosTotales = 0
  // useEffect(()=>{
  //   console.log(props.userLogged)
  //   if (props.carrito != null) props.carrito.map(producto => articulosTotales += producto.cantidad)
  //   else 
  //   } 
  // },[])

    // useEffect(()=>{
    //   console.log('Soy el NavBar y me renderice')
    //   if(props.userLogged){
    //     console.log(props.userLogged)
    //   }
    //   if(props.userLogged){
    //     if (props.userLogged.carrito != null){ 
    //       articulosTotales = 0
    //       props.userLogged.carrito.map(producto => articulosTotales += producto.cantidad)
    //     }
    //   }  
    // },[props.userLogged])

    if(props.userLogged){
      if (props.userLogged.carrito != null){ 
        articulosTotales = 0
        props.userLogged.carrito.map(producto => articulosTotales += producto.cantidad)
      }
    }
    
    // if(props.userLogged){
    //   props.userLogged.carrito.map(producto => articulosTotales += producto.cantidad)
    // }

    const MenuAccount = (
        <Menu>
          <Menu.Item>
            <div className="c-inputHeader">
              {props.userLogged ? <Link to='/' onClick={()=>{
                toast.success('Se ah cerrado sesion')
                props.logOutUser()
                }}>CERRAR SESION</Link> : <Link to='/ingreso'>INICIAR SESION</Link>}
            </div>
          </Menu.Item>
          <Menu.Item>
            <div className="c-inputHeader">
            {props.userLogged ? null : <Link to='/registro'>REGISTRARSE</Link>}
            </div>
          </Menu.Item>
        </Menu>
      )

    const MenuOrdenes = (
      <Menu>
        <Menu.Item>
          <div className="c-inputHeader">
            <Link to='/'>MIS PEDIDOS</Link>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div className="c-inputHeader">
            <Link to='/'>INFORMACION PERSONAL</Link>
          </div>
        </Menu.Item>
      </Menu>
      )

      console.log(articulosTotales)
    return (
        <div className="c-navbarContainer">
            <div className="c-innerNavbarContainer">
                <Link to="/">
                  <div className="c-logoNavbar"></div>
                </Link>

                <div className="c-iconsContainer" style={{width: !props.userLogged && '9%'}}>
                    {props.userLogged && props.userLogged.administrador
                    ?
                    <>
                      <Tooltip title="Volver a home" placement="top-end">
                        <Link to='/inicio' style={{fontSize: 20, color: 'white'}}><FontAwesomeIcon icon={faHome}/></Link>
                      </Tooltip>
                      <Tooltip title="Cargar productos" placement="top-end">
                        <Link to='/administrador' style={{fontSize: 20, color: 'white'}}><FontAwesomeIcon icon={faMarker}/></Link>
                      </Tooltip>
                      <Tooltip title="Usuario verificado" placement="top-end">
                        <Dropdown overlay={MenuAccount} placement="bottomCenter" arrow>
                          <FontAwesomeIcon icon={faUserShield} style={{fontSize: 22}} />
                        </Dropdown>
                      </Tooltip>
                    </>
                    :
                    <>
                   
                       {
                         !props.userLogged
                         ? <div></div>
                         : 
                         <Dropdown overlay={MenuOrdenes} placement="bottomCenter" arrow>
                            <LocalMallRoundedIcon className='BCursorPointer' style={{fontSize: 30}}/>
                         </Dropdown>
                       }                      

                    <Dropdown overlay={MenuAccount} placement="bottomCenter" arrow>
                        <PersonIcon className='BCursorPointer' style={{fontSize: 32}} />
                    </Dropdown>
                    
                    <div className="relative" style={{display: !props.userLogged && 'none'}}>
                        <Link to='/carrito' style={{color: 'white'}}><ShoppingCartRoundedIcon style={{fontSize: 30}} /></Link>                         
                        <div className={`${ articulosTotales ? "c-cantidadesCarrito BCirculoRojo" : "" }`}>{articulosTotales ? articulosTotales : null}</div>
                        <div></div>
                    </div>
                    </>
                    }
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = state => {
  return {
    userLogged: state.authReducer.userLogged
  }
}

const mapDispatchToProps = {
  logOutUser: authActions.logOutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)