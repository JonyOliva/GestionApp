using System;
using System.Collections.Generic;

namespace GestionAppWebApi.Models
{
    public partial class Usuarios
    {
        public int IdUsu { get; set; }
        public string NombreUsu { get; set; }
        public byte RolUsu { get; set; }
        public string PasswordUsu { get; set; }

    }
}
