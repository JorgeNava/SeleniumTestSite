# Pruebas-de-Software 
 
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


¿COMO INSTALAR Y CORRER DESDE CERO?

Descargar todas las aplicaciones descritas arriba en la sección de HERRAMIENTAS

Verificar que tengamos Node.Js instalado usando el sig. comando:

     node -v
 
 De no tenerla instalada entonces descargar aqui: https://nodejs.org/es/download/
 
 Tener una copia del proyecto en tu computadora.
 
 Abrir la aplicación de Docker Desktop
 
 Entrar a la carpeta services y ejecutar el comando descrito arriba para levantar el sevicio de MongoDB
 
 Entrar a la carpeta del backend y frontend y ejecutar el comando descrito arriba para levantar correspondientes aplicaciones.
