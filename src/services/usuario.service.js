import url from 'url'
import { join } from 'path'
import logger from "../utils/logger.js"
import { sendUserDTO } from '../dtos/usuario.dto.js'
import {checkCart} from '../utils/auxFunc.js'
import config from '../config.js'
import {guardar} from '../utils/fs.js'

const __dirname = url.fileURLToPath(new url.URL('.', import.meta.url))
const rutaProdHtml = join(__dirname, "../views/products.html")
const rutaLogin = join(__dirname, "../views/login.html")
const rutaRegister = join(__dirname, "../views/register.html")
const rutaRegisterError = join(__dirname, "../views/registerError.html")
const rutaLoginError = join(__dirname, "../views/loginError.html")
const rutaConfig = join(__dirname, "../views/config.html")
export const GET = (req, res) => {
    res.redirect("/productos")
}
export const GETLOG = (req, res) => {
    res.sendFile(rutaLogin)
}
export const GETREG = (req, res) => {
    res.sendFile(rutaRegister)
}
export const GETPROD = (req, res) => {
    res.sendFile(rutaProdHtml)
}

export const GETUSER = async(req, res) => {
    let activeCart= await checkCart(req.user._id)
    let dataUser = new sendUserDTO(req.user,activeCart)
    res.send(dataUser)
}


export const GETOUT = (req, res) => {
    req.session.destroy()
    logger.info('Session cerrada')
    res.redirect("/")
}

export const GETLOGERR = (req, res) => {
    res.sendFile(rutaLoginError)
}
export const GETREGERR = (req, res) => {
    res.sendFile(rutaRegisterError)
}
export const POST = (req, res) => {
    res.sendFile(rutaProdHtml)
}
export const GETCONFIG = (req, res) => {
    const{reqData}=req.query
 
    if(reqData=='data'){
        let data={
            dbMongo:config.mongoDB.uri,
            dbSesion:config.session.url,
            tipo:config.tipoBD,
            mailAdmin:config.nodemailer.administradorMail,
            mailServidor:config.nodemailer.serverMail,
            passServidor:config.nodemailer.password,
            modo:config.modo,
            port:config.port
        }
        res.status(200).send(data)
    }
    else{
        res.status(200).sendFile(rutaConfig)
    }
   
}
export const SETCONFIG =  (req, res) => {

     guardar(req.body)
    
}