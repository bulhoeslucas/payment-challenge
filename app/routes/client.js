module.exports = function(app){

    var Client = app.controllers.client;

    app.get('/get/client/one/', Client.getClientsGTW1);

    app.get('/get/client/two/', Client.getClientsGTW2);

    // A route to retrieve clients.
    app.get('/get/client/', Client.getClient);

    app.post('/post/client/one/', Client.postClientGTW1);

    app.post('/post/client/two/', Client.postClientGTW2);

    // A route to create Clients.
    app.post('/post/client/', Client.postClient);

};