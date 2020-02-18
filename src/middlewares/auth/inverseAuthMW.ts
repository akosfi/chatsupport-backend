const inverseAuthMW = (req: any, res: any, next: any) => {
    if (req.session.user && req.session.user.id) {
        return res.redirect('/chat');
    }
    next();
};

export { inverseAuthMW };