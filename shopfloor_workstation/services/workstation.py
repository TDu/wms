# Copyright 2021 Camptocamp SA (http://www.camptocamp.com)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
from odoo.addons.base_rest.components.service import to_int
from odoo.addons.component.core import Component


class ShopfloorWorkstation(Component):
    """
    ? storing the configuration for the .

    """

    _inherit = "base.shopfloor.service"
    _name = "shopfloor.workstation"
    _usage = "workstation"
    _expose_model = "shopfloor.workstation"
    _description = __doc__

    def _search(self, name_fragment=None):
        domain = self._get_base_search_domain()
        if name_fragment:
            domain.append(("name", "ilike", name_fragment))
        records = self.env[self._expose_model].search(domain)
        return records

    def search(self, name_fragment=None):
        """List available workstation"""
        records = self._search(name_fragment=name_fragment)
        return self._response(
            data={"size": len(records), "records": self._to_json(records)}
        )

    def get(self, _id):
        return {
            'response': 'Get called with message ' + str(_id)}

    def setdefault(self, barcode):
        ws = self.env["shopfloor.workstation"].search([("barcode", "=", barcode)])
        if self._set_workstation_as_default(ws):
            message = {
                "message_type": "info",
                "body": "Default workstation set to {}".format(ws.name),
            }
        else:
            message = {
                "message_type": "error",
                "body": "Workstation not found",
            }
        # return {"message": message}
        return self._response(
            message=message,
            data={"size": len(ws), "records": self._to_json(ws)}
        )

    def _set_workstation_as_default(self, workstation):
        if not workstation:
            # self.env.user
            return False
        if workstation.standard_printer_id:
            # TODO : should the default action be checked ?
            self.env.user.printing_printer_id = workstation.standard_printer_id
        return True

    def _convert_one_record(self, record):
        return {
            "id": record.id,
            "name": record.name,
            "barcode": record.barcode,
            "warehouse": {
                "id": record.warehouse_id.id,
                "name": record.warehouse_id.name,
            },
            "profile": {
                "id": record.shopfloor_profile_id.id,
                "name": record.shopfloor_profile_id.name
            }
        }


class ShopfloorWorkstationValidator(Component):
    """Validators for the Workstation endpoints"""

    _inherit = "base.shopfloor.validator"
    _name = "shopfloor.workstation.validator"
    _usage = "workstation.validator"

    def search(self):
        return {}

    def get(self):
        return {
            "name_fragment": {"type": "string", "nullable": True, "required": False}
        }

    def setdefault(self):
        return {
            "barcode": {"type": "string", "nullable": True, "required": False}
        }


class ShopfloorWorkstationValidatorResponse(Component):
    """Validators for the Workstation endpoints responses"""

    _inherit = "base.shopfloor.validator.response"
    _name = "shopfloor.workstation.validator.response"
    _usage = "workstation.validator.response"

    def search(self):
        return self._response_schema(
            {
                "size": {"coerce": to_int, "required": True, "type": "integer"},
                "records": {
                    "type": "list",
                    "schema": {"type": "dict", "schema": self._record_schema},
                },
            }
        )

    def setdefault(self):
        return self._response_schema(
            {
                "size": {"coerce": to_int, "required": True, "type": "integer"},
                "records": {
                    "type": "list",
                    "schema": {"type": "dict", "schema": self._record_schema},
                },
            }
        )

    @property
    def _record_schema(self):
        return {
            "id": {"coerce": to_int, "required": True, "type": "integer"},
            "name": {"type": "string", "nullable": False, "required": True},
            "barcode": {"type": "string", "nullable": False, "required": True},
            "warehouse": {
                "type": "dict",
                "schema": {
                    "id": {"coerce": to_int, "required": True, "type": "integer"},
                    "name": {"type": "string", "nullable": False, "required": True},
                },
            },
            "profile": {
                "type": "dict",
                "schema": {
                    "id": {"coerce": to_int, "required": True, "type": "integer"},
                    "name": {"type": "string", "nullable": False, "required": True},
                },
            }
        }
