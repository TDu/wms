/**
 * Copyright 2021 Camptocamp SA (http://www.camptocamp.com)
 * License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
 */

import {demotools} from "/shopfloor_mobile_base/static/wms/src/demo/demo.core.js";

const DEMO_CASE = {
    by_menu_id: {},
};

const delivery_shipment_menu_id = demotools.addAppMenu({
    name: "Delivery Shipment",
    scenario: "delivery_shipment",
    picking_types: [{id: 27, name: "Random type"}],
});
// const single_line_case_move_line = demotools.makeSingleLineOperation();
const source_location = demotools.makeLocation();
const DELIVERY_SHIPMENT_CASE = {
    // should be scan_dock
    start: {
        next_state: "scan_dock",
        message: {
            message_type: "info",
            body: "Pprevious line processed info.",
        },
        data: {
            // scan_source_location: {
            //     move_line: _.cloneDeep(single_line_case_move_line),
            // },
        },
    },
    scan_dock: {
        next_state: "scan_product",
        message: {
            message_type: "info",
            body: "Recovered line from previous session.",
        },
        data: {
            scan_source_location: {
                location: _.cloneDeep(source_location),
            },
        },
    },
};
DEMO_CASE.by_menu_id[delivery_shipment_menu_id] = DELIVERY_SHIPMENT_CASE;

demotools.add_case("shipment_delivery", DEMO_CASE);
