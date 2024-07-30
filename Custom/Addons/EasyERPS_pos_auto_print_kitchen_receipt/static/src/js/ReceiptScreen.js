odoo.define('EasyERPS_pos_auto_print_kitchen_receipt.ReceiptScreen', function (require) {
    'use strict';

    const ReceiptScreen = require('point_of_sale.ReceiptScreen');
    const Registries = require('point_of_sale.Registries');
    const { onMounted, useRef, status } = owl;

    const customReceiptScreen = ReceiptScreen =>
        class extends ReceiptScreen {

        setup() {
                super.setup();

                onMounted(() => {
                     var self = this;
                    setTimeout(async () => {
                    if (!self.env.pos.config.iface_print_auto){
                      await self.handleAutoPrintChanges();
                    }
                }, 0);
                });
            }


        // constructor() {
        //         super(...arguments);
        //         var self = this;
        //         // let order = this.env.pos.get_order();
        //         // this.handleAutoPrintChanges();
        //     }


        // mounted() {
        //         var self = this;
        //         setTimeout(async () => {
        //             if (!self.env.pos.config.iface_print_auto){
        //               await self.handleAutoPrintChanges();
        //             }
        //
        //         }, 0);
        //          super.mounted();
        //     }


            async handleAutoPrint() {
            var self = this;
            if (!this.env.pos.config.kitchen_print_auto) return super.handleAutoPrint();
                if (this._shouldAutoPrint()) {
                    await this.printReceipt();
                    await this.handleAutoPrintChanges();
                    if (this.currentOrder._printed && this._shouldCloseImmediately()) {
                        this.whenClosing();
                    }
                }
            }

            async printReceiptAndKitchen(){
                await this.printReceipt();
                await this.PrintChanges();
            }

            async handleAutoPrintChanges() {
                if (this.env.pos.config.kitchen_print_auto){
                    await  this.PrintChanges()
                }
            }

            async PrintChanges() {
                if (!this.is_changePrint){
                    let order = this.env.pos.get_order();
                    await  order.printChanges();
                    this.is_changePrint = true
                    this.render();
                }
            }

        };

    Registries.Component.extend(ReceiptScreen, customReceiptScreen);

    return ReceiptScreen;
});