import jwt from 'jsonwebtoken';
import config from '../config.js'
export const generateToken = (user) => {
    const token = jwt.sign(
        {
        username: user.username,
        age: user.age,
        address: user.address,
        phone: user.phone,
        id: user._id,
        photo: user.photo,  
        email: user.email,
        admin: user.admin
        },
        config.session.secret,
        { expiresIn: '12h' }
    )
    return token
}