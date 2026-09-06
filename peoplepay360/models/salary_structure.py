from odoo import models, fields


class PeoplePaySalaryStructure(models.Model):
    _name = "peoplepay.salary.structure"
    _description = "Salary Structure"
    _order = "name"

    name = fields.Char(
        string="Structure Name",
        required=True
    )

    code = fields.Char(
        string="Code",
        required=True
    )

    rule_ids = fields.One2many(
        "peoplepay.salary.rule",
        "structure_id",
        string="Salary Rules"
    )

    active = fields.Boolean(
        string="Active",
        default=True
    )