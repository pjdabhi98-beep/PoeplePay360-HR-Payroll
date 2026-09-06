from odoo import http
from odoo.http import request
from odoo import fields
from datetime import timedelta


class PeoplePayAPI(http.Controller):

    @http.route(
        "/api/dashboard",
        type="http",
        auth="public",
        methods=["POST"],
        csrf=False,
    )
    def dashboard(self):
        today = fields.Date.today()
        tomorrow = today + timedelta(days=1)
        month_start = today.replace(day=1)
        if today.month == 12:
            month_end = today.replace(year=today.year + 1, month=1, day=1)
        else:
            month_end = today.replace(month=today.month + 1, day=1)

        employee_count = request.env["peoplepay.employee"].sudo().search_count([
            ("status", "=", "active"),
        ])
        present_groups = request.env["peoplepay.attendance"].sudo().read_group([
            ("check_in", ">=", fields.Datetime.to_datetime(today)),
            ("check_in", "<", fields.Datetime.to_datetime(tomorrow)),
            ("employee_id.status", "=", "active"),
        ], ["employee_id"], ["employee_id"])
        present_today = len(present_groups)
        pending_leaves = request.env["peoplepay.time.off.request"].sudo().search_count([
            ("state", "=", "submitted"),
        ])
        payslips = request.env["peoplepay.payslip"].sudo().search([
            ("date_from", "<", month_end),
            ("date_to", ">=", month_start),
            ("state", "in", ["computed", "paid"]),
            ("payrun_id.state", "!=", "cancelled"),
        ])

        return request.make_json_response({
            "success": True,
            "total_employees": employee_count,
            "present_today": present_today,
            "attendance_rate": round((present_today / employee_count) * 100, 1)
            if employee_count else 0,
            "pending_leaves": pending_leaves,
            "monthly_payroll": sum(payslips.mapped("net_salary")),
            "month": month_start.strftime("%B %Y"),
        })


    @http.route(
        "/api/peoplepay360/health",
        type="http",
        auth="public",
        methods=["GET"],
        csrf=False,
    )
    def health(self):
        return request.make_json_response({
            "success": True,
            "service": "PeoplePay360 API",
            "status": "running",
        })
