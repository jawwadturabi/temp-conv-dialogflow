const functions = require('firebase-functions')  //getting firebase functions
var admin = require("firebase-admin")            //getting firebase admin and for using module in an app
admin.initializeApp(functions.config().firebase)  //initializing the default app
var firestore = admin.firestore //using firestore

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

exports.Webhook1 = functions.https.onRequest((request, response) => {

    let params = request.body.queryResult.parameters   //intializing parameters
    let intentname = request.body.queryResult.intent.displayName   //getting parameters from dialogflow

    let K = params.temp1
    console.log("num : ", params.temp1)
    let calc = (((parseInt(params.num1) - 273.15) * 9/5) + 32)
    let calc1=(((parseInt(params.num1) - 32) * 5/9) + 273.15)
 
    switch (intentname) {

        case 'temperature':

            console.log("num : ", params.num1)
            if (params.temp1 === 'kelvin' && params.temp2 === 'fahrenheit') {
                response.send({
                    fulfillmentText: `${parseInt(params.num1)} Kelvin in Fahrenheit is 
                        ${calc.toFixed(2)}°F`

                })
                break
            }
            else if (params.temp1 === 'celsius' && params.temp2 === 'fahrenheit') {
                response.send({
                    fulfillmentText: `${parseInt(params.num1)}°C in Fahrenheit is 
                         ${(parseInt(params.num1) * 9 / 5) + 32}°F`
                })

            }
            else if (params.temp1 === 'kelvin' && params.temp2 === 'celsius') {
                response.send({
                    fulfillmentText: `${parseInt(params.num1)} K in Celsius is 
                            ${parseInt(params.num1) - 273.15}°C`
                })

            }
            else if (params.temp1 === 'fahrenheit' && params.temp2 === 'celsius') {

                response.send({
                    fulfillmentText: `${parseInt(params.num1)} °F in Celsius is 
                            ${((parseInt(params.num1) - 32) * 9 / 5)}°C`

                })
            }
            else if (params.temp1 === 'fahrenheit' && params.temp2 === 'kelvin') {

                response.send({
                    fulfillmentText: `${parseInt(params.num1)} °F in Kelvin is 
                            ${calc1.toFixed(2)} K`

                })
            }

            else if (params.temp1 === 'celsius' && params.temp2 === 'kelvin') {
                response.send({
                    fulfillmentText: `${parseInt(params.num1)} °C in Kelvin is 
                            ${parseInt(params.num1) + 273.15} K`
                })
            }
            else {
                console.log("else is trigger")
                response.send({

                    fulfillmentText: `not trigger any`
                })
            }

            break
        default:
            {
                console.log("default triggered")
                response.send({

                    fulfillmentText: `The required operation is not available`
                })
            }


    }
});
