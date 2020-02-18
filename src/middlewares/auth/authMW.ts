const authMW = (req: any, res: any, next: any) => {
    if (!req.session.user || !req.session.user.id) {
        return res.redirect('/login');
    }
    next();
};

export {authMW};