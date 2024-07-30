odoo.define('pos_kitchen_receipt_app.pos', function(require) {
    "use strict";

    var models = require('point_of_sale.models');
    // var screens = require('point_of_sale.screens');
    var core = require('web.core');
    var gui = require('point_of_sale.Gui');
    // var popups = require('point_of_sale.popups');
    var QWeb = core.qweb;

    var _t = core._t;

    var _super_orderline = models.Orderline.prototype;

    models.Orderline = models.Orderline.extend({
        initialize: function() {
            _super_orderline.initialize.apply(this,arguments); 
            this.kot_print = false; 
        },
        init_from_JSON: function(json) {
            _super_orderline.init_from_JSON.apply(this,arguments);
            this.kot_print = json.kot_print;
        },
        export_as_JSON: function() {
            var json = _super_orderline.export_as_JSON.apply(this,arguments);
            json.kot_print = this.kot_print;
            return json;
        },
        set_kot: function(kot_print) {
    		this.kot_print = kot_print;
            this.trigger('change', this);
        },
        get_kot : function(){
    	    return	this.kot_print;
        }
    });

    var _super_order = models.Order.prototype;
    models.Order = models.Order.extend({
    	add_product: function(product, options){
    		var self = this;
    		_super_order.add_product.call(this, product, options);
            if(this.pos.config.kot_print){
                this.selected_orderline.set_kot(true);
            }
        },
    });


// var PrintKotButtonScreen = screens.ScreenWidget.extend({
//     template: 'PrintKotButtonScreen',
    
//     init: function(parent,options){
//         var self = this;
//         this._super(parent,options);
//     },
    

//     get_coupon: function(){
//         return this.gui.get_current_screen_param('options');
//     },

//     show: function(options){
//         this._super();
//         var self = this;
//         this.kot_render();
//     },

//     kot_render_env: function() {
//         var count = 0 ;
//         var lines = this.pos.get_order().get_orderlines();
//         for(var i = 0 ; i<lines.length ; i++){
//             if(lines[i].kot_print){
//                 count = count+1
//             }
//         }
//         return {
//             widget: this,
//             pos: this.pos,
//             order: this.pos.get_order(),
//             count : count,
//             orderlines : this.pos.get_order().get_orderlines()
//         };
//     },

//     kot_render: function(){
//         this.$('.pos-payment-receipt-container').html(QWeb.render('KotTicket',this.kot_render_env()));
//     },
//     print_xml_coupon: function() {
//         var receipt = QWeb.render('KotTicket', this.kot_render_env());
//         this.pos.proxy.print_receipt(receipt);
//     },
//     print_web_payment: function() {
//         window.print();
//     },
//     print_coupon: function() {
//         var self = this;
//         if (!this.pos.config.iface_print_via_proxy) { 

//             this.print_web_payment();
//         } else {    
//             this.print_xml_coupon();
//         }
//     },


//     renderElement: function() {
//         var self = this;
//         this._super();
        
//         this.$('.next').click(function(){
//             // location.reload();
//             self.gui.back();
//             self.pos.get_order().get_orderlines().forEach(function (orderline) {
//             	orderline.set_kot(false);
//             });
//         });
//         this.$('.back').click(function(){
//             // location.reload();
//             self.gui.back();
//         });
        
//         this.$('.button.print-coupon').click(function(){
//             self.print_coupon();
//         });
        
//     },

// });
// gui.define_screen({name:'kot_print', widget: PrintKotButtonScreen});

});