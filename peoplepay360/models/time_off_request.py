from odoo import models, fields, api
from odoo.exceptions import ValidationError


class PeoplePayTimeOffRequest(models.Model):
    _name = "peoplepay.time.off.request"
    _description = "Time Off Request"
    _order = "start_date desc"

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

    start_date = fields.Date(
        string="Start Date",
        required=True
    )

    end_date = fields.Date(
        string="End Date",
        required=True
    )

    days = fields.Float(
        string="Days",
        compute="_compute_days",
        store=True
    )

    reason = fields.Text(
        string="Reason"
    )

    state = fields.Selection(
        [
            ("draft", "Draft"),
            ("submitted", "Submitted"),
            ("approved", "Approved"),
            ("rejected", "Rejected"),
        ],
        string="Status",
        default="draft",
        required=True
    )

    @api.depends("start_date", "end_date")
    def _compute_days(self):
        for record in self:
            if record.start_date and record.end_date:
                record.days = (
                    record.end_date - record.start_date
                ).days + 1
            else:
                record.days = 0

    @api.constrains("start_date", "end_date")
    def _check_dates(self):
        for record in self:
            if record.end_date < record.start_date:
                raise ValidationError(
                    "End Date cannot be before Start Date."
                )

    def action_submit(self):
        self.write({"state": "submitted"})

    def action_approve(self):
        self.write({"state": "approved"})

    def action_reject(self):
        self.write({"state": "rejected"})