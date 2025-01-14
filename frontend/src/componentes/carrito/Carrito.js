import React, { useState, useEffect } from 'react'
import {connect} from "react-redux"
import carritoActions from "../../redux/actions/carritoActions"
import Producto from './Producto';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ForumIcon from '@material-ui/icons/Forum';
import RedeemIcon from '@material-ui/icons/Redeem';
import { NavLink } from 'react-router-dom';



const Carrito = (props) => {
    const [carrito, setCarrito] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    let precioTotal = 0
    let articulosTotales = 0
    useEffect(() => {
        productos()
    }, [])
    
    const productos = async () => {
        if(props.userLogged){
            const array = await props.obtenerProductos(props.userLogged)
            setCarrito(array.carrito)
        }else{
            props.history.push('/')
        }
    }
    
    const modificaProducto = async (producto, cantidad) => {
        setLoading(false)
        const response = await props.modificarProducto(props.userLogged, producto, cantidad)
        setCarrito(response.carrito)
        setLoading(true)
    }

    const borrarProducto = async (producto) => {
        const response = await props.borrarProducto(props.userLogged, producto)
        setCarrito(response.carrito)
    }
    return (
        <div className='BContainerCarrito'>
            <div className='BContainerProductos'>
                {
                    carrito.length ? 
                    carrito.map(producto => {
                        precioTotal +=  producto.cantidad*producto.idProducto.precio
                        articulosTotales += producto.cantidad
                        return <Producto key={producto._id} producto={producto} borrarProducto={borrarProducto} modificaProducto={modificaProducto} loading={loading}/>
                        
                }) :

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
            </div>
            <div className='BTableroCarrito'>
                <div className='BTableroContenido'>
                    <div className='BTableroFilas'>
                        <h3>Envío</h3>
                        <h3>Por calcular</h3>
                    </div>
                    <div className='BTableroFilas BMargginBoton'>
                        <h3>{articulosTotales+' artículos'}</h3>
                        <h3>${precioTotal}</h3>
                    </div>
                    <hr />
                    <h3 className='BMarginTop BCodigoPromocional' onClick={()=> setOpen(!open)}>¿Tienes un código promocional?</h3>
                    {
                        open && <div className='BTableroFilas BFilaInput'>
                                    <input type="text" placeholder='Código promocional' className='BInputTablero'/>
                                    <button className='BButon'>AÑADIR</button>
                                </div>
                    }
                    
                    <div className='BTableroFilas BTableroTotal'>
                        <h3>Total</h3>
                        <h3 className='BBold'>${precioTotal}</h3>
                    </div>
                </div>
                    
                <NavLink to="/comprar" >
                    <button className='BButon'>COMPRAR</button>
                </NavLink>

                <div>
                    <div className="BContainerTableroFondo">
                     <h3 className='BTableroFondo'><LocalShippingIcon className='BIconTablero'/> Política de Envío</h3>
                     <h3 className='BPaddingTablero'>El envío está a cargo del comprador</h3>
                    </div>
                    <div className="BContainerTableroFondo">
                        <h3 className='BTableroFondo'><RedeemIcon className='BIconTablero'/>Cambios y Devoluciones</h3>
                    </div>
                    <div className="BContainerTableroFondo">
                        <h3 className='BTableroFondo'><ForumIcon className='BIconTablero'/> Dudas? Te ayudamos?</h3>
                        <h3 className='BPaddingTablero'>Comunicate con nosotros por whatsapp!</h3>
                    </div>
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
    obtenerProductos: carritoActions.obtenerProductos,
    modificarProducto: carritoActions.modificarProducto,
    borrarProducto: carritoActions.borrarProducto
}

export default connect(mapStateToProps ,mapDispatchToProps)(Carrito)