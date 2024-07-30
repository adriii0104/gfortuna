# -*- coding: utf-8 -*-
{
    'name': "POS auto print kitchen receipt",
    'support': "support@easyerps.com",
    'license': "LGPL-3",
    'summary': """
        Auto print kitchen receipt after validate
        """,
    'author': "EasyERPS",
    'website': "https://easyerps.com",
    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Point of Sale',
    'version': '16.1.1',
    # any module necessary for this one to work correctly
    'data': [
            'views/views.xml',
        ],
    'depends': ['base', 'point_of_sale', 'pos_restaurant'],
    'assets': {
        'point_of_sale.assets': [
            'EasyERPS_pos_auto_print_kitchen_receipt/static/src/js/ReceiptScreen.js',
            'EasyERPS_pos_auto_print_kitchen_receipt/static/src/js/Models.js',
            'EasyERPS_pos_auto_print_kitchen_receipt/static/src/xml/*.xml',
        ],
    },
    'images': ['images/main_screenshot.png'],

}
