import MongoStore from "connect-mongo"

import config from "../config.js"

const sessionOptions = {
    secret: config.session.secret,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
    store: MongoStore.create({
        mongoUrl: config.session.url,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    })
}
export default sessionOptions