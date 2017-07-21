odoo.define('pos_check.models', function (require) {
"use strict";

var models = require('point_of_sale.models');

//load new field 'check_info_required'
models.load_fields("account.journal", "check_info_required");

//load model res.bank
models.load_models({
    model: 'res.bank',
    fields: ['name'],
    loaded: function(self, banks){
        self.banks = banks;
    },
}, {after: 'res.country'});

var paymentline_super = models.Paymentline.prototype;
models.Paymentline = models.Paymentline.extend({
    init_from_JSON: function (json) {
        paymentline_super.init_from_JSON.apply(this, arguments);

        this.check_bank_id = json.check_bank_id;
        this.check_bank_acc = json.check_bank_acc;
        this.check_number = json.check_number;
        this.check_owner = json.check_owner;
    },
    export_as_JSON: function () {
        return _.extend(paymentline_super.export_as_JSON.apply(this, arguments), {
            check_bank_id: this.check_bank_id,
            check_bank_acc: this.check_bank_acc,
            check_number: this.check_number,
            check_owner: this.check_owner
        });
    },
});

var order_super = models.Order.prototype;
models.Order = models.Order.extend({
    add_paymentline_with_check: function(cashregister, infos) {
        this.assert_editable();
        var newPaymentline = new models.Paymentline({},{order: this, cashregister:cashregister, pos: this.pos});
        $.extend(newPaymentline, infos);
        if(cashregister.journal.type !== 'cash' || this.pos.config.iface_precompute_cash){
            newPaymentline.set_amount( Math.max(this.get_due(),0) );
        }
        this.paymentlines.add(newPaymentline);
        this.select_paymentline(newPaymentline);
    },

    update_paymentline_with_check: function(paymentline, infos) {
        this.assert_editable();
        $.extend(paymentline, infos);
        this.select_paymentline(paymentline);
    },
});

return models;
});