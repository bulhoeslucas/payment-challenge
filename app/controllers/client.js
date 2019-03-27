const request = require('request');
const async = require('async');

module.exports = function(app){

    var controller = {};

    //#region GET

    controller.getClientsGTW1 = function(req, res) {

        var id = req.query.CID ? req.query.CID : '';

        request.get(
            'https://gtw1.rafaelverger.com.br/clients/' + id,
			function (error, response, body) {

                if (error) {
                    res.json({
                        status: "error",
                        message: error
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
        
    };

    controller.getClientsGTW2 = function(req, res) {

        var id = req.query.CID ? req.query.CID : '';

        request(
			'https://gtw2.rafaelverger.com.br/clients/' + id,
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
        
    };

    // A route to retrieve clients.
    controller.getClient = function(req, res) {

        var result1 = null;
        var result2 = null;

        var id = req.query.CID ? req.query.CID : null;

        async.parallel([

            function(callbackF1){

                if (id) {

                    request(
                        'https://gtw1.rafaelverger.com.br/clients/' + id,
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
                                    result1 = retorno != '' ? retorno : null;
                                    callbackF1();
                                }                    
                            }
                        }
            
                    );

                } else
                    callbackF1();

            },

            function(callbackF2) {

                if (id) {

                    request(
                        'https://gtw2.rafaelverger.com.br/clients/' + id,
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
                                    result2 = retorno != '' ? retorno : null;
                                    callbackF2();
                                }                    
                            }
                        }
            
                    );

                } else 
                    callbackF2();

            }

        ], function(){

            var temp = null;

            if (result1 && result2){
                temp = {
                    GTW1: result1,
                    GTW2: result2
                }
            } else {
                temp = result1 ? result1 : result2;
            }

            res.json(temp);

        });
        
    };

    //#endregion

    //#region POST

    controller.postClientGTW1 = function(req, res) {        

        request.post(
            'https://gtw1.rafaelverger.com.br/clients/',
            { 
                json: {
                    first_name: req.query.first_name,
                    last_name: req.query.last_name, 
                    email: req.query.email
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
        
    };

    controller.postClientGTW2 = function(req, res) {

        request.post(
            'https://gtw2.rafaelverger.com.br/clients/',
            { 
                json: {
                    fullname: req.query.fullname, 
                    email: req.query.email
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
        
    };

    // A route to create Clients.
    controller.postClient = function(req, res) {

        var result1 = null;
        var result2 = null;

        async.parallel([

            function(callbackF1){

                request.post(
                    'https://gtw1.rafaelverger.com.br/clients/',
                    { 
                        json: {
                            first_name: req.query.first_name,
                            last_name: req.query.last_name, 
                            email: req.query.email
                        } 
                    },
                    function (error, response, body) {                
                        if (error) {
                            result1 = {
                                status: "error",
                                message: error,
                            };
                            callbackF1();
                        } else {
                            try {
            
                                var retorno = JSON.parse(body);
        
                            } catch (e) {
        
                                retorno = body;
        
                            } finally {
                                result1 = retorno;
                                callbackF1();
                            } 
                        }
                    }
                );

            },

            function(callbackF2){

                var fullName = req.query.first_name + ' ' + req.query.last_name;

                request.post(
                    'https://gtw2.rafaelverger.com.br/clients/',
                    { 
                        json: {
                            fullname: fullName, 
                            email: req.query.email
                        } 
                    },
                    function (error, response, body) {                
                        if (error) {
                            result1 = {
                                status: "error",
                                message: error,
                            };
                            callbackF2();
                        } else {
                            try {
            
                                var retorno = JSON.parse(body);
        
                            } catch (e) {
        
                                retorno = body;
        
                            } finally {
                                result2 = retorno;
                                callbackF2();
                            } 
                        }
                    }
                );

            },

        ], function(){

            res.json({
                GTW1: result1,
                GTW2: result2
            });

        });
        
    };

    //#endregion

    return controller;
};