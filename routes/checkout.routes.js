const express = require("express")
var mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN)

const router = express.Router()


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

module.exports = router