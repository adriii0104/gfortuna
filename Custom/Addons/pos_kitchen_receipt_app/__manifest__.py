# -*- coding: utf-8 -*-

{
    "name" : "POS Kitchen Receipt Print",
    "author": "Edge Technologies",
    "version" : "17.0.1.0",
    "live_test_url":'https://youtu.be/R-cwRF2x8qc',
    "images":["static/description/main_screenshot.png"],
    'summary': 'Print POS Kitchen Receipt Print Kitchen Receipt from pos receipt print pos kitchen receipt print point of sale kitchen receipt POS Kitchen Alert POS Kitchen Ticket POS Restaurant note pos Restaurant kitchen receipt pos receipt kitchen order receipt print',
    "description": """ This app use to print the receipt for kitchen order. only non-printed or newly added product will be printed for the same order for restricting the duplication. 
    

    POS Kitchen Receipt Print

    Kitchen Receipt Print
    print receipt 
    print pos kictchen receipt
    kitchen receipt 
    Print POS Kitchen Receipt
    point of sale kitchen receipt
    POS Kitchen Order Notes
    POS Kitchen Alert
    POS Kitchen screen
    POS Kitchen Ticket
    POS Restaurant Restriction
    POS Restaurant note
    POS Restaurant order note
    Restaurant kitchen receipt
    pos receipt kitchen order receipt
    kitchen order receipt
    kitchen notes
    


     """,
    "license" : "OPL-1",
    "depends" : ['base', 'point_of_sale', 'pos_restaurant'],
    "data": [
        'views/custom_js_added.xml',
        'views/pos_config_inherit.xml',
    ],
    'qweb': [
        'static/src/xml/ControlButtons/PrintkotButton.xml',
        'static/src/xml/Screens/PrintKotButtonScreen.xml',
        'static/src/xml/pos.xml'
    ],
    "auto_install": False,
    "installable": True,
    "price": 25,
    "currency": 'EUR',
    "category" : "Point of Sale",
}
# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:
