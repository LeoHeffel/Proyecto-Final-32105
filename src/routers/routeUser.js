import express from 'express'

import passport from '../utils/passport.js'
import { auth ,isAdmin} from '../utils/authMiddlewares.js'
import { upload } from '../utils/multer.js'
import * as UsuarioService from '../services/usuario.service.js'

const { Router } = express
const router = Router()


router.get('/', passport.authenticate('jwtAuth', {failureRedirect: '/login', session: false}) , UsuarioService.GET )

router.get('/login',UsuarioService.GETLOG )

router.post('/', passport.authenticate('login', { failureRedirect: '/loginError',session: false }), UsuarioService.POST)

router.get('/register',UsuarioService.GETREG)

router.post('/register', upload.single('photo'), passport.authenticate('register', { failureRedirect: '/registerError' }), UsuarioService.POST)

router.get('/productos',  passport.authenticate('jwtAuth', {failureRedirect: '/login', session: false}),  UsuarioService.GETPROD )

router.get('/coso',  passport.authenticate('jwtAuth', {failureRedirect: '/login', session: false}), (req, res) => res.send(req.user) )

router.get('/loginError', UsuarioService.GETLOGERR)

router.get('/registerError', UsuarioService.GETREGERR)

router.get('/user',  passport.authenticate('jwtAuth', {failureRedirect: '/login', session: false}),  UsuarioService.GETUSER)

router.get('/logout', UsuarioService.GETOUT)

router.get('/config',  passport.authenticate('jwtAuth', {failureRedirect: '/api/sessions/fail-login', session: false}), isAdmin, UsuarioService.GETCONFIG)
router.post('/config',  passport.authenticate('jwtAuth', 
{failureRedirect: '/api/sessions/fail-login', session: false}), isAdmin, UsuarioService.SETCONFIG)

export default router