import bcrypt from 'bcrypt'

export const encrypt=(password)=>{
     return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const compare= (password,hashedPass)=>{
   return bcrypt.compareSync(password, hashedPass)
}