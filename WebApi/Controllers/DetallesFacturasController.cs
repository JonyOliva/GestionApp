using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestionAppWebApi.Models;

namespace GestionAppWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetallesFacturasController : ControllerBase
    {
        private readonly GestionAppContext _context;

        public DetallesFacturasController(GestionAppContext context)
        {
            _context = context;
        }

        // GET: api/DetallesFacturas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetallesFactura>>> GetDetallesFactura()
        {
            if (Utilities.checkUnauthorized(HttpContext, 1))
                return Unauthorized();
            return await _context.DetallesFactura.ToListAsync();
        }

        // GET: api/DetallesFacturas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<DetallesFactura>>> GetDetallesFactura(int id)
        {
            if (Utilities.checkUnauthorized(HttpContext, 1))
                return Unauthorized();
            var detallesFactura = await _context.DetallesFactura.Where(x => x.IdfacturaDet == id).ToListAsync();

            if (detallesFactura == null)
            {
                return NotFound();
            }

            return detallesFactura;
        }

        // PUT: api/DetallesFacturas/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetallesFactura(int id, DetallesFactura detallesFactura)
        {
            if (Utilities.checkUnauthorized(HttpContext, 3))
                return Unauthorized();
            if (id != detallesFactura.IdDet)
            {
                return BadRequest();
            }

            _context.Entry(detallesFactura).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DetallesFacturaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DetallesFacturas
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<DetallesFactura>> PostDetallesFactura(DetallesFactura detallesFactura)
        {
            if (Utilities.checkUnauthorized(HttpContext, 3))
                return Unauthorized();
            _context.DetallesFactura.Add(detallesFactura);
            Productos prod = _context.Productos.Find(detallesFactura.IdproductoDet);
            if (prod.StockProd - (int)detallesFactura.CantidadDet >= 0)
            {
                prod.StockProd = prod.StockProd - (int)detallesFactura.CantidadDet;
                await _context.SaveChangesAsync();
            }
            else
            {
                return BadRequest();
            }
            return CreatedAtAction("GetDetallesFactura", new { id = detallesFactura.IdDet }, detallesFactura);
        }

        // DELETE: api/DetallesFacturas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DetallesFactura>> DeleteDetallesFactura(int id)
        {
            if (Utilities.checkUnauthorized(HttpContext, 3))
                return Unauthorized();
            var detallesFactura = await _context.DetallesFactura.FindAsync(id);
            if (detallesFactura == null)
            {
                return NotFound();
            }
            Productos prod = _context.Productos.Find(detallesFactura.IdproductoDet);
            prod.StockProd = prod.StockProd + (int)detallesFactura.CantidadDet;
            _context.DetallesFactura.Remove(detallesFactura);
            await _context.SaveChangesAsync();

            return detallesFactura;
        }

        private bool DetallesFacturaExists(int id)
        {
            return _context.DetallesFactura.Any(e => e.IdDet == id);
        }
    }
}
