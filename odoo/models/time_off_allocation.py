from odoo import models, fields, api
from odoo.exceptions import ValidationError


class PeoplePayTimeOffAllocation(models.Model):
    _name = "peoplepay.time.off.allocation"
    _description = "Time Off Allocation"

    employee_id = fields.Many2one(
        "peoplepay.employee",
        string="Employee",
        required=True,
        ondelete="cascade"
    )

    time_off_type_id = fields.Many2one(
        "peoplepay.time.off.type",
        string="Leave Type",
        required=True,
        ondelete="cascade"
    )

    allocated_days = fields.Float(
        string="Allocated Days",
        required=True,
        default=0.0
    )

    taken_days = fields.Float(
        string="Taken Days",
        compute="_compute_taken_days"
    )

    remaining_days = fields.Float(
        string="Remaining Days",
        compute="_compute_remaining_days"
    )

    state = fields.Selection(
        [
            ("draft", "Draft"),
            ("approved", "Approved"),
        ],
        string="Status",
        default="draft",
        required=True
    )

    @api.depends("employee_id", "time_off_type_id")
    def _compute_taken_days(self):
        for record in self:
            if not record.employee_id or not record.time_off_type_id:
                record.taken_days = 0.0
                continue

            requests = self.env["peoplepay.time.off.request"].search([
                ("employee_id", "=", record.employee_id.id),
                ("time_off_type_id", "=", record.time_off_type_id.id),
                ("state", "=", "approved"),
            ])

            record.taken_days = sum(request.days for request in requests)

    @api.depends("allocated_days", "taken_days")
    def _compute_remaining_days(self):
        for record in self:
            record.remaining_days = record.allocated_days - record.taken_days

    @api.constrains("allocated_days")
    def _check_allocated_days(self):
        for record in self:
            if record.allocated_days < 0:
                raise ValidationError(
                    "Allocated days cannot be negative."
                )