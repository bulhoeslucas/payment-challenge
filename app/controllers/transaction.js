const request = require('request');
const async = require('async');

module.exports = function(app){

    var controller = {};

    //#region GET

    controller.getTransactionGTW1 = function(req, res) {

        if (req.query.CID) {

        var id = req.query.CID;

            request(
                'https://gtw1.rafaelverger.com.br/clients/' + id + '/transactions/',
                function (error, response, body) {

                    if (error) {
                        res.json({
                            status: "error",
                            message: error,
                        });
                    } else {
                        try {

                            var retorno = JSON.parse(body);

                        } catch (e) {

                            retorno = body;

                        } finally {
                            res.json(retorno);
                        }                    
                    }
                }

            );

        } else {
            res.json({
                status: "error",
                message: "CID is needed.",
            });
        }

    };

    controller.getTransactionGTW2 = function(req, res) {

        if (req.query.CID) {

        var id = req.query.CID;

            request(
                'https://gtw2.rafaelverger.com.br/clients/' + id + '/transactions/',
                function (error, response, body) {

                    if (error) {
                        res.json({
                            status: "error",
                            message: error,
                        });
                    } else {
                        try {

                            var retorno = JSON.parse(body);

                        } catch (e) {

                            retorno = body;

                        } finally {

                            res.json(retorno);
                        }                    
                    }
                }

            );

        } else {
            res.json({
                status: "error",
                message: "CID is needed.",
            });
        }
        
    };

    // A route to retrieve transactions. It shall allows filtering by clients or payment service used.
    controller.getTransaction = function(req, res) {

        if (req.query.CID) {

            var id = req.query.CID;

            var url = req.query.paymentService && req.query.paymentService.toLowerCase() == 'two' || req.query.paymentService == '2' ?
                        'https://gtw2.rafaelverger.com.br/clients/' : 
                        'https://gtw1.rafaelverger.com.br/clients/';

            url += id + '/transactions/';

            request(
                url,
                function (error, response, body) {

                    if (error) {
                        res.json({
                            status: "error",
                            message: error,
                        });
                    } else {
                        try {

                            var retorno = JSON.parse(body);

                        } catch (e) {

                            retorno = body;

                        } finally {

                            res.json(retorno);
                        }                    
                    }
                }

            );

        } else {
            res.json({
                status: "error",
                message: "CID is needed.",
            });
        }
        
    };

    //#endregion

    //#region POST

    controller.postTransactionGTW1 = function(req, res) {

        if (!req.query.CID || !req.query.amount || !req.query.creditcard || !req.query.creditcard.number || !req.query.creditcard.issuer || !req.query.creditcard.expire_month || !req.query.creditcard.expire_year || !req.query.creditcard.cvv) {

            res.json({
                status: "error",
                message: "Missing one or more parameters.",
            });

        } else if (req.query.amount <= 100 ) {

            res.json({
                status: "error",
                message: "Insufficient amount.",
            });
        
        } else {
            var id = req.query.CID;

            request.post(
                'https://gtw1.rafaelverger.com.br/clients/'+id+'/transactions/',
                {
                    json: {
                        amount: parseInt(req.query.amount),
                        creditcard: {
                            number: req.query.creditcard.number,
                            issuer: req.query.creditcard.issuer,
                            expire_month: req.query.creditcard.expire_month,
                            expire_year: req.query.creditcard.expire_year,
                            cvv: req.query.creditcard.cvv
                        }
                    }
                },
                function (error, response, body) {
                    if (error) {
                        res.json({
                            status: "error",
                            message: error,
                        });
                    } else 
                        res.json(body);
                }
            );
        }
        
    };

    controller.postTransactionGTW2 = function(req, res) {

        if (!req.query.CID || !req.query.amount || !req.query.creditcard) {

            res.json({
                status: "error",
                message: "Missing one or more parameters.",
            });

        } else if (req.query.amount <= 100 ) {

            res.json({
                status: "error",
                message: "Insufficient amount.",
            });
        
        } else {
            var id = req.query.CID;

            request.post(
                'https://gtw2.rafaelverger.com.br/clients/'+id+'/transactions/',
                {
                    json: {
                        amount: parseInt(req.query.amount),
                        creditcard: req.query.creditcard                            
                    }
                },
                function (error, response, body) {
                    if (error) {
                        res.json({
                            status: "error",
                            message: error,
                        });
                    } else 
                        res.json(body);
                }
            );
        }
        
    };

    // A route to create Transactions.
    // A transaction should be created in only one payment service (randomly choosed in each request).
    controller.postTransaction = function(req, res) {

        if (!req.query.CID || !req.query.amount || !req.query.creditcard || !req.query.creditcard.number || !req.query.creditcard.issuer || !req.query.creditcard.expire_month || !req.query.creditcard.expire_year || !req.query.creditcard.cvv) {

            res.json({
                status: "error",
                message: "Missing one or more parameters.",
            });

        } else if (req.query.amount <= 100 ) {

            res.json({
                status: "error",
                message: "Insufficient amount.",
            });
        
        } else {
            
            var id = req.query.CID;

            if (Math.random() % 2 == 1) {

                request.post(
                    'https://gtw1.rafaelverger.com.br/clients/'+id+'/transactions/',
                    {
                        json: {
                            amount: parseInt(req.query.amount),
                            creditcard: {
                                number: req.query.creditcard.number,
                                issuer: req.query.creditcard.issuer,
                                expire_month: req.query.creditcard.expire_month,
                                expire_year: req.query.creditcard.expire_year,
                                cvv: req.query.creditcard.cvv
                            }
                        }
                    },
                    function (error, response, body) {
                        if (error) {
                            res.json({
                                status: "error",
                                message: error,
                            });
                        } else 
                            res.json(body);
                    }
                );

            } else {

                request(
                    'https://gtw2.rafaelverger.com.br/clients/' + id + '/cards/',
                    function (error, response, body) {
    
                        if (error) {

                            res.json({
                                status: "error",
                                message: error,
                            });

                        } else {

                            try {
                                var retorno = JSON.parse(body);    
                            } catch (e) {    
                                retorno = body;    
                            } finally {

                                if (retorno[0] && retorno[0].hash) { // tem cartão?

                                    request.post(
                                        'https://gtw2.rafaelverger.com.br/clients/'+id+'/transactions/',
                                        {
                                            json: {
                                                amount: parseInt(req.query.amount),
                                                creditcard: retorno[0].hash // utiliza o existente
                                            }
                                        },
                                        function (error2, response2, body2) {
                                            if (error2) {
                                                res.json({
                                                    status: "error",
                                                    message: error2,
                                                });
                                            } else 
                                                res.json(body2);
                                        }
                                    );

                                } else {

                                    request.post(
                                        'https://gtw2.rafaelverger.com.br/clients/'+id+'/cards/', // cria um novo cartão
                                        {
                                            json: {
                                                number: req.query.creditcard.number,
                                                issuer: req.query.creditcard.issuer,
                                                expire_month: req.query.creditcard.expire_month,
                                                expire_year: req.query.creditcard.expire_year,
                                                cvv: req.query.creditcard.cvv
                                            }
                                        },
                                        function (error, response, body) {
                                            if (error) {
                                                res.json({
                                                    status: "error",
                                                    message: error,
                                                });
                                            } else {
                    
                                                request.post(
                                                    'https://gtw2.rafaelverger.com.br/clients/'+id+'/transactions/',
                                                    {
                                                        json: {
                                                            amount: parseInt(req.query.amount),
                                                            creditcard: body.hash // utiliza o novo cartão
                                                        }
                                                    },
                                                    function (error2, response2, body2) {
                                                        if (error2) {
                                                            res.json({
                                                                status: "error",
                                                                message: error2,
                                                            });
                                                        } else 
                                                            res.json(body2);
                                                    }
                                                );
                    
                                            }                            
                                        }
                                    );
                                }
                            }                    
                        }
                    }
                );

            }

        }
        
    };

    //#endregion

    return controller;
};