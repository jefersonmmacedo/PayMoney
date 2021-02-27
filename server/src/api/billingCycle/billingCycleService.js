const BillingCycle = require('./billingCycle')
const errorHandle = require('../common/errorHandler')


//Rotas padrão da aplicação
BillingCycle.methods(['get', 'post', 'put', 'delete'])
// validação para rota de Update
BillingCycle.updateOptions({new: true, runValidators: true})
// Tratamento de erros com UPDATE e POST
BillingCycle.after('post', errorHandle).after('put', errorHandle)


//Rota get, buscando todos os registros
BillingCycle.route('get', (req, res, next) => {
    BillingCycle.find({}, (err, docs) => {

        if(!err) {
            res.json(docs)
        } else {
            res.status(500).json({errors: [error]})
        }
    })
})

// Rota de contagem de ciclos de pagamento
BillingCycle.route('count', (req, res, next) => {
    BillingCycle.count((error, value) => {
        if(error) {
            res. status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

//Rota do total de valores de débito e crédito
BillingCycle.route('summary', (req, res, next) => {
    BillingCycle.aggregate([{ 
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}} 
    }, { 
        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
    }, { 
        $project: {_id: 0, credit: 1, debt: 1}
    }], (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result[0] || {credit: 0, debt: 0})
        }
    })
})

module.exports = BillingCycle