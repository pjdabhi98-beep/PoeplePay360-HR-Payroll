from odoo import models, fields, api
from odoo.exceptions import ValidationError


class PeoplePayAttendance(models.Model):
    _name = "peoplepay.attendance"
    _description = "Employee Attendance"
    _order = "check_in desc"

    employee_id = fields.Many2one(
        "peoplepay.employee",
        string="Employee",
        required=True,
        ondelete="cascade"
    )

    check_in = fields.Datetime(
        string="Check In",
        required=True
    )

    check_out = fields.Datetime(
        string="Check Out"
    )

    worked_hours = fields.Float(
        string="Worked Hours",
        compute="_compute_worked_hours",
        store=True
    )

    state = fields.Selection(
        [
            ("normal", "Normal"),
            ("exception", "Exception"),
        ],
        string="Status",
        compute="_compute_state",
        store=True
    )

    @api.depends("check_in", "check_out")
    def _compute_worked_hours(self):
        for record in self:
            if record.check_in and record.check_out:
                seconds = (
                    record.check_out - record.check_in
                ).total_seconds()
                record.worked_hours = max(seconds / 3600, 0)
            else:
                record.worked_hours = 0

    @api.depends("check_in", "check_out", "worked_hours")
    def _compute_state(self):
        for record in self:
            if not record.check_out:
                record.state = "exception"
            elif record.worked_hours <= 0:
                record.state = "exception"
            else:
                record.state = "normal"

    @api.constrains("check_in", "check_out")
    def _check_attendance_time(self):
        for record in self:
            if (
                record.check_in
                and record.check_out
                and record.check_out < record.check_in
            ):
                raise ValidationError(
                    "Check Out cannot be before Check In."
                )