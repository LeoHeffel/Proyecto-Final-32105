import express from 'express'

import passport from '../utils/passport.js'
import { auth ,isAdmin} from '../utils/authMiddlewares.js'
import { upload } from '../utils/multer.js'
import * as UsuarioService from '../services/usuario.service.js'

const { Router } = express
const router = Router()


router.get('/', auth , UsuarioService.GET )

router.get('/login',UsuarioService.GETLOG )

router.post('/', passport.authenticate('login', { failureRedirect: '/loginError' }), UsuarioService.POST)

router.get('/register',UsuarioService.GETREG)

router.post('/register', upload.single('photo'), passport.authenticate('register', { failureRedirect: '/registerError' }), UsuarioService.POST)

router.get('/productos',  auth,  UsuarioService.GETPROD )

router.get('/loginError', UsuarioService.GETLOGERR)

router.get('/registerError', UsuarioService.GETREGERR)

router.get('/user',  auth,  UsuarioService.GETUSER)

router.get('/logout', UsuarioService.GETOUT)

router.get('/config',  auth, isAdmin, UsuarioService.GETCONFIG)
router.post('/config',  auth, isAdmin, UsuarioService.SETCONFIG)

export default router