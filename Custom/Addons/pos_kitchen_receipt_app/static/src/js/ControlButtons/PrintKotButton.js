odoo.define('pos_kitchen_receipt_app.PrintkotButton', function(require) {
	"use strict";

	const { useState } = owl.hooks;
    const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
    const Registries = require('point_of_sale.Registries');
    const { useListener } = require('web.custom_hooks');
    const ProductScreen = require('point_of_sale.ProductScreen');

    class PrintkotButton extends AbstractAwaitablePopup {
    	constructor() {
            super(...arguments);
            useListener('click', this.onClick);
        }
        async onClick() {
            this.showScreen('PrintKotButtonScreen');
        }
    }
    PrintkotButton.template = 'PrintkotButton';

    ProductScreen.addControlButton({
        component: PrintkotButton,
        condition: function() {
            return this.env.pos.config.kot_print;
        },
    });

    Registries.Component.add(PrintkotButton);

    return PrintkotButton;
});