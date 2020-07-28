using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace GestionAppWebApi.Models
{
    public partial class GestionAppContext : DbContext
    {
        public GestionAppContext()
        {
        }

        public GestionAppContext(DbContextOptions<GestionAppContext> options, IConfiguration configuration)
            : base(options)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration;
        public virtual DbSet<Categorias> Categorias { get; set; }
        public virtual DbSet<Clientes> Clientes { get; set; }
        public virtual DbSet<DetallesFactura> DetallesFactura { get; set; }
        public virtual DbSet<Facturas> Facturas { get; set; }
        public virtual DbSet<Productos> Productos { get; set; }
        public virtual DbSet<ReposicionesStock> ReposicionesStock { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(Configuration.GetConnectionString("GestionAppDB"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categorias>(entity =>
            {
                entity.HasKey(e => e.IdCat)
                    .HasName("PK_Categoria");

                entity.Property(e => e.IdCat).HasColumnName("ID_Cat");

                entity.Property(e => e.DescripcionCat)
                    .HasColumnName("Descripcion_Cat")
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.NombreCat)
                    .IsRequired()
                    .HasColumnName("Nombre_Cat")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Clientes>(entity =>
            {
                entity.HasKey(e => e.IdCli)
                    .HasName("PK_Cliente");

                entity.Property(e => e.IdCli).HasColumnName("ID_Cli");

                entity.Property(e => e.ApellidoCli)
                    .IsRequired()
                    .HasColumnName("Apellido_Cli")
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.DniCli)
                    .IsRequired()
                    .HasColumnName("DNI_Cli")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.NombreCli)
                    .IsRequired()
                    .HasColumnName("Nombre_Cli")
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.NroCelularCli)
                    .HasColumnName("NroCelular_Cli")
                    .HasMaxLength(12)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<DetallesFactura>(entity =>
            {
                entity.HasKey(e => new { e.IdDet, e.IdfacturaDet })
                    .HasName("PK_DetFactura");

                entity.Property(e => e.IdDet)
                    .HasColumnName("ID_Det")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.IdfacturaDet).HasColumnName("IDFactura_Det");

                entity.Property(e => e.CantidadDet).HasColumnName("Cantidad_Det");

                entity.Property(e => e.IdproductoDet).HasColumnName("IDProducto_Det");

                entity.Property(e => e.ImporteDet).HasColumnName("Importe_Det");

            });

            modelBuilder.Entity<Facturas>(entity =>
            {
                entity.HasKey(e => e.IdFac);

                entity.Property(e => e.IdFac).HasColumnName("ID_Fac");

                entity.Property(e => e.DescuentoFac).HasColumnName("Descuento_Fac");

                entity.Property(e => e.FechaFac)
                    .HasColumnName("Fecha_Fac")
                    .HasColumnType("date");

                entity.Property(e => e.IdclienteFac).HasColumnName("IDCliente_Fac");

                entity.Property(e => e.TotalFac).HasColumnName("Total_Fac");

            });

            modelBuilder.Entity<Productos>(entity =>
            {
                entity.HasKey(e => e.IdProd);

                entity.Property(e => e.IdProd).HasColumnName("ID_Prod");

                entity.Property(e => e.IdcategoriaProd).HasColumnName("IDCategoria_Prod");

                entity.Property(e => e.NombreProd)
                    .IsRequired()
                    .HasColumnName("Nombre_Prod")
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.PrecioProd).HasColumnName("Precio_Prod");

                entity.Property(e => e.StockProd).HasColumnName("Stock_Prod");

            });

            modelBuilder.Entity<ReposicionesStock>(entity =>
            {
                entity.HasKey(e => e.IdRep)
                    .HasName("PK_RepStock");

                entity.Property(e => e.IdRep).HasColumnName("ID_Rep");

                entity.Property(e => e.CantidadRep).HasColumnName("Cantidad_Rep");

                entity.Property(e => e.FechaRep)
                    .HasColumnName("Fecha_Rep")
                    .HasColumnType("date");

                entity.Property(e => e.IdproductoRep).HasColumnName("IDProducto_Rep");

            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.HasKey(e => e.NivelRol)
                    .HasName("PK__Roles__362E110D0A888342");

                entity.Property(e => e.NivelRol).HasColumnName("Nivel_Rol");

                entity.Property(e => e.NombreRol)
                    .IsRequired()
                    .HasColumnName("Nombre_Rol")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Usuarios>(entity =>
            {
                entity.HasKey(e => e.IdUsu);

                entity.Property(e => e.IdUsu).HasColumnName("ID_Usu");

                entity.Property(e => e.NombreUsu)
                    .IsRequired()
                    .HasColumnName("Nombre_Usu")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PasswordUsu)
                    .IsRequired()
                    .HasColumnName("Password_Usu")
                    .HasMaxLength(35)
                    .IsUnicode(false);

                entity.Property(e => e.RolUsu).HasColumnName("Rol_Usu");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
