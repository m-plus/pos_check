odoo.define('pos_check.popups', function (require) {
"use strict";

var PopupWidget = require('point_of_sale.popups');
var gui = require('point_of_sale.gui');

var CheckInfoWidget = PopupWidget.extend({
    template: 'CheckInfoWidget',
    show: function(options){
        options = options || {};
        this._super(options);
        this.renderElement();

        if(options.data){
            var data = options.data;
            this.$('select[name=check_bank_id]').val(data.check_bank_id);
            this.$('input[name=check_bank_acc]').val(data.check_bank_acc);
            this.$('input[name=check_number]').val(data.check_number);
            this.$('input[name=check_owner]').val(data.check_owner);
        }
        this.$('select[name=check_bank_id]').focus();
    },
    click_confirm: function(){
        var infos = {
            'check_bank_id' : this.$('select[name=check_bank_id]').val(),
            'check_bank_acc': this.$('input[name=check_bank_acc]').val(),
            'check_number'  : this.$('input[name=check_number]').val(),
            'check_owner'   : this.$('input[name=check_owner]').val(),
        };
        var valid = true;
        if(this.options.validate_info){
            valid = this.options.validate_info.call(this, infos);
        }

        if(!valid) return;

        this.gui.close_popup();
        if( this.options.confirm ){
            this.options.confirm.call(this, infos);
        }
    },
});
gui.define_popup({name:'check-info-input', widget: CheckInfoWidget});

return PopupWidget;
});