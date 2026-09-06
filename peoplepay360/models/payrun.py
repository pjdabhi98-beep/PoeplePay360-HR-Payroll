from odoo import models, fields, api
from odoo.exceptions import ValidationError, UserError


class PeoplePayPayrun(models.Model):
    _name = "peoplepay.payrun"
    _description = "Payroll Payrun"
    _order = "date_start desc"

    name = fields.Char(
        string="Payrun Name",
        required=True
    )

    date_start = fields.Date(
        string="Start Date",
        required=True
    )

    date_end = fields.Date(
        string="End Date",
        required=True
    )

    state = fields.Selection(
        [
            ("draft", "Draft"),
            ("processing", "Processing"),
            ("done", "Done"),
            ("cancelled", "Cancelled"),
        ],
        string="Status",
        default="draft",
        required=True
    )

    payslip_ids = fields.One2many(
        "peoplepay.payslip",
        "payrun_id",
        string="Payslips"
    )

    payslip_count = fields.Integer(
        string="Payslips",
        compute="_compute_payslip_count"
    )

    @api.depends("payslip_ids")
    def _compute_payslip_count(self):
        for record in self:
            record.payslip_count = len(record.payslip_ids)

    @api.constrains("date_start", "date_end")
    def _check_dates(self):
        for record in self:
            if record.date_start and record.date_end:
                if record.date_end < record.date_start:
                    raise ValidationError(
                        "End Date cannot be before Start Date."
                    )

    def action_process(self):
        Payslip = self.env["peoplepay.payslip"]

        for payrun in self:

            if not payrun.date_start or not payrun.date_end:
                raise UserError(
                    "Please enter Payrun Start Date and End Date."
                )

            # Find running contracts active during this pay period
            contracts = self.env["peoplepay.contract"].search([
                ("state", "=", "running"),
                ("start_date", "<=", payrun.date_end),
                "|",
                ("end_date", "=", False),
                ("end_date", ">=", payrun.date_start),
            ])

            if not contracts:
                raise UserError(
                    "No running contracts found for this pay period."
                )

            for contract in contracts:

                # Prevent duplicate payslips
                existing = Payslip.search([
                    ("payrun_id", "=", payrun.id),
                    ("employee_id", "=", contract.employee_id.id),
                ], limit=1)

                if existing:
                    continue

                if not contract.salary_structure_id:
                    raise UserError(
                        "Salary Structure is missing for contract: "
                        + contract.name
                    )

                Payslip.create({
                    "name": "PS-%s-%s" % (
                        payrun.id,
                        contract.employee_id.employee_code
                    ),
                    "employee_id": contract.employee_id.id,
                    "contract_id": contract.id,
                    "payrun_id": payrun.id,
                    "date_from": payrun.date_start,
                    "date_to": payrun.date_end,
                })

            payrun.state = "processing"

    def action_done(self):
        self.write({
            "state": "done"
        })

    def action_cancel(self):
        self.write({
            "state": "cancelled"
        })