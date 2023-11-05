import passport from "passport"
import { Strategy } from 'passport-local'
import jwt from "passport-jwt";
import { cookieExtractor } from "./cookieExtractor.js";
import daos from '../daos/DAOFactory.js'
import config from "../config.js";

const JwtStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt;
const { register, login, find } = daos.DAOusers


passport.use('register', new Strategy({ passReqToCallback: true }, (req, username, password, done) => register(req, username, password, done)))

passport.use('login', new Strategy({}, (username, password, done) => login(username, password, done)))

passport.use('jwtAuth', new JwtStrategy(
    {
        //Extraigo la info del token
        jwtFromRequest: extractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.session.secret
    },
    async (jwtPayload, done) =>{
        console.log('jwtPayload', jwtPayload)
        try{
            return done(null, jwtPayload)
        } catch(error){
            return done(error)
        }
    }
))

passport.serializeUser((user, done) => { done(null, user._id) })

passport.deserializeUser((id, done) => { find(id, done) })

export default passport