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
    public class ReposicionesStocksController : ControllerBase
    {
        private readonly GestionAppContext _context;

        public ReposicionesStocksController(GestionAppContext context)
        {
            _context = context;
        }

        // GET: api/ReposicionesStocks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReposicionesStock>>> GetReposicionesStock()
        {
            if (Utilities.checkUnauthorized(HttpContext, 1))
                return Unauthorized();
            return await _context.ReposicionesStock.ToListAsync();
        }

        // GET: api/ReposicionesStocks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReposicionesStock>> GetReposicionesStock(int id)
        {
            if (Utilities.checkUnauthorized(HttpContext, 1))
                return Unauthorized();
            var reposicionesStock = await _context.ReposicionesStock.FindAsync(id);

            if (reposicionesStock == null)
            {
                return NotFound();
            }

            return reposicionesStock;
        }

        // PUT: api/ReposicionesStocks/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReposicionesStock(int id, ReposicionesStock reposicionesStock)
        {
            if (Utilities.checkUnauthorized(HttpContext, 2))
                return Unauthorized();
            if (id != reposicionesStock.IdRep)
            {
                return BadRequest();
            }

            _context.Entry(reposicionesStock).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReposicionesStockExists(id))
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

        // POST: api/ReposicionesStocks
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ReposicionesStock>> PostReposicionesStock(ReposicionesStock reposicionesStock)
        {
            if (Utilities.checkUnauthorized(HttpContext, 2))
                return Unauthorized();
            _context.ReposicionesStock.Add(reposicionesStock);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReposicionesStock", new { id = reposicionesStock.IdRep }, reposicionesStock);
        }

        // DELETE: api/ReposicionesStocks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ReposicionesStock>> DeleteReposicionesStock(int id)
        {
            if (Utilities.checkUnauthorized(HttpContext, 2))
                return Unauthorized();
            var reposicionesStock = await _context.ReposicionesStock.FindAsync(id);
            if (reposicionesStock == null)
            {
                return NotFound();
            }

            _context.ReposicionesStock.Remove(reposicionesStock);
            await _context.SaveChangesAsync();

            return reposicionesStock;
        }

        private bool ReposicionesStockExists(int id)
        {
            return _context.ReposicionesStock.Any(e => e.IdRep == id);
        }
    }
}
