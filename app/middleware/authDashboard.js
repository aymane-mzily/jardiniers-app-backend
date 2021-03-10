adminLoginChecker = (req, res, next) => {
    if (!req.session.admin || !req.cookies.admin_sid) {
        res.redirect('/login');
    } else {
        next();
    }    
};

const authDashboard = {
    adminLoginChecker: adminLoginChecker,
};

module.exports = authDashboard;