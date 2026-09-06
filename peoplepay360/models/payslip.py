from odoo import models, fields, api
from odoo.exceptions import UserError


class PeoplePayPayslip(models.Model):
    _name = "peoplepay.payslip"
    _description = "Employee Payslip"
    _order = "date_to desc"

    name = fields.Char(
        string="Payslip Number",
        required=True
    )

    employee_id = fields.Many2one(
        "peoplepay.employee",
        string="Employee",
        required=True,
        ondelete="cascade"
    )

    contract_id = fields.Many2one(
        "peoplepay.contract",
        string="Contract",
        ondelete="set null"
    )

    payrun_id = fields.Many2one(
        "peoplepay.payrun",
        string="Payrun",
        required=True,
        ondelete="cascade"
    )

    date_from = fields.Date(
        string="From Date",
        required=True
    )

    date_to = fields.Date(
        string="To Date",
        required=True
    )

    line_ids = fields.One2many(
        "peoplepay.payslip.line",
        "payslip_id",
        string="Salary Lines"
    )

    gross_salary = fields.Float(
        string="Gross Salary",
        compute="_compute_totals",
        store=True
    )

    total_deduction = fields.Float(
        string="Total Deduction",
        compute="_compute_totals",
        store=True
    )

    net_salary = fields.Float(
        string="Net Salary",
        compute="_compute_totals",
        store=True
    )

    state = fields.Selection(
        [
            ("draft", "Draft"),
            ("computed", "Computed"),
            ("paid", "Paid"),
            ("cancelled", "Cancelled"),
        ],
        string="Status",
        default="draft",
        required=True
    )

    @api.depends("line_ids.amount", "line_ids.rule_type")
    def _compute_totals(self):
        for record in self:
            earnings = sum(
                line.amount
                for line in record.line_ids
                if line.rule_type == "earning"
            )

            deductions = sum(
                line.amount
                for line in record.line_ids
                if line.rule_type == "deduction"
            )

            record.gross_salary = earnings
            record.total_deduction = deductions
            record.net_salary = earnings - deductions

    def action_compute(self):
        for payslip in self:

            if not payslip.contract_id:
                raise UserError(
                    "Please select a Contract before computing the payslip."
                )

            contract = payslip.contract_id

            if not contract.salary_structure_id:
                raise UserError(
                    "The selected contract does not have a Salary Structure."
                )

            structure = contract.salary_structure_id

            # Remove old generated lines
            payslip.line_ids.unlink()

            # Generate lines from salary rules
            for rule in structure.rule_ids.filtered(lambda r: r.active):

                if rule.amount_type == "fixed":
                    amount = rule.amount

                elif rule.amount_type == "percentage":
                    amount = contract.wage * rule.amount / 100

                else:
                    amount = 0.0

                self.env["peoplepay.payslip.line"].create({
                    "name": rule.name,
                    "code": rule.code,
                    "sequence": rule.sequence,
                    "payslip_id": payslip.id,
                    "rule_id": rule.id,
                    "amount": amount,
                })

            payslip.state = "computed"

    def action_paid(self):
        self.write({
            "state": "paid"
        })

    def action_cancel(self):
        self.write({
            "state": "cancelled"
        })