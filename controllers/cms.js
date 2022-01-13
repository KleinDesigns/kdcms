exports.getIndex = (req, res, next) => {
    res.render('_templates/main-layout', {
        path: "/", 
        pageTitle: "CMS"
    });
};