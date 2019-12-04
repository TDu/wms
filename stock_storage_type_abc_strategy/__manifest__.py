# Copyright 2019 Camptocamp SA
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl)
{
    "name": "Stock Storage Type ABC Strategy",
    "summary": "Advanced storage strategy ABC for WMS",
    "version": "12.0.1.0.0",
    "development_status": "Alpha",
    "category": "Warehouse Management",
    "website": "https://github.com/OCA/wms",
    "author": "Camptocamp, Odoo Community Association (OCA)",
    "license": "AGPL-3",
    "application": False,
    "installable": True,
    "depends": [
        "stock_location_storage_type_strategy",
    ],
    "data": [
        "views/product.xml",
        "views/stock_location.xml",
    ],
    "demo": [
    ],
}
