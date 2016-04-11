Ext.define('Associations.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Associations.store.Cities'
    ],

    alias: 'controller.main',

    onSelectState: function (sender, record, event) {
        record.cities(function (cities) {
            sender.up('form').down('#cityCmb').setStore(cities);
        });
    }

});
