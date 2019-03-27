const request = require('request');
const async = require('async');

module.exports = function(app){

    var controller = {};

    //#region GET

    controller.getCardGTW2 = function(req, res) {

        if (req.query.CID){

            var id = req.query.CID;

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

    controller.postCardGTW2 = function(req, res) {

        if (!req.query.CID || !req.query.number || !req.query.issuer || !req.query.expire_month || !req.query.expire_year || !req.query.cvv) {

            res.json({
                status: "error",
                message: "Missing one or more parameters.",
            });

        } else {
            var id = req.query.CID;

            request.post(
                'https://gtw2.rafaelverger.com.br/clients/'+id+'/cards/',
                {
                    json: {
                        number: req.query.number,
                        issuer: req.query.issuer,
                        expire_month: req.query.expire_month,
                        expire_year: req.query.expire_year,
                        cvv: req.query.cvv
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

    //#endregion

    return controller;
};