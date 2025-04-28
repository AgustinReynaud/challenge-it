⚡️ Challenge It Patagonia
¡Bienvenido al proyecto! 🙌 Este es un reto para la empresa It Patagonia, creado con el objetivo de demostrar mis habilidades como desarrollador. A continuación te cuento todo lo que necesitas saber para poner en marcha este proyecto.

🚀 Primeros Pasos

1. Base de Datos
   Primero, crea una base de datos en MySQL llamada companies_db.

2. Archivo de Configuración
   Crea un archivo .env tomando como referencia el archivo .env.example que encontrarás en el proyecto.

Rellena los valores de este archivo con la configuración adecuada.

3. Levantar el Proyecto
   Asegúrate de tener Docker funcionando en tu máquina.

En la terminal del proyecto, corre el siguiente comando para levantar el proyecto:

docker-compose up --build

Esto construirá el contenedor, levantará la aplicación y ejecutará automáticamente las migraciones de Sequelize para crear las tablas e índices que necesitamos.

📋 Descripción
🎯 Objetivos del Challenge:
Este desafío consiste en implementar una API RESTful que permita gestionar empresas y transferencias bancarias. Los requisitos básicos son:

Endpoints Requeridos:

Empresas que hicieron transferencias: Devuelve las empresas que realizaron transferencias en el último mes.

Empresas adheridas: Devuelve las empresas que se adhirieron en el último mes.

Crear empresa: Un endpoint para registrar una nueva empresa.

Deseable:

Utilizar arquitectura hexagonal para garantizar un diseño limpio y escalable.

Base de Datos:

Se puede elegir usar una base de datos relacional o no relacional.

Datos de la Empresa:

CUIT: Identificación fiscal de la empresa.

Razón Social: Nombre oficial de la empresa.

Fecha de Adhesión: Cuándo se adhirió la empresa.

Datos de la Transferencia:

Importe: Monto de la transferencia.

ID Empresa: Identificador de la empresa que realiza la transferencia.

Cuenta Débito: Cuenta desde la cual se hace la transferencia.

Cuenta Crédito: Cuenta destino de la transferencia.

✔️ Endpoints Implementados:
Compañías:

Crear Empresa: Permite crear nuevas compañías.

Listar Empresas Adheridas: Muestra las empresas que se han adherido en el último mes.

Transferencias:

Crear Transferencia: Registra una nueva transferencia de una empresa.

Listar Empresas con Transferencias: Muestra las empresas que han realizado transferencias en el último mes.

🔒 Validaciones:
Middleware de Validación: Se utiliza Joi para asegurarnos de que los datos enviados en el body de las solicitudes son correctos.

Manejo de Errores: Todos los errores son gestionados de manera centralizada para ofrecer una respuesta clara y consistente.

Compañías:
Verificamos que el CUIT no esté ya registrado.

El CUIT debe tener el formato correcto y 11 dígitos numéricos.

La Razón Social debe ser un string con una longitud adecuada.

Ambos campos son requeridos.

Transferencias:
Validamos que la empresa a la que se realiza la transferencia exista.

Comprobamos que todos los campos requeridos estén presentes en la solicitud.

Nos aseguramos de que el importe no sea negativo.

🌍 Internacionalización (i18n):
El sistema soporta mensajes tanto en español como en inglés.

Puedes cambiar el idioma de las respuestas simplemente enviando el header Accept-Language: es | en.

🗂 Base de Datos y ORM:
MySQL es la base de datos utilizada para almacenar la información.

Sequelize es el ORM que facilita la interacción con la base de datos.

Las migraciones de Sequelize son las encargadas de crear las tablas e índices necesarios para las compañías y las transferencias.

🏛 Arquitectura:
Se utilizó una arquitectura hexagonal, lo que nos permite mantener una clara separación de responsabilidades, hacer que el sistema sea fácilmente extensible y fácil de probar.

🧪 Testing:
Se implementaron pruebas unitarias con Jest para asegurarnos de que todo funcione correctamente.

🐳 Docker:
El proyecto está dockerizado, lo que hace que su despliegue sea fácil y consistente en cualquier entorno.

🗂 Tecnologías y Herramientas Usadas:
Lenguaje: JavaScript

Backend: Node.js

Base de Datos: MySQL

ORM: Sequelize

Testing: Jest

Linter: ESLint

Internacionalización: i18n

Contenedores: Docker

🗂 Rutas para Probar en Postman
Companies:
POST - Crear Compañía
Endpoint: http://localhost:3000/company
Body:

json
Copiar
Editar
{
"cuit": "20-40757955-0",
"social_reason": "Rollos SE"
}
GET - Listar Compañías Adheridas el Último Mes
Endpoint: http://localhost:3000/company/recent-adhesions

Transferencias:
POST - Crear Transferencia
Endpoint: http://localhost:3000/transferences
Body:

json
Copiar
Editar
{
"amount": -7000,
"company_id": "2e7b18bc-c915-43c3-b719-7424240e4c5c", // Asegúrate de que la compañía exista
"debit_account": "234567890",
"credit_account": "0987654321"
}
GET - Listar Compañías que Hicieron Transferencias el Último Mes
Endpoint: http://localhost:3000/transferences/recent-companies

🗂 Relación de la Base de Datos
En este proyecto, las tablas Company y Transfer están relacionadas de la siguiente forma:

Relación de uno a muchos (1:N): Una compañía puede tener muchas transferencias. Esto significa que una empresa puede realizar múltiples transferencias a lo largo del tiempo, pero cada transferencia está asociada a una única empresa.

Llave foránea: La tabla Transfer tiene un campo llamado company_id, que se refiere al id de la tabla Company. Esto garantiza que cada transferencia esté vinculada a una compañía específica.

Detalles de la Relación:
Una compañía puede tener varias transferencias asociadas, lo que se refleja en la relación hasMany desde el modelo de Company hacia el modelo de Transfer.
