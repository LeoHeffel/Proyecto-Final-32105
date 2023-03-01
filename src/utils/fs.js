import fs from 'fs'


export const guardar = (datos)=>{

const archivo = `DB_USERS="${datos.dbMongo}"
DB_SESION="${datos.dbSesion}"
DB_USERS_DEV="mongodb://localhost:27017/db"
DB_SESION_DEV="mongodb://localhost:27017/sessions"
SECRET_SESSION='passwordSupersecreta'
TIMEOUT=5000
TIPO="${datos.tipo}"
MAIL_ADMIN="${datos.mailAdmin}"
MAIL_SERV="${datos.mailServidor}"
PASS_MAIL="${datos.passServidor}"
MODO="${datos.modo}"
PORTALT=${datos.port}`

    fs.writeFileSync('.env', archivo)
}

