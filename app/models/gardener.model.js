module.exports = (sequelize, Sequelize) => {
    const Gardener = sequelize.define("gardeners", {
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      notes: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING
      },
      availiable: {
          type: Sequelize.BOOLEAN
      }
    }, {
        getterMethods: {
            image: function(){
                if(this.getDataValue('image') == '' || this.getDataValue('image') == null)
                    return 'default.png';
                else
                    return this.getDataValue('image');
            }
        },
    });
  
    return Gardener;
};