odoo.define('pos_kitchen_receipt_app.KotTicket', function(require) {
	'use strict';

	const { useState } = owl.hooks;
	const PosComponent = require('point_of_sale.PosComponent');
	const { useListener } = require('web.custom_hooks');
	const Registries = require('point_of_sale.Registries');

	class KotTicket extends PosComponent {
		constructor() {
			super(...arguments);
		}
	};

	KotTicket.template = 'KotTicket';

	Registries.Component.add(KotTicket);

	return KotTicket;
});