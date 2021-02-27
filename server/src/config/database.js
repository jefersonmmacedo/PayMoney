const mongoose = require('mongoose')
mongoose.Promise = global.Promise

module.exports = mongoose.connect('mongodb://localhost/paymoney', { useNewUrlParser: true })


// Tradução de mensagens de Erro
mongoose.Error.messages.general.required = "O atributo '{PATH} é obrigatório"
mongoose.Error.messages.Number.min = "O '{VALUE}' infoermado é menor que o limite mínimo de '{MIN}'"
mongoose.Error.messages.Number.max = "O '{VALUE}' infoermado é menor que o limite mínimo de '{MAX}'"
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'"
