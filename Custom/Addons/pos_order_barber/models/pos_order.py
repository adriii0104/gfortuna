from odoo import models, fields, api

class PosOrder(models.Model):
    _inherit = 'pos.order'

    @api.model
    def create(self, values):
        order = super(PosOrder, self).create(values)
        # Obtener los productos vendidos en la orden
        products = self.env['pos.order.line'].search([('order_id', '=', order.id)])
        for product in products:
            # Buscar un registro existente para la fecha de hoy y el barbero
            today = fields.Date.today()
            self.env['barberia.ventas.categoria'].create({
                    'fecha': today,
                    'barbero': product.product_id.categ_id.name,
                    'monto_generado': product.price_subtotal / 2,
                    'cliente_atendido': order.partner_id.name or 'Cliente Anónimo'
                })
        return order

class VentasPorCategoria(models.Model):
    _name = 'barberia.ventas.categoria'
    _description = 'Ventas por Categoría'

    fecha = fields.Date(string='Fecha de ultima venta', required=True, default=fields.Date.today())
    barbero = fields.Char(string='Barbero', required=True)
    cliente_atendido = fields.Char(string='Cliente Atendido', required=True)
    monto_generado = fields.Float(string='Monto Generado para la fecha', required=True)
