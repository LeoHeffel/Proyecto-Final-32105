export const cookieExtractor = (req) => {
    let token;
    if (req && req.cookies) {
        token = req.cookies['cookieLogin'];

    }else{
        token = null
    }
    return token
}