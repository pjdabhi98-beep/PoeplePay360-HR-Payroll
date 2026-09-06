from odoo import http
from odoo.http import request


class DashboardController(http.Controller):

    @http.route(
        '/api/peoplepay360/dashboard',
        type='json',
        auth='user',
        methods=['POST'],
        csrf=False
    )
    def dashboard(self):
        employees = request.env['peoplepay.employee'].search([])

        return {
            'total_employees': len(employees),
        }
