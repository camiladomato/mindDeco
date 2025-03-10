import React from 'react'
import { Icon } from '@iconify/react';
import { useState } from 'react';
import searchOutlined from '@iconify-icons/ant-design/search-outlined';
// import cartIcon from '@iconify-icons/topcoat/cart';
import shoppingCart from '@iconify-icons/la/shopping-cart'; 
import {NavLink} from 'react-router-dom'
import {connect} from "react-redux"
import carritoActions from '../../redux/actions/carritoActions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProductosEnGrilla = (props) => {
    const [mouseIsOnCard, setMouseIsOnCard] = useState(false)
    const [targetaHoveada, setTargetaHoveada] = useState("")

    const mostrarIconos = (elementoHoveado)=>{
        setMouseIsOnCard(true)
        setTargetaHoveada(elementoHoveado)
    }

    const agregandoProducto = async (producto) => {
        const response = await props.agregarProductoAlCarrito(props.userLogged, producto)
        if(response.success) {
            return toast.success('Se agrego al carrito')
        }else{
           return toast.warning('Este producto ya esta en el carrito')
        }
    }

    return (


        <>  
        {props.infoImportante.productosAMostrar.length ?   
            props.infoImportante.productosAMostrar.map(producto =>{
                return(
                    <div key={producto._id} className="l-card" onMouseOver={(e)=>mostrarIconos(producto._id)} onMouseLeave={()=>setMouseIsOnCard(false)}>
                        <div className="l-contenedor-foto">
                            {/* <div className="l-foto-card" style={{backgroundImage: `url('${(mouseIsOnCard & (targetaHoveada === producto._id)) ? producto.fotos[1] : producto.fotos[0] }')`}}> */}
                            <div className={!(mouseIsOnCard & targetaHoveada === producto._id) ? "l-foto-card grid-card-active" : "l-foto-card"} style={{backgroundImage: `url(${producto.fotos[0]})`}}>
                                {(mouseIsOnCard & (targetaHoveada === producto._id)) ?
                                    <div className="contenedor-iconosDeImagen"> 
                                        <div className="l-contenedor-icono-de-imagen-1">
                                            {/* <div className="l-subContenedor-icono-de-imagen"><Icon icon={searchOutlined} className="l-icono-de-imagen1"/></div> */}
                                            <NavLink to={`/producto/${producto._id}`} className="l-subContenedor-icono-de-imagen"><Icon icon={searchOutlined} className="l-icono-de-imagen1"/></NavLink>

                                        </div>
                                        <div className="l-contenedor-icono-de-imagen-2">
                                            <div className="l-subContenedor-icono-de-imagen" onClick={()=>agregandoProducto(producto)}><Icon icon={shoppingCart} className="l-icono-de-imagen2" /></div>
                                        </div>
                                    </div>
                                    : null
                                }
                            </div>
                            <div className={(mouseIsOnCard & targetaHoveada === producto._id) ? "l-foto-card grid-card-active" : "l-foto-card"}
                            style={{backgroundImage: `url(${producto.fotos[1]})`}}>
                                {(mouseIsOnCard & (targetaHoveada === producto._id)) ?
                                    <div className="contenedor-iconosDeImagen"> 
                                        <div className="l-contenedor-icono-de-imagen-1">
                                            {/* <div className="l-subContenedor-icono-de-imagen"><Icon icon={searchOutlined} className="l-icono-de-imagen1"/></div> */}
                                            <NavLink to={`/producto/${producto._id}`} className="l-subContenedor-icono-de-imagen"><Icon icon={searchOutlined} className="l-icono-de-imagen1"/></NavLink>
                                        </div>
                                        <div className="l-contenedor-icono-de-imagen-2">
                                            <div className="l-subContenedor-icono-de-imagen" onClick={()=> props.userLogged ? agregandoProducto(producto) : toast.warning("Inicie sesión para comprar")}><Icon icon={shoppingCart} className="l-icono-de-imagen2" /></div>
                                        </div>
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                        <div className="l-nombre-y-precio">
                            <p className="l-nombre-producto fontTexto">{producto.nombre.charAt(0).toUpperCase() + producto.nombre.slice(1, producto.nombre.legth)}</p>
                            <p className="l-precio-producto fontTexto">${producto.precio}</p>
                        </div>
                    </div>
                    )}):
                    
                    <div className="sk-cube-grid">
                        <div className="sk-cube sk-cube1"></div>
                        <div className="sk-cube sk-cube2"></div>
                        <div className="sk-cube sk-cube3"></div>
                        <div className="sk-cube sk-cube4"></div>
                        <div className="sk-cube sk-cube5"></div>
                        <div className="sk-cube sk-cube6"></div>
                        <div className="sk-cube sk-cube7"></div>
                        <div className="sk-cube sk-cube8"></div>
                        <div className="sk-cube sk-cube9"></div>
                    </div>
                    }
            <ToastContainer />
        </>
    )
}
const mapStateToProps = state => {
    return {
       userLogged: state.authReducer.userLogged
    }
 }
const mapDispatchToProps = {
    agregarProductoAlCarrito: carritoActions.agregarProductoAlCarrito
 }
 export default connect(mapStateToProps, mapDispatchToProps)(ProductosEnGrilla)