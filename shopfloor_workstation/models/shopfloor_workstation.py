# Copyright 2021 Camptocamp SA (http://www.camptocamp.com)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
from odoo import api, fields, models


class ShopfloorWorkstation(models.Model):
    _name = "shopfloor.workstation"
    _description = "Shopfloor workstation settings"

    name = fields.Char(required=True)
    barcode = fields.Char(required=True, index=True, copy=False)
    warehouse_id = fields.Many2one(
        "stock.warehouse",
        required=True,
        default=lambda self: self._default_warehouse_id(),
    )
    active = fields.Boolean(default=True)
    standard_printer_id = fields.Many2one(
        comodel_name="printing.printer", string="Standard Printer"
    )
    # TODO move to related module
    # label_printer_id = fields.Many2one(
    #     comodel_name="printing.printer", string="Label Printer"
    # )
    shopfloor_profile_id = fields.Many2one(
        comodel_name="shopfloor.profile", string="Shopfloor Profile"
    )

    @api.model
    def _default_warehouse_id(self):
        wh = self.env["stock.warehouse"].search([])
        if len(wh) == 1:
            return wh

    # @api.model
    # def _register_hook(self):
    #     super()._register_hook()
    #     self.SELF_WRITEABLE_FIELDS.extend(["standard_printer_id"])
    #     self.SELF_READABLE_FIELDS.extend(["label_printer_id"])
