import { compare } from '../../utils/bcrypt.js';
import {saveUserDTO} from '../../dtos/usuario.dto.js';
import correo from '../../utils/nodemailer.js';
import logguer from '../../utils/logger.js';
import DAOUserFactory from './DAOSUserFactory.js';




class DAOusersMongo extends DAOUserFactory {
    constructor() {
        super('users', {
            email: { type: String, required: true , unique: true },
            password: { type: String, required: true },
            username: { type: String, required: true},
            address: { type: String, required: true },
            age: { type: Number, required: true },
            phone: { type: String, required: true },
            photo: { type: String, required: false, default: "" },
            admin: { type: Boolean, default: false },
            //carts: { type: Array, default: [] }
        })

    }

    register = async (req, username, password, done) => {
        try {
            const { email, address, age, phone } = req.body
            let photo = ""
            if (req.file.path !== undefined) {
                photo = req.file.filename
            }
            const user = await this.db.findOne({ username })
            if (user) return done(null, false)
            let newUser= new saveUserDTO({ username, password, email, address, age, phone, photo })
            const savedUser =  await this.db.create(newUser) 
            logguer.info(`nuevo usuario registrado `)
            correo('registro', savedUser)
            done(null, savedUser)
        }
        catch (err) {
            logguer.error(`hubo un error al registrar usuario  ${err}`)
        }
    }

    login = async (email, password, done) => {
        console.log(email,password)
        try {
            const user = await this.db.findOne({ email })
            if (!user) return done(null, false)
            compare(password, user.password) ? done(null, user) : done(null, false)
        } catch (err) {
            logguer.error(`hubo un error al loguear usuario  ${err}`)
        }
    }

    find = async (id, done) => {
        try {
    
            this.db.findById(id, done)
        } catch (err) {
            logguer.error(`hubo un error al deserializar usuario  ${err}`)
        }
    }
/* 
    addCart = async (idCarrito, idUser) => {
        try {
            const user = await this.db.findById(idUser)
            user.carts.push(idCarrito)
            const resutl = await this.db.updateOne({ _id: idUser }, { carts: user.carts })
            if (resutl.modifiedCount === 1) {
                logguer.info(`carrito :${idCarrito} agregado al usuario ${idUser}`)
                return user.carts
            } else {
                logguer.warn(`carrito no agregado `)
                return { error: "Carrito no encontrado" }
            }
        } catch (err) {
            logguer.error(`hubo un error al agregar carrito al usuario  ${err}`)
        }
    } */
}



export default DAOusersMongo 