from odoo import models, fields


class PeoplePayPayslipLine(models.Model):
    _name = "peoplepay.payslip.line"
    _description = "Payslip Line"
    _order = "sequence, id"

    name = fields.Char(
        string="Salary Component",
        required=True
    )

    code = fields.Char(
        string="Code",
        required=True
    )

    sequence = fields.Integer(
        string="Sequence",
        default=10
    )

    payslip_id = fields.Many2one(
        "peoplepay.payslip",
        string="Payslip",
        required=True,
        ondelete="cascade"
    )

    rule_id = fields.Many2one(
        "peoplepay.salary.rule",
        string="Salary Rule",
        required=True,
        ondelete="cascade"
    )

    rule_type = fields.Selection(
        related="rule_id.rule_type",
        string="Type",
        store=True
    )

    amount = fields.Float(
        string="Amount",
        required=True,
        default=0.0
    )