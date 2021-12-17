const express = require("express")
var mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN)

const router = express.Router()


const freightPrice = {base: 4000, basePrice: 19, variablePrice: 1.15*2}

router.post("/pix", (req,res) => {
    const aux = {...req.body}
    aux.transaction_amount = Number(aux.transaction_amount)
    mercadopago.payment.create(aux)
    .then (response => {
        res.status(200).json(response)
    })
    .catch(error => {
        res.status(400).json(error)
    })
})

router.post("/freight", async(req,res) => {
    axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${req.body.origin}&destination=${req.body.destination}&key=${process.env.GOOGLE_API_KEY}`)
    .then (response => {
        if (response.data.routes.length>0) {
            let distance = response.data.routes[0].legs[0].distance.value
            let value = 0
            if (distance < freightPrice.base) {
                value = freightPrice.basePrice
            }
            else {
                value = freightPrice.basePrice+(distance-freightPrice.base)*freightPrice.variablePrice
            }
            res.status(200).json({value})
        }
        else {
            res.status(404).json({})
        }
    })
    .catch (error => {
        res.status(400).json(error)
    }
    )
})

module.exports = router