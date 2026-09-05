from odoo import models, fields


class PeoplePayTimeOffType(models.Model):
    _name = "peoplepay.time.off.type"
    _description = "Time Off Type"

    name = fields.Char(
        string="Leave Type",
        required=True
    )

    code = fields.Char(
        string="Code",
        required=True
    )

    is_paid = fields.Boolean(
        string="Paid Leave",
        default=True
    )

    requires_allocation = fields.Boolean(
        string="Requires Allocation",
        default=True
    )

    active = fields.Boolean(
        string="Active",
        default=True
    )