import { createTransport } from "nodemailer"

import config from "../config.js"
import logguer from "./logger.js"



function correo(tipo, datos) {
    let destinatario, subject, html

    if (tipo == 'registro') {
        destinatario = config.nodemailer.administradorMail
        subject = 'Nuevo Registro'
        html = `Nuevo Registro con id ${datos._id} 
        Nombre:${datos.username}
        Nº Telefono: ${datos.phone}
        Direccion: ${datos.address}
        Email: ${datos.email}
        `
        logguer.info('Mail de registro enviado')
        console.log(html)
        // enviar()
    }

    if (tipo == 'pedido') {
        destinatario = config.nodemailer.administradorMail
        subject = `Nuevo pedido de ${datos.usuario.username}`
        let productos = datos.productos
        let comprados = ``
        let total = 0
        Object.entries(productos).forEach(([key, value]) => {
            comprados = comprados + `
            Item:${value.producto.nombre}
            Precio Unitario:$ ${value.producto.precio} 
            Cantidad:${value.cant}
            Subtotal :$${value.producto.precio * value.cant}

            -------------------------------
            `
            total = total + (value.producto.precio * value.cant)
        });


        html = ` 
        Nombre:${datos.usuario.username}
        Email: ${datos.usuario.email}
        Detalle de la Compra:
        //////////////////////////////////////////////////////////////////
        ${comprados}
        TOTAL COMPRA:$ ${total}
        //////////////////////////////////////////////////////////////////
        `
        logguer.info('Mail de pedido enviado')
        console.log(html)
        //enviar()
    }

    const enviar = async () => {//funcion comentada: muestra por consola el supuesto mail
        const transporter = createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: config.nodemailer.serverMail,
                pass: config.nodemailer.password
            }
        })

        const opts = await transporter.sendMail({
            from: config.nodemailer.serverMail,
            to: destinatario,
            subject,
            html
        })

        try {
            const info = await transporter.sendMail(opts)
            logguer.info(info)
        } catch (err) {
            logguer.error(`error al enviar mail ${err}`)
        }
    }

}

export default correo
