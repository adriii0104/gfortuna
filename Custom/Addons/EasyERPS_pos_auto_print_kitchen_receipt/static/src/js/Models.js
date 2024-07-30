odoo.define('EasyERPS_pos_auto_print_kitchen_receipt.Models', function (require) {
"use strict";

const { PosGlobalState, Order, Orderline, Payment } = require('point_of_sale.models');
const Registries = require('point_of_sale.Registries');
const Printer = require('point_of_sale.Printer').Printer;
const core = require('web.core');
const QWeb = core.qweb;

const PosAutoPrintChange = (Order) => class PosRestaurantOrder extends Order {

    async printChanges(){
        let isPrintSuccessful = true;
        const d = new Date();
        let hours = '' + d.getHours();
        hours = hours.length < 2 ? ('0' + hours) : hours;
        let minutes = '' + d.getMinutes();
        minutes = minutes.length < 2 ? ('0' + minutes) : minutes;


        for (const printer of this.pos.unwatched.printers) {
            const changes = this._getPrintingCategoriesChanges(printer.config.product_categories_ids);
            if (changes['new'].length > 0 || changes['cancelled'].length > 0) {
                const printingChanges = {
                    new: changes['new'],
                    cancelled: changes['cancelled'],
                    table_name: this.pos.config.iface_floorplan ? this.getTable().name : false,
                    floor_name: this.pos.config.iface_floorplan ? this.getTable().floor.name : false,
                    name: this.name || 'unknown order',
                    time: {
                        hours,
                        minutes,
                    },
                };
                const receipt = QWeb.render('OrderChangeReceipt', { changes: printingChanges,widget:this, pos: this.pos, receipt: this.export_for_printing() });
                const result = await printer.print_receipt(receipt);
                if (!result.successful) {
                    isPrintSuccessful = false;
                }
            }
        }
       return isPrintSuccessful;
    }

     is_printChanges(){
        for (const printer of this.pos.unwatched.printers) {
            const changes = this._getPrintingCategoriesChanges(printer.config.product_categories_ids);
            if (changes['new'].length > 0 || changes['cancelled'].length > 0) {
                return true
            }
        }
        return false
    }

}
Registries.Model.extend(Order, PosAutoPrintChange);


});

