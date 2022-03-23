﻿# Pruebas-de-Software 
 
 INFRAESTRUCTURA DEL PROYECTO
 
 Frontend fue desarrollado con React.js, un framework.
 
 Backend fue desarrollado con Express.js, una libreria de Node.js.
 
 Servicios de bases de datos no relacional (MongoDb) levantado con Docker.
 
 
 SERVICIO BD MONGO

     docker-compose up -d


FRONTEND & BACKEND

Instalar dependencias: 
     
     npm install

Correr aplicación: 
     
     npm run start


HERRAMIENTAS UTILIZADAS

Docker Desktop: https://www.docker.com/products/docker-desktop

Insomnia: https://insomnia.rest/download


NoSqlBooster: https://nosqlbooster.com

Link para conectarse a la Base de Datos: 

     mongodb://localhost:27017


GitHub Desktop: https://desktop.github.com (Iniciar sesión con cuenta de GitHub)


¿COMO INSTALAR Y CORRER DESDE 0?

Descargar todas las aplicaciones descritas arriba en la sección de HERRAMIENTAS

Verificar que tengamos Node.Js instalado usando el sig. comando:

     node -v
 
 De no tenerla instalada entonces descargar aqui: https://nodejs.org/es/download/
 
 Tener una copia del proyecto en tu computadora.
 
 Abrir la aplicación de Docker Desktop
 
 Entrar a la carpeta services y ejecutar el comando descrito arriba para levantar el sevicio de MongoDB
 
 Entrar a la carpeta del backend y frontend y ejecutar el comando descrito arriba para levantar correspondientes aplicaciones.


Requerimiento:
- Tenga como página inicial un apartado para iniciar sesión.
- Tener opción para registrarse (usuario, contraseña), si no se encuentra un usuario registrado.
- Tener opción para restaurar contraseña, si no la recuerda.
- Al iniciar sesion, mostrar opciones para generar solicitud de servicio, ver solicitudes, salir.
	- Cuando se selecciona generar solicitudes, preguntar categoría.
	- Cuando se selecciona la categoría mostrar tipo de servicio.
	- Cuando se selecciona el servicio: mostrar campos para capturar ubicación física, horario de que se puede atender, descripción de la solicitud, botón para realizar la solicitud.
	- Cuando se selecciona ver solicitudes muestra todas las solicitudes realizadas por el usuario que inició sesión, con el estatus que tiene(Solicitada,En proceso, Cancelada, Terminada).
	- Al seleccionar la opción para salir, deberá cerrar sesión y mostrar nuevamente la página de iniciar sesión.
	- Hay un usuario administrador que atiende todas las solicitudes que:
		- cuando inicia sesión le muestra todas las solicitudes realizadas.
		- cuando selecciona una solicitud le muestra el detalle de la solicitud y una opción para cambiarle el estado(Solicitada,En proceso, Cancelada, Terminada)

Categorías: 
	General:
		- Red
		- Instalación de software
		- Respaldo de información

	Falla:
		- Telefonía
		- Sistema
		- Equipo de cómputo
	Otro: 
		- Reporte de información
		- Cambio de contraseña
		- Adquisición de equipo