{
    "name": "PeoplePay360",
    "version": "1.0.0",
    "summary": "PeoplePay360 Payroll Management",
    "category": "Human Resources",
    "depends": ["base"],
    "data": [
        'security/security.xml',
        'security/ir.model.access.csv',
        'security/record_rules.xml',
        'views/peoplepay_views.xml',
    ],
    "installable": True,
    "application": True,
}