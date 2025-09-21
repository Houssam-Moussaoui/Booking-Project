module.exports = 


function retour_login(req, res, next) {
    if (!req.session.userId) {
        return res.redirect("/index.html");
    }
    next();
}
    