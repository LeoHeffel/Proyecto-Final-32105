import logguer from '../utils/logger.js'
import daos from '../daos/DAOFactory.js'
import { saveProductDTO } from '../dtos/products.dto.js'
import { sendProductDTO } from '../dtos/products.dto.js'
const DB = daos.DAOproductos

export const GET = async (req, res) => {
    try {
        const data = await DB.getAll()
        let productos = data.map(producto => new sendProductDTO(producto))
        logguer.info(`lista de productos enviada `)
        return res.status(200).send(productos)
    } catch (err) {
        logguer.error(`error en get all productos${err}`)
        res.status(400).send({ error: err })
    }
}

export const GETID = async (req, res) => {
    try {
        const  id  = req.params.selector
        const data = await DB.getById(id)
        if (data) {
            logguer.info(` producto con id ${id}enviado `)
            let producto = new sendProductDTO(data)
            res.status(200).send(producto)
        } else {
            logguer.warn(`producto con id ${id} no encontrado`)
            res.status(404).send({ error: 'producto no encontrado' })
        }
    } catch (err) {
        logguer.warn(`error en get producto por id ${err}`)
        res.status(400).send({ error: err })
    }
}
export const GETCAT = async (req, res) => {
    try {
        const  cat  = req.params.selector
        const data = await DB.getByCat(cat)
        if (data) {
            logguer.info(` productos con categoria ${cat} enviados `)
            let productos = data.map(producto => new sendProductDTO(producto))
            res.status(200).send(productos)
        } else {
            logguer.warn(`no se encontraron productos con categoria ${cat}`)
            res.status(404).send({ error: 'no se encontaron porductos con esa categoria' })
        }
    } catch (err) {
        logguer.warn(`error en get producto por categoria ${err}`)
        res.status(400).send({ error: err })
    }
}

export const GETSEL = async (req, res) => {
        const { selector } = req.params
       // const select= selector.slice(0,2)
        if(selector.length===24){
            GETID(req,res)
        }else{
            GETCAT(req,res)
        }
   
}
export const POST = async (req, res) => {
    const { nombre, descripcion, codigo, url, precio, stock ,categoria} = req.body
    if (!nombre || !descripcion || !codigo || !url || !precio || !stock || !categoria) {
        logguer.warn('faltan datos del nuevo producto o son incorrectos')
        return res.status(406).send({ error: 'faltan datos del nuevo producto o son incorrectos' })
    }
    const producto = new saveProductDTO({ nombre, descripcion, codigo, url, precio, stock,categoria })
    try {
        const data = await DB.save(producto)
        producto.id = data
        logguer.info(`creado nuevo producto id ${data} `)
        res.status(201).send(producto)
    } catch (err) {
        logguer.error(`error en post nuevo producto${err}`)
        res.status(500).send({ error: true, err })
    }
}

export const PUT = async (req, res) => {
    const { nombre, descripcion, codigo, url, precio, stock ,categoria } = req.body
    if (!nombre || !descripcion || !codigo || !url || !precio || !stock || !categoria) {
        logguer.warn(`error al actualizar producto compruebe datos body${err}`)
        return res.status(406).send({ error: 'error en mascara de entrada' })
    }
    const { id } = req.params
    const producto = new saveProductDTO({ nombre, descripcion, codigo, url, precio, stock })
    const productoUpdate = { id, ...producto }
    try {
        const data = await DB.updateById(productoUpdate)
        if (data) {
            logguer.info(`producto id ${id} actualizado `)
            res.status(200).send(data)
        } else {
            logguer.warn(`error al actualizar producto con id ${id} producto inexistente`)
            res.status(404).send({ error: 'producto no encontrado' })
        }
    } catch (err) {
        logguer.error(`error en put productos${err}`)
        res.status(500).send({ error: true, err })
    }
}

export const DELETEID = async (req, res) => {
    const { id } = req.params
    try {
        const data = await DB.deleteById(id)
        if (data) {
            logguer.info(`producto con id ${id} eliminado`)
            res.status(200).send(data)
        } else {
            logguer.warn(`no se pudo borrar producto con id ${id} `)
            res.status(404).send({ error: 'producto no encontrado' })
        }
    } catch (err) {
        res.status(500).send({ error: true, err })
    }
}

export const DELETE = async (req, res) => {
    try {
        const data = await DB.deleteAll()
        if (data) {
            logguer.warn(`se borraron todos los productos `)
            res.status(200).send(data)
        } else {
            logguer.warn(`error al borrar todos los productos`)
            res.status(404).send({ error: 'producto no encontrado' })
        }
    } catch (err) {
        logguer.error(`error al eliminar todos los productos ${err} `)
        res.status(500).send({ error: true, err })
    }
}