⚡️ Challenge It 
¡Bienvenido al proyecto! 🙌

🚀 Primeros Pasos
Base de Datos
Crea una base de datos en MySQL llamada companies_db.

Archivo de Configuración
Crea un archivo .env tomando como referencia .env.example que encontrarás en el proyecto.

Rellena los valores de este archivo con la configuración adecuada.

Levantar el Proyecto
Asegúrate de tener Docker funcionando en tu máquina.

En la terminal, corre el siguiente comando:

bash
Copiar
Editar
docker-compose up --build
Esto construirá el contenedor, levantará la aplicación y ejecutará automáticamente las migraciones de Sequelize para crear las tablas e índices necesarios.

📋 Descripción del Proyecto
🎯 Objetivos del Challenge
Implementar una API RESTful que permita gestionar empresas y transferencias bancarias.

Endpoints Requeridos
Empresas que hicieron transferencias en el último mes.

Empresas adheridas en el último mes.

Crear nueva empresa.

Deseable
Utilizar arquitectura hexagonal para garantizar un diseño limpio y escalable.

🛢️ Base de Datos
Se utiliza MySQL como base de datos relacional.

Datos de la Empresa
CUIT: Identificación fiscal.

Razón Social: Nombre de la empresa.

Fecha de Adhesión: Fecha de alta.

Datos de la Transferencia
Importe: Monto.

ID Empresa: Referencia a la empresa.

Cuenta Débito: Cuenta de origen.

Cuenta Crédito: Cuenta destino.

✔️ Endpoints Implementados
Companies
POST /company - Crear Empresa.

GET /company/recent-adhesions - Listar Empresas Adheridas.

Transferences
POST /transferences - Crear Transferencia.

GET /transferences/recent-companies - Listar Empresas con Transferencias.

🔒 Validaciones
Se utiliza Joi para validar el body de las solicitudes.

Manejo centralizado de errores para respuestas claras y consistentes.

Validaciones de Empresas
CUIT único y formato correcto (11 dígitos).

Razón Social como string con longitud adecuada.

Validaciones de Transferencias
Validar existencia de empresa.

Campos obligatorios completos.

Monto mayor que cero.

🌍 Internacionalización (i18n)
Soporte para español e inglés.

Cambia el idioma enviando el header:

http
Copiar
Editar
Accept-Language: es
o

http
Copiar
Editar
Accept-Language: en
🗂️ Base de Datos y ORM
MySQL como base de datos.

Sequelize como ORM.

Migraciones automáticas para crear tablas e índices.

🏛 Arquitectura
Arquitectura Hexagonal para mantener separación de responsabilidades, facilidad de extensión y testeo.

🧪 Testing
Pruebas unitarias implementadas con Jest.

🐳 Docker
El proyecto está dockerizado para facilitar su despliegue en cualquier entorno.

🛠 Tecnologías y Herramientas Usadas
Lenguaje: JavaScript

Backend: Node.js

Base de Datos: MySQL

ORM: Sequelize

Testing: Jest

Linter: ESLint

Internacionalización: i18n

Contenedores: Docker

📫 Rutas para Probar en Postman
Companies
Crear Compañía

http
Copiar
Editar
POST http://localhost:3000/company
Body:

json
Copiar
Editar
{
  "cuit": "20-40757955-0",
  "social_reason": "Rollos SE"
}
Listar Compañías Adheridas el Último Mes

http
Copiar
Editar
GET http://localhost:3000/company/recent-adhesions
Transferences
Crear Transferencia

http
Copiar
Editar
POST http://localhost:3000/transferences
Body:

json
Copiar
Editar
{
  "amount": 7000,
  "company_id": "2e7b18bc-c915-43c3-b719-7424240e4c5c",
  "debit_account": "234567890",
  "credit_account": "0987654321"
}
Listar Empresas que Hicieron Transferencias el Último Mes

http
Copiar
Editar
GET http://localhost:3000/transferences/recent-companies
🗂️ Relación de la Base de Datos
Company (Empresa) y Transfer (Transferencia) tienen una relación 1:N:

Una empresa puede tener muchas transferencias.

Cada transferencia pertenece a una única empresa.

La relación se maneja a través del campo company_id en la tabla Transfer.
