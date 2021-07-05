/**
 * Copyright 2021 Camptocamp SA (http://www.camptocamp.com)
 * License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
 */

import {ScenarioBaseMixin} from "/shopfloor_mobile_base/static/wms/src/scenario/mixins.js";
import {process_registry} from "/shopfloor_mobile_base/static/wms/src/services/process_registry.js";

const DeliveryShipment = {
    mixins: [ScenarioBaseMixin],
    template: `
        <Screen :screen_info="screen_info">
            <template v-slot:header>
                <state-display-info :info="state.display_info" v-if="state.display_info"/>
            </template>
            <searchbar
                v-if="state.on_scan"
                v-on:found="on_scan"
                :input_placeholder="search_input_placeholder"
                />

            <item-detail-card
                v-if="state_in(['scan_document'])"
                :key="make_state_component_key(['delivery-shipment-pick', picking().id])"
                :record="picking()"
                :options="{main: true, key_title: 'name', title_action_field: {action_val_path: 'barcode'}}"
                :card_color="utils.colors.color_for('screen_step_done')"
                />

            <div class="button-list button-vertical-list full" v-if="!state_is('scan_dock')">
                <v-row align="center">
                    <v-col class="text-center" cols="12">
                        <btn-action color="default" @click="state.on_cancel">Cancel</btn-action>
                    </v-col>
                </v-row>
            </div>
        </Screen>
        `,
    methods: {
        screen_title: function() {
            if (_.isEmpty(this.state.data.picking)) {
                return this.menu_item().name;
            }
            return this.state.data.picking.name;
        },
        picking: function() {
            if (_.isEmpty(this.state.data.picking)) {
                return {};
            }
            return this.state.data.picking;
        },
    },
    data: function() {
        const self = this;
        return {
            usage: "delivery_shipment",
            initial_state_key: "scan_dock",
            states: {
                scan_dock: {
                    display_info: {
                        title: "Start by scanning a dock",
                        scan_placeholder: "Scan dock",
                    },
                    on_scan: scanned => {
                        this.wait_call(
                            this.odoo.call("scan_dock", {
                                barcode: scanned.text,
                            })
                        );
                    },
                },
                scan_document: {
                    display_info: {
                        title: "Scan some shipment's content",
                        scan_placeholder: "Scan a lot, product, pack or operation",
                    },
                    on_scan: scanned => {
                        this.wait_call(
                            this.odoo.call("scan_shipment_content", {
                                barcode: scanned.text,
                                shipment_id: this.shipment().id,
                            })
                        );
                    },
                    on_cancel: () => {
                        this.state_to("scan_source_location");
                    },
                },
            },
        };
    },
};

process_registry.add("delivery_shipment", DeliveryShipment);

export default DeliveryShipment;
