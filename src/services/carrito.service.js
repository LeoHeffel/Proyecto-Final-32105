import logguer from '../utils/logger.js'
import daos from '../daos/DAOFactory.js'
import {getProds,finalizar} from '../utils/auxFunc.js'

const dbCarrito= daos.DAOcarritos
const DB = daos.DAOproductos


export const GETID =async (req,res)=>{
    try{
        const {id}=req.params
        const data = await dbCarrito.getById(id)
        const productos = await getProds(data.productos)
        if(data){
            logguer.info(`lista de productos en el carrito enviada `)
           res.status(200).send(productos)  
        }else{
            logguer.warn(`carrito no encontrado `)
            res.status(404).send({error:'carrito no encontrado'})
        }
    }catch(err){
        logguer.error(`error al buscar productos en el carrito ${err} `)
        res.status(404).send({error:err})
    }
}

export const POSTFIN = async (req,res)=>{
    try{
        const idCarrito=req.params.id
        const user=req.user
        const prodIds= await dbCarrito.finalizarCompra(idCarrito,user)
        const finalizada= await finalizar(prodIds,user,idCarrito)
        logguer.info(`compra finalizada `)
        res.status(200).send(finalizada)  
    }catch(err){
        logguer.error(`error al finalizar compra ${err} `)
        res.status(404).send({error:err})
    }
}

export const POST=async(req,res)=>{
    try{
        const emailUser = req.user.email
        const dir= req.user.address
        const idCarrito= await dbCarrito.save({email:emailUser,direccion:dir})
        req.user.carts= idCarrito
        logguer.info(`se creo un nuevo carrito id ${idCarrito} para el usuario ${emailUser} `)
        res.send({idCarrito})
    }catch(err){
        logguer.error(`error al crear carrito para el usuario ${emailUser} : ${err}`)
            res.status(400).send({error: true, err})
        }
}

export const POSTID = async(req,res)=>{
    const {idProducto}=req.body
    if(!idProducto){
        logguer.info(`no se encontro id producto. compruebe el body `)
        return  res.status(406).send({error: 'falta idProducto  en el req.body'})
    }
    const producto = await DB.getById(idProducto)
    const {id}=req.params
    try{
    const data = await dbCarrito.updateCarritoById(id,producto)
    if(data){
        logguer.info(`se agrego el producto id ${idProducto} al carrito ${id} `)
        res.status(200).send(data)
    }else{
        logguer.warn(`no se pudo agregar el producto id ${idProducto} al carrito ${id} `)
        res.status(404).send({error:'carrito no encontrado'})
    }
    }catch(err){
        logguer.error(`error al agregar producto al carrito ${err}`)
        res.status(400).send({error: true, err})
    }
}

export const DELPROD =async(req,res)=>{
    const {id,id_prod}=req.params
    try{
    const data = await dbCarrito.deleteProductoById(id,id_prod)
    if(data){
        logguer.info(`producto ${id_prod} del carrito ${id} eliminado `)
        res.status(200).send(data)
    }else{
        logguer.warn(`no se pudo eliminar el producto id ${id_prod} del carrito ${id} `)
        res.status(404).send({error:'carrito no encontrado'})
    }
    }catch(err){
        logguer.error(`error al borrar producto ${id_prod} del carrito ${id} ${err} `)
        res.status(400).send({error: true, err})
    } 
}

export const DELCAR = async(req,res)=>{
    const {id}=req.params
    
    try{
    const data = await dbCarrito.deleteById(id)
    if(data){
        logguer.info(` carrito ${id} eliminado `)
        req.user.carts=null
        res.status(200).send(data)
    }else{
        logguer.warn(` carrito ${id} no se elimino `)
        res.status(404).send({error:'carrito no encontrado'})
    }
    }catch(err){
        logguer.error(`error al borrar el carrito id ${id} : ${err} `)
        res.status(400).send({error: true, err})
    } 
}