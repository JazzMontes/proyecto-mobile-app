# 📱 Proyecto Mobile App

Aplicación móvil desarrollada con **Ionic y Angular**, enfocada en implementar una interfaz sencilla, navegación entre diferentes vistas y un sistema de autenticación de usuarios conectado a una base de datos.

## 🎯 Objetivo de la aplicación

El objetivo de esta aplicación es desarrollar una aplicación móvil funcional utilizando **Ionic y Angular**, que permita a los usuarios iniciar sesión y acceder a diferentes secciones mediante una interfaz sencilla e intuitiva.

El proyecto busca aplicar conceptos básicos del desarrollo de aplicaciones móviles, como la creación y diseño de vistas, navegación mediante tabs, manejo de información del usuario y comunicación con una API para consultar datos almacenados en una base de datos.

## ⚙️ Funcionamiento

La aplicación inicia mostrando una pantalla de **Login**, donde el usuario debe ingresar su nombre de usuario y contraseña.

Al iniciar sesión, la aplicación valida que los campos estén completos y envía las credenciales mediante **Axios** a una API desarrollada en **PHP**.

La API consulta la información almacenada en una base de datos **MySQL** y devuelve una respuesta indicando si las credenciales son correctas.

Si el inicio de sesión es exitoso, la información principal del usuario se almacena temporalmente utilizando `localStorage` y el usuario es redirigido a las vistas principales de la aplicación.

Si las credenciales son incorrectas o existe algún problema durante la conexión, se muestra un mensaje de error.

### Flujo general

```text
Usuario
   ↓
Login en Ionic
   ↓
Axios
   ↓
API PHP
   ↓
Base de datos MySQL
   ↓
Respuesta de la API
   ↓
Acceso a la aplicación
```

## 📱 Vistas de la aplicación

Actualmente, la aplicación cuenta con diferentes vistas para organizar la información y las funcionalidades.

### 🔐 Login

Es la pantalla inicial de la aplicación y permite:

- Ingresar usuario y contraseña.
- Validar que los campos estén completos.
- Enviar las credenciales a la API.
- Validar al usuario en la base de datos.
- Mostrar mensajes en caso de error.
- Guardar los datos del usuario al iniciar sesión correctamente.
- Redirigir al usuario a la aplicación.

### 🏠 Tab 1

Funciona como una de las vistas principales después de iniciar sesión y forma parte de la navegación mediante tabs de Ionic.

### 👤 Tab 2 - Perfil

Esta vista permite mostrar la información del usuario que inició sesión, incluyendo:

- Nombre.
- Nombre de usuario.
- Correo electrónico.
- Estado.
- Opción para cerrar sesión.

Los datos utilizados en esta pantalla se obtienen a partir de la información almacenada después de realizar el inicio de sesión.

## 🗄️ Modelo inicial de datos

Para la autenticación se utiliza una base de datos **MySQL** que contiene la información de los usuarios.

Entre los principales datos manejados se encuentran:

- ID.
- Nombre.
- Nombre de usuario.
- Correo electrónico.
- Contraseña.
- Estado.

Este modelo permite identificar al usuario y utilizar posteriormente su información dentro de las diferentes vistas de la aplicación.

## 🔄 Conexión con la API

La comunicación entre la aplicación y el servidor se realiza utilizando **Axios**.

La aplicación envía el usuario y contraseña a una API desarrollada en PHP. La API realiza la consulta correspondiente en MySQL y devuelve una respuesta en formato **JSON**.

Cuando el usuario es válido, la aplicación recibe información como:

```json
{
  "id": 1,
  "username": "usuario",
  "email": "usuario@email.com",
  "name": "Nombre del usuario"
}
```

Esta información puede ser utilizada posteriormente por otras vistas de la aplicación.

## 🛠️ Tecnologías utilizadas

- **Ionic** — Desarrollo de la aplicación móvil.
- **Angular** — Estructura y funcionamiento de la aplicación.
- **TypeScript** — Lógica de las vistas.
- **HTML** — Estructura de las interfaces.
- **SCSS** — Diseño y estilos.
- **Axios** — Comunicación con la API.
- **PHP** — Desarrollo de la API.
- **MySQL** — Base de datos.
- **Git** — Control de versiones.
- **GitHub** — Repositorio del proyecto.

## 🚧 Estado del proyecto

El proyecto se encuentra actualmente **en desarrollo**.

Hasta el momento se ha trabajado en:

- Diseño de interfaces.
- Pantalla de inicio de sesión.
- Navegación mediante tabs.
- Modelo inicial de datos.
- Base de datos de usuarios.
- API en PHP.
- Conexión mediante Axios.
- Validación de credenciales.
- Manejo de información mediante `localStorage`.
- Desarrollo de las vistas principales.
- Vista de perfil.
- Control de versiones mediante Git y GitHub.

Las funcionalidades y vistas continuarán siendo modificadas y mejoradas conforme avance el desarrollo del proyecto.

## 👩‍💻 Autora

**Jazmín Montes**  
Ingeniería de Software
