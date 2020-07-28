using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using GestionAppWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace GestionAppWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private readonly GestionAppContext _context;
        IConfiguration Configuration;

        public LoginController(GestionAppContext context, IConfiguration configuration)
        {
            _context = context;
            Configuration = configuration;
        }

        [Authorize]
        [HttpGet]
        public ActionResult<string> GetLogin()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            List<Claim> claims = identity.Claims.ToList();
            return $"{claims[0].Value}, {claims[1].Value}, {claims[2].Value}";
        }

        [HttpPost]
        public ActionResult PostLogin(Usuarios login)
        {
            if (login == null)
                return BadRequest();
            if (String.IsNullOrEmpty(login.NombreUsu) || String.IsNullOrEmpty(login.PasswordUsu))
                return NotFound();
            var user = _context.Usuarios.Where(x => x.NombreUsu == login.NombreUsu).FirstOrDefault();
            if(user == null)
                return NotFound("{ \"state\" : \"NotFound\"}");
            if (user.PasswordUsu == login.PasswordUsu)
            {
                string token = GenerateJWT(user);
                return Ok($"{{ \"state\" : \"Logged\", \"token\" : \"{token}\"}}");
            }
            else
                return Ok("{ \"state\" : \"Error\"}");
        }

        private String GenerateJWT(Usuarios user)
        {
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]));
            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            Claim[] claims = new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.IdUsu.ToString()),
                new Claim(ClaimTypes.Name, user.NombreUsu),
                new Claim(ClaimTypes.Role, user.RolUsu.ToString())
            };
            JwtSecurityToken jwt = new JwtSecurityToken(Configuration["Jwt:Issuer"], Configuration["Jwt:Issuer"], claims, DateTime.Now, DateTime.Now.AddMinutes(1), credentials);
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

    }
}
