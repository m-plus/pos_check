# -*- coding: utf-8 -*-
from odoo import fields, models


class AccountBankStatementLine(models.Model):
    _inherit = 'account.bank.statement.line'

    check_bank_id = fields.Many2one('res.bank', string="Check bank")
    check_bank_acc = fields.Char('Check bank account')
    check_number = fields.Char()
    check_owner = fields.Char()
    check_info_required = fields.Boolean(related='journal_id.check_info_required', readonly=True)
