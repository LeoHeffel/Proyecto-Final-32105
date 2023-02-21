import Contenedor from "../../containers/containerMongo.js";
import logguer from "../../utils/logger.js";
class DAOmensajesMongo extends Contenedor {
    constructor() {
        
        super('mensajes', {
            email: { type: String, required: true },
            mensajes: { type: Array, default: [] },
        })
    }

    addMsj = async (email, msj) => {
         try {
            const user = await this.db.findOne({ email })
            
            if (user) {
                user.mensajes.push(msj)
                const resutl = await this.db.updateOne({ email }, { mensajes: user.mensajes })
                if (resutl.modifiedCount === 1) {
                    logguer.info(`mensaje de usuario :${email} agregado `)
                    return user.mensajes
                } else {
                    logguer.warn(`Mensaje no agregado `)
                    return { error: "Mensaje no agregado" }
                }
            }else{
                await super.save({email,mensajes:[msj]})
                logguer.info(`usuario ${email} primer chat guardado`)
                
                return msj
            }
        } catch (err) {
            logguer.error(`hubo un error al agregar mensajes ${err}`)
        } 
    }


    async getByEmail(email) {
        try {
            const encontrado = await this.db.findOne({ email })
            if (encontrado) {
                return encontrado.mensajes
            } else {
                return null
            }
        } catch (err) {
            logguer.error(`hubo un error al buscar por email : ${err}`)
        }
    }
}

export default DAOmensajesMongo