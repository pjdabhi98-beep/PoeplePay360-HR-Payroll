from odoo import models, fields, api


class PeoplePayWorkingSchedule(models.Model):
    _name = "peoplepay.working.schedule"
    _description = "Working Schedule"

    name = fields.Char(
        string="Schedule Name",
        required=True
    )

    type = fields.Selection(
        [
            ("regular", "Regular"),
            ("shift", "Shift"),
        ],
        string="Type",
        default="regular",
        required=True
    )

    day = fields.Selection(
        [
            ("monday", "Monday"),
            ("tuesday", "Tuesday"),
            ("wednesday", "Wednesday"),
            ("thursday", "Thursday"),
            ("friday", "Friday"),
            ("saturday", "Saturday"),
            ("sunday", "Sunday"),
        ],
        string="Day",
        required=True
    )

    start_time = fields.Float(
        string="Start Time",
        required=True
    )

    end_time = fields.Float(
        string="End Time",
        required=True
    )

    break_hours = fields.Float(
        string="Break Hours",
        default=0.0
    )

    total_hours = fields.Float(
        string="Total Hours",
        compute="_compute_total_hours",
        store=True
    )

    employee_ids = fields.One2many(
        "peoplepay.employee",
        "schedule_id",
        string="Employees"
    )

    @api.depends("start_time", "end_time", "break_hours")
    def _compute_total_hours(self):
        for record in self:
            hours = record.end_time - record.start_time

            if hours < 0:
                hours += 24

            record.total_hours = max(
                hours - record.break_hours,
                0
            )