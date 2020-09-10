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
    public class FacturasController : ControllerBase
    {
        private readonly GestionAppContext _context;

        public FacturasController(GestionAppContext context)
        {
            _context = context;
        }

        // GET: api/Facturas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Facturas>>> GetFacturas()
        {
            if (Utilities.checkUnauthorized(HttpContext, 1))
                return Unauthorized();
            return await _context.Facturas.ToListAsync();
        }

        // GET: api/Facturas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Facturas>> GetFacturas(int id)
        {
            if (Utilities.checkUnauthorized(HttpContext, 1))
                return Unauthorized();
            var facturas = await _context.Facturas.FindAsync(id);

            if (facturas == null)
            {
                return NotFound();
            }

            return facturas;
        }

        // PUT: api/Facturas/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFacturas(int id, Facturas facturas)
        {
            if (Utilities.checkUnauthorized(HttpContext, 3))
                return Unauthorized();
            if (id != facturas.IdFac)
            {
                return BadRequest();
            }

            _context.Entry(facturas).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FacturasExists(id))
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

        // POST: api/Facturas
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Facturas>> PostFacturas(Facturas facturas)
        {
            if (Utilities.checkUnauthorized(HttpContext, 3))
                return Unauthorized();
            _context.Facturas.Add(facturas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFacturas", new { id = facturas.IdFac }, facturas);
        }

        // DELETE: api/Facturas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Facturas>> DeleteFacturas(int id)
        {
            if (Utilities.checkUnauthorized(HttpContext, 3))
                return Unauthorized();
            var facturas = await _context.Facturas.FindAsync(id);
            if (facturas == null)
            {
                return NotFound();
            }

            _context.Facturas.Remove(facturas);
            await _context.SaveChangesAsync();

            return facturas;
        }

        private bool FacturasExists(int id)
        {
            return _context.Facturas.Any(e => e.IdFac == id);
        }
    }
}
