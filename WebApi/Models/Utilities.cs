using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GestionAppWebApi.Models
{
    public static class Utilities
    {
        public static bool checkUnauthorized(HttpContext hc, int lvlRole)
        {
            var identity = hc.User.Identity as ClaimsIdentity;
            if (!identity.IsAuthenticated)
            {
                if (lvlRole == 1)
                    return false;
                else return true;
            }
            if (Convert.ToInt32(identity.Claims.ToList()[2].Value) >= lvlRole)
                return false;
            else return true;
        }
    }
}
