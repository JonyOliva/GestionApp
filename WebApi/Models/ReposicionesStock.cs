using System;
using System.Collections.Generic;

namespace GestionAppWebApi.Models
{
    public partial class ReposicionesStock
    {
        public int IdRep { get; set; }
        public int? IdproductoRep { get; set; }
        public int CantidadRep { get; set; }
        public DateTime FechaRep { get; set; }

    }
}
