Ext.define('Associations.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Associations.store.Cities'
    ],

    alias: 'controller.main',

    onChangeWithRelation: function (sender, value) {
        /**
         * When `withRelated` is set to true, server will append `cities` as part of `State` object.
         * If false, then a get request will be sent to server to retrieve the `cities` for particular that `Sate`.
         */
        sender.up('form').down('#stateCmb').getStore().load({
            params: {
                withRelated: value
            }
        });
    },

    onSelectState: function (sender, record, event) {
        record.cities(function (cities) {
            sender.up('form').down('#cityCmb').setStore(cities);
        });
    }

});
