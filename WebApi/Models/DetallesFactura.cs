using System;
using System.Collections.Generic;

namespace GestionAppWebApi.Models
{
    public partial class DetallesFactura
    {
        public int IdDet { get; set; }
        public int IdfacturaDet { get; set; }
        public int? IdproductoDet { get; set; }
        public double? CantidadDet { get; set; }
        public double? ImporteDet { get; set; }

    }
}
