# ⚡️ Challenge It 

¡Bienvenido al proyecto! 🙌  

Documentación: http://localhost:3000/api-docs

---

## 🚀 Primeros Pasos

1. **Base de Datos**

   - Crea una base de datos en MySQL llamada `companies_db`.

2. **Archivo de Configuración**

   - Crea un archivo `.env` tomando como referencia el archivo `.env.example` que encontrarás en el proyecto.
   - Rellena los valores de este archivo con la configuración adecuada.

3. **Levantar el Proyecto**

   - Asegúrate de tener **Docker** funcionando en tu máquina.
   - En la terminal del proyecto, corre el siguiente comando:

     ```bash
     docker-compose up --build
     ```

   - Esto construirá el contenedor, levantará la aplicación y ejecutará automáticamente las migraciones de Sequelize.

---

## 📋 Descripción

### 🎯 Objetivos del Challenge

Implementar una **API RESTful** que permita gestionar **empresas** y **transferencias bancarias**.

**Endpoints Requeridos:**

- **Empresas que hicieron transferencias**: Devuelve las empresas que realizaron transferencias en el último mes.
- **Empresas adheridas**: Devuelve las empresas que se adhirieron en el último mes.
- **Crear empresa**: Un endpoint para registrar una nueva empresa.

**Deseable:**

- Utilizar arquitectura hexagonal para garantizar un diseño limpio y escalable.

---

## 🛢️ Base de Datos

- Se utiliza una base de datos **MySQL** (relacional).
- **Datos de la Empresa:**
  - CUIT: Identificación fiscal de la empresa.
  - Razón Social: Nombre oficial de la empresa.
  - Fecha de Adhesión: Fecha de registro en el sistema.
- **Datos de la Transferencia:**
  - Importe: Monto de la transferencia.
  - ID Empresa: Identificador de la empresa que realiza la transferencia.
  - Cuenta Débito: Cuenta desde donde se debita el dinero.
  - Cuenta Crédito: Cuenta destino.

---

## ✔️ Endpoints Implementados

### Compañías:

- **Crear Empresa**: Permite crear nuevas compañías.
- **Listar Empresas Adheridas**: Muestra las empresas que se han adherido en el último mes.

### Transferencias:

- **Crear Transferencia**: Registra una nueva transferencia de una empresa.
- **Listar Empresas con Transferencias**: Muestra las empresas que realizaron transferencias en el último mes.

---

## 🔒 Validaciones

- **Middleware de Validación**: Se utiliza Joi para validar los datos enviados.
- **Manejo de Errores**: Todos los errores se gestionan de forma centralizada.

**En compañías:**

- Verificamos que el CUIT no esté ya registrado.
- El CUIT debe tener formato correcto y 11 dígitos numéricos.
- La Razón Social debe ser un string de longitud adecuada.
- Ambos campos son requeridos.

**En transferencias:**

- Validamos que la empresa exista.
- Todos los campos son requeridos.
- El importe no puede ser negativo.

---

## 🌍 Internacionalización (i18n)

- Soporte para mensajes en **español** e **inglés**.
- Cambiar idioma enviando el header: `Accept-Language: es | en`

  ---

## 🗂️ Base de Datos y ORM

- Base de datos: **MySQL**.
- ORM: **Sequelize**.
- Migraciones para crear tablas e índices.

---

## 🏛️ Arquitectura

- Se implementó una **arquitectura hexagonal** para separar responsabilidades y facilitar la escalabilidad y pruebas.

---

## 🧪 Testing

- Se implementaron pruebas unitarias usando **Jest**.

---

## 🐳 Docker

- El proyecto está completamente **dockerizado**, facilitando su despliegue.

---

## 🛠️ Tecnologías y Herramientas Usadas

- **Lenguaje**: JavaScript
- **Backend**: Node.js
- **Base de Datos**: MySQL
- **ORM**: Sequelize
- **Testing**: Jest
- **Linter**: ESLint
- **Internacionalización**: i18n
- **Contenedores**: Docker

---
## 📮 Rutas para Probar en Postman

### Companies:

- **POST - Crear Compañía**

  - **Endpoint:**
  
    ```
    http://localhost:3000/company
    ```

  - **Body:**

    ```json
    {
      "cuit": "20-40757955-0",
      "social_reason": "Rollos SE"
    }
    ```

- **GET - Listar Compañías Adheridas el Último Mes**

  - **Endpoint:**
  
    ```
    http://localhost:3000/company/recent-adhesions
    ```

---

### Transferencias:

- **POST - Crear Transferencia**

  - **Endpoint:**
  
    ```
    http://localhost:3000/transferences
    ```

  - **Body:**

    ```json
    {
      "amount": -7000,
      "company_id": "2e7b18bc-c915-43c3-b719-7424240e4c5c",
      "debit_account": "234567890",
      "credit_account": "0987654321"
    }
    ```

- **GET - Listar Compañías que Hicieron Transferencias el Último Mes**

  - **Endpoint:**
  
    ```
    http://localhost:3000/transferences/recent-companies
    ```

---

## 🔗 Relación de la Base de Datos

- **Relación 1:N**

  - Una compañía puede tener **muchas transferencias**.

- **Llave foránea**

  - El campo `company_id` en la tabla `Transfer` se refiere al `id` de la tabla `Company`.

**Detalles:**

- Una compañía tiene varias transferencias asociadas.
- Se utiliza la relación `hasMany` desde el modelo `Company` hacia el modelo `Transfer`.



