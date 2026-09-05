from odoo import models, fields, api
from odoo.exceptions import ValidationError


class PeoplePayContract(models.Model):
    _name = "peoplepay.contract"
    _description = "Employee Contract"
    _order = "start_date desc"

    name = fields.Char(
        string="Contract Reference",
        required=True
    )

    employee_id = fields.Many2one(
        "peoplepay.employee",
        string="Employee",
        required=True,
        ondelete="cascade"
    )

    start_date = fields.Date(
        string="Start Date",
        required=True
    )

    end_date = fields.Date(
        string="End Date"
    )

    wage = fields.Float(
        string="Wage",
        required=True,
        default=0.0
    )

    salary_structure_id = fields.Many2one(
        "peoplepay.salary.structure",
        string="Salary Structure"
    )

    state = fields.Selection(
        [
            ("draft", "Draft"),
            ("running", "Running"),
            ("expired", "Expired"),
            ("cancelled", "Cancelled"),
        ],
        string="Status",
        default="draft",
        required=True
    )

    @api.constrains("start_date", "end_date")
    def _check_dates(self):
        for contract in self:
            if (
                contract.end_date
                and contract.start_date
                and contract.end_date < contract.start_date
            ):
                raise ValidationError(
                    "End Date cannot be before Start Date."
                )

    @api.constrains("employee_id", "start_date", "end_date")
    def _check_overlapping_contracts(self):
        for contract in self:
            if not contract.employee_id or not contract.start_date:
                continue

            domain = [
                ("id", "!=", contract.id),
                ("employee_id", "=", contract.employee_id.id),
                ("state", "in", ["draft", "running"]),
                ("start_date", "<=", contract.end_date or "9999-12-31"),
                "|",
                ("end_date", "=", False),
                ("end_date", ">=", contract.start_date),
            ]

            if self.search_count(domain):
                raise ValidationError(
                    "This employee already has an overlapping contract."
                )

    @api.onchange("employee_id")
    def _onchange_employee_id(self):
        if self.employee_id:
            self.name = f"Contract - {self.employee_id.name}"