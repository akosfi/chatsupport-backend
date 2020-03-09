import jwt from 'jsonwebtoken';

const authMW = (req: any, res: any, next: any) => {
    if(req.cookies.token){
        jwt.verify(req.cookies.token, "secret", (err: any, decoded: any) => {
            if(err) {
                res.status(403);
                return res.end();
            }
            return next();
        });
    }
    else {
        res.status(403);
        return res.end();
    }
};

export {authMW};