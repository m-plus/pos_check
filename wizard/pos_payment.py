# -*- coding: utf-8 -*-
from odoo import models, api, fields

class PosMakePayment(models.TransientModel):
    _inherit = 'pos.make.payment'

    check_bank_id = fields.Many2one('res.bank', string="Check bank")
    check_bank_acc = fields.Char('Check bank account')
    check_number = fields.Char()
    check_owner = fields.Char()
    check_info_required = fields.Boolean('Check info required?')

    @api.onchange('journal_id')
    def _onchange_journal_id(self):
        self.check_info_required = self.journal_id.check_info_required
