exports.seed = function (knex) {
    return knex('cars').truncate()
        .then(function () {
            return knex('cars').insert([
                {vin: '1FTHW25F4TEB51909', make: 'Jeep', model: 'Wrangler', mileage: 50000, title: 'clean', transmission: 'working'},
                {vin: '2GKALSEKXC6183960', make: 'Dodge', model: 'Dart', mileage: 50000, title: 'lien', transmission: ''},
                {vin: '1GT22XEG2FZ167918', make: 'Chevy', model: 'Nova', mileage: 50000, title: '', transmission: ''},
            ])
        })
}