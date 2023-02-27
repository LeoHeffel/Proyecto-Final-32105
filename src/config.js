import * as dotenv from 'dotenv'

dotenv.config()

export default{
    mongoDB:{
        uri:process.env.DB_USERS,
        options: {serverSelectionTimeoutMS:process.env.TIMEOUT}
    },
    twilio:{
        token:process.env.TWILIO_TOKEN,
        number:process.env.TWILIO_NUM
    },
    tipoBD:process.env.TIPO,
    nodemailer:{
        serverMail:process.env.MAIL_SERV,
        administradorMail: process.env.MAIL_ADMIN,
        password:process.env.PASS_MAIL
    },
    session:{
        secret:process.env.SECRET_SESSION,
        url:process.env.DB_SESION
    },
    modo: process.env.MODO,
    port: process.env.PORTALT
}