using System;
using System.Collections.Generic;

namespace GestionAppWebApi.Models
{
    public partial class Facturas
    {
        public int IdFac { get; set; }
        public int? IdclienteFac { get; set; }
        public DateTime FechaFac { get; set; }
        public double? DescuentoFac { get; set; }
        public double TotalFac { get; set; }

    }
}
