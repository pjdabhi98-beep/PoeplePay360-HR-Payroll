from datetime import date, datetime
from calendar import monthrange
from concurrent.futures import ThreadPoolExecutor

from fastapi import APIRouter

from app.services.odoo_service import odoo_service


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


# ---------------------------------------------------------
# SMALL SERVER-SIDE CACHE
# Keeps dashboard fast when user opens/refreshed repeatedly.
# Data is refreshed automatically after 5 seconds.
# ---------------------------------------------------------
_dashboard_cache = {
    "data": None,
    "time": 0,
}

CACHE_SECONDS = 5


def get_cached_dashboard():
    if _dashboard_cache["data"] is None:
        return None

    current_time = datetime.now().timestamp()

    if current_time - _dashboard_cache["time"] < CACHE_SECONDS:
        return _dashboard_cache["data"]

    return None


# ---------------------------------------------------------
# DASHBOARD API
# ---------------------------------------------------------
@router.get("")
def get_dashboard():

    try:
        # -------------------------------------------------
        # 1. CHECK CACHE FIRST
        # -------------------------------------------------
        cached_data = get_cached_dashboard()

        if cached_data is not None:
            return cached_data

        today = date.today()

        today_start = f"{today} 00:00:00"
        today_end = f"{today} 23:59:59"

        current_year = today.year
        current_month = today.month

        first_day = date(
            current_year,
            current_month,
            1
        )

        last_day = date(
            current_year,
            current_month,
            monthrange(
                current_year,
                current_month
            )[1]
        )

        # -------------------------------------------------
        # ODOO REQUEST FUNCTIONS
        # -------------------------------------------------

        def get_total_employees():
            return odoo_service.execute(
                "peoplepay.employee",
                "search_count",
                [[]]
            )

        def get_present_today():
            return odoo_service.execute(
                "peoplepay.attendance",
                "search_count",
                [[
                    ["check_in", ">=", today_start],
                    ["check_in", "<=", today_end]
                ]]
            )

        def get_pending_leaves():
            return odoo_service.execute(
                "peoplepay.time.off.request",
                "search_count",
                [[
                    ["state", "=", "submitted"]
                ]]
            )

        def get_active_contracts():
            return odoo_service.execute(
                "peoplepay.contract",
                "search_count",
                [[
                    ["state", "=", "active"]
                ]]
            )

        def get_monthly_payroll():

            # Only request net_salary.
            # There is no need to download name, employee,
            # gross salary, deductions, etc. for the dashboard.
            payslips = odoo_service.execute(
                "peoplepay.payslip",
                "search_read",
                [[
                    ["date_from", ">=", first_day.isoformat()],
                    ["date_to", "<=", last_day.isoformat()],
                    ["state", "in", ["computed", "paid"]]
                ]],
                {
                    "fields": [
                        "net_salary"
                    ]
                }
            )

            return sum(
                float(payslip.get("net_salary") or 0)
                for payslip in payslips
            )

        # -------------------------------------------------
        # 2. RUN ODOO REQUESTS IN PARALLEL
        # -------------------------------------------------
        with ThreadPoolExecutor(max_workers=5) as executor:

            employees_future = executor.submit(
                get_total_employees
            )

            attendance_future = executor.submit(
                get_present_today
            )

            leaves_future = executor.submit(
                get_pending_leaves
            )

            contracts_future = executor.submit(
                get_active_contracts
            )

            payroll_future = executor.submit(
                get_monthly_payroll
            )

            # Get results
            total_employees = employees_future.result()

            present_today = attendance_future.result()

            pending_leaves = leaves_future.result()

            active_contracts = contracts_future.result()

            monthly_payroll = payroll_future.result()

        # -------------------------------------------------
        # 3. ATTENDANCE RATE
        # -------------------------------------------------
        if total_employees > 0:
            attendance_rate = round(
                (present_today / total_employees) * 100,
                2
            )
        else:
            attendance_rate = 0

        attendance_rate = min(attendance_rate, 100)

        # -------------------------------------------------
        # 4. FINAL RESPONSE
        # -------------------------------------------------
        dashboard_data = {
            "success": True,

            "total_employees": total_employees,

            "present_today": present_today,

            "attendance_rate": attendance_rate,

            "pending_leaves": pending_leaves,

            "monthly_payroll": monthly_payroll,

            "month": today.strftime("%B %Y"),

            "active_contracts": active_contracts,
        }

        # -------------------------------------------------
        # 5. SAVE TO CACHE
        # -------------------------------------------------
        _dashboard_cache["data"] = dashboard_data
        _dashboard_cache["time"] = datetime.now().timestamp()

        return dashboard_data

    except Exception as e:

        print("Dashboard Error:", str(e))

        return {
            "success": False,
            "message": str(e),

            "total_employees": 0,
            "present_today": 0,
            "attendance_rate": 0,
            "pending_leaves": 0,
            "monthly_payroll": 0,
            "month": datetime.now().strftime("%B %Y"),
            "active_contracts": 0,
        }