const Usuario = require('../models/Usuario')

const carritoControllers = {
    agregarProductosAlCarrito: async (req, res) => {
        try{
            console.log(req.user) // usuario
            console.log(req.body) // el producto
            const usuario = await Usuario.findOneAndUpdate({_id:req.user._id},{$push: {'carrito': {...req.body, cantidad: 1}}}, {new: true}).populate({ path:"carrito", populate:{ path:"idProducto" } })
            res.json({success:true, respuesta: usuario})
        }
        catch(error){
            console.log(error)
            res.json({success:false, respuesta: 'Algo salió mal, intente nuevamente'})
        }
    },
    modificarProducto: async (req, res) => {
        try{
            const result = await Usuario.findOneAndUpdate({_id:req.user._id, "carrito._id":req.body.producto._id }, { $set: { "carrito.$.cantidad": req.body.cantidad } },{ new:true }).populate({ path:"carrito", populate:{ path:"idProducto" } })
            res.json({success: true, respuesta: result})
        }catch(error){
            console.log(error)
            res.json({success:false, respuesta: 'Algo salió mal, intente nuevamente'})
        }
    }

}


module.exports = carritoControllers