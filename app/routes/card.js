module.exports = function(app){

    var Card = app.controllers.card;

    app.get('/get/card/', Card.getCardGTW2);

    app.post('/post/card/', Card.postCardGTW2);

};