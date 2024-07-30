odoo.define('pos_kitchen_receipt_app.PrintKotButtonScreen', function(require) {
	'use strict';

	const { useState } = owl.hooks;
	const PosComponent = require('point_of_sale.PosComponent');
	const { useListener } = require('web.custom_hooks');
	const Registries = require('point_of_sale.Registries');

	class PrintKotButtonScreen extends PosComponent {
		constructor() {
			super(...arguments);
			useListener('print-coupon', this.print_coupon);
			useListener('next', this.print_coupon);
			useListener('back', this.print_coupon);
			let count = 0 ;
	        let lines = this.env.pos.get_order().get_orderlines();
	        for(var i = 0 ; i<lines.length ; i++){
	            if(lines[i].kot_print){
	                count = count+1;
	            }
	        }
	        this.props.count = count;
		}
		nextScreen(){
			this.showScreen('ProductScreen')
            this.env.pos.get_order().get_orderlines().forEach(function (orderline) {
            	orderline.set_kot(false);
            });
		}
		kot_render_env() {
	        let count = 0 ;
	        let lines = this.env.pos.get_order().get_orderlines();
	        for(var i = 0 ; i<lines.length ; i++){
	            if(lines[i].kot_print){
	                count = count+1
	            }
	        }
	        this.props.count = count;
	        return {
	            widget: this,
	            pos: this.env.pos,
	            order: this.env.pos.get_order(),
	            count : count,
	            orderlines : this.env.pos.get_order().get_orderlines()
	        };
	    }
	    print_xml_coupon() {
	        var receipt = QWeb.render('KotTicket', this.kot_render_env());
	        this.env.pos.proxy.print_receipt(receipt);
	    }
	    print_web_payment() {
	        window.print();
	    }
	    print_coupon() {
	        var self = this;
	        if (!this.env.pos.config.iface_print_via_proxy) { 

	            this.print_web_payment();
	        } else {    
	            this.print_xml_coupon();
	        }
	    }
	};

	PrintKotButtonScreen.template = 'PrintKotButtonScreen';

	Registries.Component.add(PrintKotButtonScreen);

	return PrintKotButtonScreen;
});