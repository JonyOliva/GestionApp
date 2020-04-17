using System;
using System.Collections.Generic;

namespace GestionAppWebApi.Models
{
    public partial class Productos
    {
        public int IdProd { get; set; }
        public double PrecioProd { get; set; }
        public string NombreProd { get; set; }
        public int? IdcategoriaProd { get; set; }
        public int StockProd { get; set; }

    }
}
