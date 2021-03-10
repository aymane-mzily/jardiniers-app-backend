const db = require("../models");
const Gardener = db.gardener;


exports.listAvailiable = (req, res) => {
    Gardener.findAll({
        where: {
            availiable: true
        }
    }).then(gardeners => {
        res.send(gardeners);
    });
}