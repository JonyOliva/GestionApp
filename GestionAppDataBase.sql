USE GestionApp;

CREATE TABLE Roles(
Nivel_Rol tinyint PRIMARY KEY,
Nombre_Rol varchar(30) not null,
)

CREATE TABLE Usuarios(
ID_Usu int identity,
Nombre_Usu varchar(20) not null,
Rol_Usu tinyint not null,
Password_Usu varchar(100) not null,
CONSTRAINT PK_Usuarios PRIMARY KEY(ID_Usu),
CONSTRAINT FK_Rol FOREIGN KEY(Rol_Usu) REFERENCES Roles(Nivel_Rol)
)

CREATE TABLE Categorias(
ID_Cat int identity,
Nombre_Cat varchar(30) not null,
Descripcion_Cat varchar(80),
CONSTRAINT PK_Categoria PRIMARY KEY(ID_Cat)
)

CREATE TABLE Clientes(
ID_Cli int identity,
Nombre_Cli varchar(40) not null,
Apellido_Cli varchar(40) not null,
DNI_Cli varchar(10) not null,
NroCelular_Cli varchar(12),
CONSTRAINT PK_Cliente PRIMARY KEY(ID_Cli)
)

CREATE TABLE Productos(
ID_Prod int identity,
Precio_Prod float check(Precio_Prod > 0) not null,
Nombre_Prod varchar(40) not null,
IDCategoria_Prod int,
Stock_Prod int check(Stock_Prod > 0) not null
CONSTRAINT PK_Productos PRIMARY KEY(ID_Prod),
CONSTRAINT FK_Productos FOREIGN KEY(IDCategoria_Prod) REFERENCES Categorias(ID_Cat)
)

CREATE TABLE Facturas(
ID_Fac int identity,
IDCliente_Fac int,
Fecha_Fac date not null,
Descuento_Fac float,
Total_Fac float not null,
CONSTRAINT PK_Facturas PRIMARY KEY(ID_Fac),
CONSTRAINT FK_Facturas FOREIGN KEY(IDCliente_Fac) REFERENCES Clientes(ID_Cli)
)

CREATE TABLE DetallesFactura(
ID_Det int identity,
IDFactura_Det int,
IDProducto_Det int,
Cantidad_Det float,
Importe_Det float,
CONSTRAINT PK_DetFactura PRIMARY KEY(ID_Det, IDFactura_Det),
CONSTRAINT FK_DetFactura_Fac FOREIGN KEY(IDFactura_Det) REFERENCES Facturas(ID_Fac),
CONSTRAINT FK_DetFactura_Prod FOREIGN KEY(IDProducto_Det) REFERENCES Productos(ID_Prod)
)

CREATE TABLE ReposicionesStock(
ID_Rep int identity,
IDProducto_Rep int,
Cantidad_Rep int check(Cantidad_Rep > 0) not null,
Fecha_Rep date not null,
CONSTRAINT PK_RepStock PRIMARY KEY(ID_Rep),
CONSTRAINT FK_RepStock FOREIGN KEY(IDProducto_Rep) REFERENCES Productos(ID_Prod)
)

--- INSERTS ---

INSERT INTO Roles(Nivel_Rol, Nombre_Rol)
SELECT 1, 'Invitado' UNION
SELECT 2, 'Empleado' UNION
SELECT 3, 'Administrativo'

INSERT INTO Usuarios(Nombre_Usu, Rol_Usu, Password_Usu)
VALUES('Invitado', 1, '')