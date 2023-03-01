
# Proyecto Final Backend - Leo Heffel

Ejemplo de servidor desarrollado en Node con base en express 





Para iniciar  hacer `npm install` y luego `npm start` o `npm run dev`

por defecto levanta en el puerto 8081


un usuario normal puede
- recibir el historial de mensajes al iniciar sesion
- enviar mensajes al administrador de la pagina
- ver todos los productos
- agregar al carrito
- quitar del carrito
- eliminar carrito
- finalizar compra

el usuario admin puede:
- crear modificar e eliminar productos, 
- ver todos los mensajes que le envian por chat y responderlos individualmente
- cambiar la configuracion de las variables de entorno


credenciales para ingreso de admin (email: admin@admin, password: admin)
## API Reference

#### Get 

```http
  GET /
```
Redirecciona a la pagina principal o al formulario de ingreso si no tiene sesion activa


#### Get Login

```http
  GET /login
```
responde con un html para el ingreso


#### Get Register

```http
  GET /register
```
responde con un html para el registro
#### Get Register Error

```http
  GET /registerError
```
responde con un html con mensaje de Error
#### Get Login Error

```http
  GET /loginError
```
responde con un html con mensaje de Error
#### Get User

```http
  GET /user
```
responde con la informacion de usuario logueado exitosamente y su carrito activo

#### Get Logout

```http
  GET /logout
```
cierra sesion y redirige a /

#### Get Config

```http
  GET /config
```
responde con un html con la configuracion de las variables de entorno (requiere permisos administrador)

#### Post Register

```http
  POST /register
```
crea un nuevo usuario si todos los datos estan correctos ({email,password,username,address,age,phone,photo}) y concede acceso con sesion activa o redirige a la pagina de error

#### Post Login

```http
  POST /
```
inicia sesion si los datos estan correctos ({email,password}) o redirige a la pagina de error

#### Post Config

```http
  POST /config
```
guarda la configuracion actualizada (requiere permisos administrador)

////////////////////////////////

#### Get Productos

```http
  GET /api/productos
```
responde con una lista de todos los productos


```http
  GET /api/productos/:selector
```
responde con una lista de todos los productos bajo la categoria indicada o un producto si se ingresa el indicada
#### Post Productos

```http
  POST /api/productos
```
crea un nuevo producto si los datos estan correctos ({nombre,descripcion,url,precio,categoria}) (requiere permisos administrador)

#### Put Productos

```http
  PUT /api/productos/:id
```
actualiza un producto si los datos estan correctos ({id}{nombre,descripcion,url,precio,categoria}) (requiere permisos administrador)

#### Delete Productos

```http
  DELETE /api/productos/:id
```
elimina un  producto si los datos estan correctos ({id}) (requiere permisos administrador)


//////////////////////////////////////////////////////////////////////

#### Get Carrito

```http
  GET /api/carrito/:id/productos
```
responde con  los productos agregados al carrito o un error si no se encuentra el carrito


#### Post Carrito

```http
  POST /api/carrito/
```
responde con  el id del nuevo carrito creado


```http
  POST /api/carrito/:id/productos
```
agrega un producto enviado por body al carrito indicado por params ({id}{idProducto})


```http
  POST /api/carrito/:id/finalizar
```
finaliza la compra la guarda en ordenes, envia mail al admin con el detalle y establece el carrito como finalizado




#### Delete  Carrito

```http
  GET /api/carrito/:id/productos/:id_prod
```
elimina un producto del carrito