from odoo import models, fields


class PeoplePayEmployee(models.Model):
    _name = "peoplepay.employee"
    _description = "PeoplePay Employee"
    _order = "name"

    name = fields.Char(
        string="Employee Name",
        required=True
    )

    employee_code = fields.Char(
        string="Employee Code",
        required=True
    )

    department = fields.Char(
        string="Department"
    )

    manager_id = fields.Many2one(
        "peoplepay.employee",
        string="Manager"
    )

    job_position = fields.Char(
        string="Job Position"
    )

    schedule_id = fields.Many2one(
        "peoplepay.working.schedule",
        string="Working Schedule"
    )

    status = fields.Selection(
        [
            ("active", "Active"),
            ("inactive", "Inactive"),
        ],
        string="Status",
        default="active",
        required=True
    )

    contract_ids = fields.One2many(
        "peoplepay.contract",
        "employee_id",
        string="Contracts"
    )

    attendance_ids = fields.One2many(
        "peoplepay.attendance",
        "employee_id",
        string="Attendances"
    )

    time_off_request_ids = fields.One2many(
        "peoplepay.time.off.request",
        "employee_id",
        string="Time Off Requests"
    )

    payslip_ids = fields.One2many(
        "peoplepay.payslip",
        "employee_id",
        string="Payslips"
    )

    contract_count = fields.Integer(
        string="Contracts",
        compute="_compute_contract_count"
    )

    payslip_count = fields.Integer(
        string="Payslips",
        compute="_compute_payslip_count"
    )
    user_id = fields.Many2one(
        "res.users",
        string="User",
        ondelete="set null"
)

    @classmethod
    def _build_count(cls, records, field_name):
        return {
            record.id: len(record[field_name])
            for record in records
        }

    def _compute_contract_count(self):
        counts = self._build_count(self, "contract_ids")
        for record in self:
            record.contract_count = counts.get(record.id, 0)

    def _compute_payslip_count(self):
        counts = self._build_count(self, "payslip_ids")
        for record in self:
            record.payslip_count = counts.get(record.id, 0)