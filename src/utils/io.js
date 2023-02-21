import { Server as SocketServer } from "socket.io"

import { saveMensajeDTO, sendMensajeDTO } from "../dtos/mensajes.dto.js"
import logguer from "../utils/logger.js"
import daos from '../daos/DAOFactory.js'
const MdB = daos.DAOmensajes

const ioServer = (httpServer) => {

    const io = new SocketServer(httpServer)
    let connectedUsers = {}
    io.on('connection',  (socket) => {

       async function buscarmens (socket,email){
            const mensajes = await MdB.getByEmail(email)
            if (mensajes) {
                let allMsj = mensajes.map(mensaje => new sendMensajeDTO({ ...mensaje }))
                socket.emit('mensajes', allMsj)
                io.to(connectedUsers['admin@admin']).emit("mensajesdeUsuario", socket.id,email, allMsj)
                logguer.info('mensaje enviado a: ' + email)
                return allMsj
            }
        }

        try {
            let email = socket.handshake.headers.email
            connectedUsers[email] = socket.id
            connectedUsers[socket.id] = email
            logguer.info('cliente conectado ' + socket.id)
            buscarmens(socket,email,'mensajes')
        }
        catch (error) {
            logguer.error('error on io connection', error)
        }


        socket.on('new-msj', async(data) => {
            try {
                let newMsj = new saveMensajeDTO(data)
                await MdB.addMsj(data.email, newMsj)
                buscarmens(socket,data.email)
            }
            catch (error) {
                logguer.error('error on io new-msj', error)
            }
        })
        socket.on('respMensaje', async({id,text}) => {
            try {
                let email = connectedUsers[id]
                let data = {email:'admin@admin',text,sistema:true}
                let resMsj = new saveMensajeDTO(data)
                await MdB.addMsj(email,resMsj )
                let msjs= await buscarmens(socket,email)
                io.to(id).emit("update", msjs)
            }
            catch (error) {
                logguer.error('error on io resp-msj', error)
            }

        })
    })



}



export default ioServer