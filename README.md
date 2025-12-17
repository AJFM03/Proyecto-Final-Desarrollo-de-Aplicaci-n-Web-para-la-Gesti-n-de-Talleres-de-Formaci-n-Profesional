# Proyecto-Final-Desarrollo-de-Aplicaci-n-Web-para-la-Gesti-n-de-Talleres-de-Formaci-n-Profesional

# Proyecto Final - Backend Mopri

Este repositorio alberga el sistema **backend** desarrollado sobre la plataforma **Node.js**, organizado conforme a una estructura estándar que integra:

- Punto de entrada de la aplicación
- Definición formal de dependencias
- Gestión de versiones
- Directorios auxiliares para datos y recursos de apoyo

---

## 📌 Visión general del sistema

El elemento central del sistema es el archivo **`index.js`**, considerado el punto de inicio del proceso de ejecución del servicio.  
En este archivo se concentra la lógica de arranque de la aplicación:

- Inicialización del servidor HTTP  
- Configuración de componentes de infraestructura (framework web, middlewares, manejo de errores, registro de logs)  
- Enlace de rutas o controladores que exponen la funcionalidad del backend  

---

## 📦 Definición del proyecto y dependencias

El archivo **`package.json`** constituye el descriptor formal del proyecto. Contiene:

- Nombre del paquete, versión, descripción funcional, autoría y licencia  
- Scripts para automatizar tareas frecuentes:
  - `npm run dev` → Arrancar servidor en modo desarrollo  
  - `npm start` → Iniciar servidor en modo producción  
  - Ejecución de pruebas unitarias o de integración  

Además define:
- **dependencies** → Librerías externas requeridas para la operación (framework HTTP, cliente de base de datos, validación, etc.)  
- **devDependencies** → Librerías usadas solo en desarrollo (linting, frameworks de pruebas)  

El archivo **`package-lock.json`** fija la resolución exacta de versiones de todas las dependencias y subdependencias, garantizando reproducibilidad en distintos entornos.

---

## 🚀 Punto de entrada y flujo de arranque

El archivo **`index.js`** actúa como módulo raíz del backend.  
Desde aquí se realiza:

- Importación de dependencias principales  
- Configuración del servidor HTTP (puerto, CORS, parseo de JSON, sesiones, autenticación)  
- Montaje de rutas que gestionan las peticiones entrantes  

Este archivo está vinculado a los scripts de `package.json`, de modo que la instrucción `npm start` invoca directamente a `node index.js`, estandarizando la forma de iniciar la aplicación en distintos entornos.

---

## 📚 Ecosistema de dependencias

El directorio **`node_modules/`** contiene las librerías necesarias para ejecutar el proyecto, tanto las declaradas explícitamente en `package.json` como las transitivas.  
Aunque no forman parte del código fuente, son esenciales para el entorno de ejecución (gestión de rutas HTTP, conexión a bases de datos, validación de datos, seguridad, etc.).

---

## 🗂️ Organización de datos y recursos internos

El directorio **`data/`** almacena información de soporte utilizada por la aplicación, como:

- Archivos de configuración adicionales  
- Datos de ejemplo  
- Ficheros en formatos estructurados (JSON, CSV, etc.)  

Esto permite centralizar recursos internos y facilitar su organización y mantenimiento.

---

## 🎨 Recursos de demostración

El directorio **`paginademo1/`** contiene una **página de demostración** o interfaz de prueba vinculada al backend.  
Incluye archivos HTML, CSS y JavaScript de cliente que permiten ilustrar y validar el comportamiento del servicio backend de forma interactiva, sin necesidad de un frontend completo.

---

## 🔄 Gestión de versiones y trazabilidad

La carpeta **`.git/`** indica que el proyecto está bajo control de versiones.  
Esto permite:

- Historial de commits  
- Referencias a ramas y etiquetas  
- Configuración del repositorio  

Gracias a Git se facilita la colaboración entre desarrolladores y la aplicación de flujos avanzados como integración continua, revisiones de código y despliegues controlados.

---

## 📂 Recursos adicionales

Puedes acceder a recursos complementarios en el siguiente enlace:  
👉 [Google Drive - mopri-backend](https://drive.google.com/drive/folders/1gtsmNXZqqwuKShbx_Sq3pxoCZTCHXcbR)

---

## ⚙️ Cómo ejecutar el proyecto

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repo>
   cd mopri-backend

