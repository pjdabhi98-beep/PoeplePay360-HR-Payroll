from odoo import models, fields


class PeoplePaySalaryRule(models.Model):
    _name = "peoplepay.salary.rule"
    _description = "Salary Rule"
    _order = "sequence, id"

    name = fields.Char(
        string="Rule Name",
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

    rule_type = fields.Selection(
        [
            ("earning", "Earning"),
            ("deduction", "Deduction"),
        ],
        string="Type",
        required=True,
        default="earning"
    )

    amount_type = fields.Selection(
        [
            ("fixed", "Fixed Amount"),
            ("percentage", "Percentage"),
        ],
        string="Amount Type",
        required=True,
        default="fixed"
    )

    amount = fields.Float(
        string="Amount",
        required=True,
        default=0.0
    )

    structure_id = fields.Many2one(
        "peoplepay.salary.structure",
        string="Salary Structure",
        required=True,
        ondelete="cascade"
    )

    active = fields.Boolean(
        string="Active",
        default=True
    )