import express from 'express'
import { auth } from '../utils/authMiddlewares.js'
import * as CarritoService from '../services/carrito.service.js'
const { Router } = express
const routerCarrito = Router()


routerCarrito.get('/:id/productos', auth, CarritoService.GETID)

routerCarrito.post('/:id/finalizar', auth, CarritoService.POSTFIN)

routerCarrito.post('/', auth, CarritoService.POST)

routerCarrito.post('/:id/productos', auth, CarritoService.POSTID)

routerCarrito.delete('/:id/productos/:id_prod', auth, CarritoService.DELPROD)

routerCarrito.delete('/:id', auth, CarritoService.DELCAR)

export default routerCarrito