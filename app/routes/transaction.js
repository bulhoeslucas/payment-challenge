module.exports = function(app){

    var Transaction = app.controllers.transaction;

    app.get('/get/transaction/one/', Transaction.getTransactionGTW1);

    app.get('/get/transaction/two/', Transaction.getTransactionGTW2);

    // A route to retrieve transactions. It shall allows filtering by clients or payment service used.
    app.get('/get/transaction/', Transaction.getTransaction);

    app.post('/post/transaction/one/', Transaction.postTransactionGTW1);

    app.post('/post/transaction/two/', Transaction.postTransactionGTW2);

    // A route to create Transactions.
    // A transaction should be created in only one payment service (randomly choosed in each request).
    app.post('/post/transaction/', Transaction.postTransaction);

};