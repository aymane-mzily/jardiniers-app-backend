const db = require("../models");
const Gardener = db.gardener;

exports.delete = (req, res) => {
    const id = req.params.id;
    Gardener.destroy({
        where: { id: id }
    }).then(num => {
        res.redirect('/');
    });
};

exports.index = (req, res) => {
    Gardener.findAll().then(results => {
        res.render('index', {
            gardeners:results
        });
    });
};

exports.add = (req, res) => {
    res.render('add');
};

exports.addPOST = (req, res) => {
    var image = null;
    if (req.file)
        image = req.file.filename;
    Gardener.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        price: req.body.price,
        notes: req.body.notes,
        availiable: (req.body.availiable == '1' ? true : false),
        image: image,
    });
    res.redirect('/');
};

exports.edit = (req, res) => {
    Gardener.findOne({
        where: {
          id: req.params.id
        }
      }).then(gardener => {
          if(gardener){
            res.render('edit', {
                gardener:gardener
            });
          }else{
            res.redirect('/');
          }
      });
};

exports.editPOST = (req, res) => {
    var updateData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        price: req.body.price,
        notes: req.body.notes,
        availiable: (req.body.availiable == '1' ? true : false),
    };
    if (req.file)
        updateData["image"] = req.file.filename;
    Gardener.update(updateData, {
        where: { id: req.params.id }
    }).then(num => {
        res.redirect('/');
    });
};