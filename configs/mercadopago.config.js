var mercadopago = require('mercadopago');

const mercadopagoConfig =
    mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN)


module.exports = mercadopagoConfig