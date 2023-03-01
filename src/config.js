import * as dotenv from 'dotenv'

dotenv.config()

export default{
    mongoDB:{
        uri:process.env.MODO=='dev'?process.env.DB_USERS_DEV:process.env.DB_USERS,
        options: {serverSelectionTimeoutMS:process.env.TIMEOUT}
    }, 
    tipoBD:process.env.TIPO,
    nodemailer:{
        serverMail:process.env.MAIL_SERV,
        administradorMail: process.env.MAIL_ADMIN,
        password:process.env.PASS_MAIL
    },
    session:{
        secret:process.env.SECRET_SESSION,
        url:process.env.MODO=='dev'? process.env.DB_SESION_DEV:process.env.DB_SESION
    },
    port: process.env.PORTALT,
    modo:'production'
}