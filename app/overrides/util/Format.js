/**
 * Created by manojkumar on 4/11/16.
 */
Ext.define('Associations.overrides.util.Format', {
    override: 'Ext.util.Format',

    requires: [
        'Ext.util.Format',
        'Ext.util.Inflector'
    ],

    series: function (value, queue) {
        Ext.Object.each(queue, function (key, item) {
            value = Ext.util.Format[item](value);
        });
        return value;
    },

    pluralize: function (value) {
        return Ext.util.Inflector.pluralize(value);
    }

});