# -*- coding: utf-8 -*-
from odoo import fields, models


class AccountJournal(models.Model):
    _inherit = 'account.journal'

    check_info_required = fields.Boolean('Check info required?', default=False)
