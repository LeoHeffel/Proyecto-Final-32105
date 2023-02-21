import express from 'express'
import { auth, isAdmin } from '../utils/authMiddlewares.js'
import * as ProductoService from '../services/productos.service.js'

const { Router } = express
const routerProductos = Router()




routerProductos.get('/',  auth,  ProductoService.GET)

//routerProductos.get('/:id', auth,  ProductoService.GETID )
routerProductos.get('/:selector', auth,  ProductoService.GETSEL )

routerProductos.post('/',  auth, isAdmin,  ProductoService.POST)

routerProductos.put('/:id',  auth, isAdmin, ProductoService.PUT )

routerProductos.delete('/:id',  auth, isAdmin,  ProductoService.DELETEID)

routerProductos.delete('/',  auth, isAdmin,  ProductoService.DELETE)


export default routerProductos 