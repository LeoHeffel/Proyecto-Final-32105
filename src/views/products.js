
const view = `
<div class="container  mt-3">
        <h1>Cargar Nuevo Producto</h1>
       
        <form  action="/api/productos" method=POST class="row g-3">
            <input id="nombre" type="text" placeholder="Ingrese titulo" name="nombre" class="form-control" required>
            <input id="descripcion" type="text" placeholder="Ingrese descripcion" name="descripcion" class="form-control" required>
            <input id="cat" type="text" placeholder="Ingrese una categoria" name="categoria" class="form-control" required>
            <input id="url" type="text" placeholder="Ingrese url imagen" name="url" class="form-control" required>
            <input id="precio" type="number" placeholder="Ingrese precio" name="precio" class="form-control" required>
            <input id="submit" type="submit" value="enviar" class="btn btn-primary mb-3">
        </form>

`

const viewMensajes = `
<div class="container mb-5" >
  <h2>Nuevo Mensaje</h2>
  <form onsubmit="return enviarMensaje(this)">
          <div class="input-group-append">
          <input
            type="text"
            class="form-control"
            placeholder="Mensaje..."
            id="mensajeChat"
            required
          />
        </div>
          
          <input id="submit2" type="submit" value="enviar" class="btn btn-primary mb-3">
</div>
`


const viewListaMensajes = `
<h1>Historial Mensajes User</h1>
<div class="container mt-3">
{{#if mensajes}}
<div>
    {{#each mensajes}}
      {{#if this.sistema}}
        <i style="color:green">{{this.email}} </i><i>------>>>>>></i>  <strong style="color:green">{{this.text}}</strong><br>
        {{else}}
        <i style="color:blue">{{this.email}} </i><i>------>>>>>></i>  <strong style="color:blue">{{this.text}}</strong><br>
        {{/if}}
    {{/each}}
</div>
{{else}}
<p>No hay Mensajes </p>
{{/if}}
`
const viewListaMensajesAdmin = `
<h1>Historial Mensajes admin</h1>
<div class="container mt-3" id='todos'>
{{#if arrMensajes}}
<div>
    {{#each arrMensajes}}
    {{#each msj}}
    {{#if this.sistema}}
        <i style="color:green">{{this.email}} </i><i>------>>>>>></i>  <strong style="color:green">{{this.text}}</strong><br>
        {{else}}
        <i style="color:blue">{{this.email}} </i><i>------>>>>>></i>  <strong style="color:blue">{{this.text}}</strong><br>
        {{/if}}
  {{/each}}
    <div class="container mb-5" >
    <h2>Responder</h2>
   
          <div class="input-group-append">
            <input
              type="text"
              class="form-control "
              placeholder="Mensaje..."
              id="id{{socket}}"
              required
            />
          </div>
          <button  id="{{socket}}" class="btn btn-primary responder" >responder</button>
    
  </div>
    {{/each}}
</div>
{{else}}
<p>No hay Mensajes </p>
{{/if}}
`

const viewProductos = `
<div class="container mt-3">
<h1>View Productos</h1>
<table  id="tabla" class="table table-primary" align="center">
    <thead>
        <tr class="table-dark">
            <th>Producto</th>
            <th>Precio</th>
            <th>Miniatura</th>
            <th>Acciones</th>
        </tr>
    </thead>
    {{#each productos}}
        <tr> 
            <td class="table-info">{{this.nombre}}</td>
            <td class="table-success"> {{this.precio}}</td>
            <td class="table-warning"><img style="height: 30px" class="img-fluid" src="{{this.url}}" alt="imagen"/></td>
            <td class="table-danger"><button  id="{{this.id}}" class="btn btn-danger comprar">Agregar al Carrito</button></td>
        </tr>
    {{/each}}
</table>

`
const viewCarrito = `

<div class="container mt-3">
<h1>View Carrito</h1>
<table  id="tablaCarrito" class="table table-primary" align="center">
    <thead>
        <tr class="table-dark">
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Acciones</th>
        </tr>
    </thead>
    {{#each carrito}}
        <tr> 
            <td class="table-info">{{this.producto.nombre}}</td>
            <td class="table-success"> {{this.cant}}</td>
            <td class="table-success"> {{this.producto.precio}}</td>
            <td class="table-danger"><button  id="{{this.producto._id}}" class="btn btn-danger comprar">Quitar uno del Carrito</button></td>
        </tr>
    {{/each}}
</table>
  <div>
    <button  id="finalizarCompra" class="btn btn-info comprar">Finalizar Compra</button>
    <button  id="eliminarCarrito" class="btn btn-danger comprar">Borrar Carrito</button>
  </div>

`

///////////////////////////////////////////////////////////////////
let idCarrito, usuario, email,admin, socket


const title = document.getElementById('title')
const price = document.getElementById('price')
const thumbnail = document.getElementById('thumbnail')
const salir = document.getElementById('salir')
const saludo = document.getElementById('saludo')
const imagen = document.getElementById('foto')
const verCarrito = document.getElementById('cart')
const verProductos = document.getElementById('productos')


const botonesAgregar = () => {
  const tabla = document.getElementById('tabla')
  const botones = tabla.querySelectorAll("button")
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', (e) => {
      e.preventDefault()
      let idProducto = e.target.id;
      fetch(`/api/carrito/${idCarrito}/productos`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idProducto: idProducto })
      }).then(res => {
        if (res.status !== 200) console.error('Ocurrio un error al agregar el item')
      });
    }, false)
  }
}

const botonesQuitar = () => {
  const tabla = document.getElementById('tablaCarrito')
  const botones = tabla.querySelectorAll("button")
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', (e) => {
      e.preventDefault()
      let idProducto = e.target.id;
      fetch(`/api/carrito/${idCarrito}/productos/${idProducto}`, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.status !== 200) console.error('Ocurrio un error al borrar el item')
        mostrarCarrito()
      });
    }, false)
  }
}

const botonVaciar = () => {
  document.getElementById('eliminarCarrito')
    .addEventListener('click', (e) => {
      e.preventDefault()

      fetch(`/api/carrito/${idCarrito}`, {
        method: "DELETE"
      }).then(res => {
        if (res.status !== 200) console.error('Ocurrio un error al borrar el Carrito')
        window.location.href = "/";
      })
    })
}

const botonCompra = () => {
  document.getElementById('finalizarCompra')
    .addEventListener('click', (e) => {
      e.preventDefault()

      fetch(`/api/carrito/${idCarrito}/finalizar`, {
        method: "POST"
      }).then(res => {
        if (res.status !== 200) console.error('Ocurrio un error al Finalizar Compra')
        window.location.href = "/";
      })
    })
}



salir.addEventListener('click', (e) => {
  e.preventDefault();
  saludo.innerText = 'Hasta Luego ' + usuario
  setTimeout(function () {
    window.location.href = "/logout";
  }, 2000);
})



fetch('/user')
  .then((response) => response.json())
  .then((res) => {

    saludo.innerText = "Bienvenido " + res.usuario
    usuario = res.usuario
    email = res.email
    admin = res.admin
    imagen.setAttribute('src', res.foto)

    if (!res.cart) {
      idCarrito = fetch(`/api/carrito`, {
        method: "POST",
      })
        .then((response) => response.json())
        .then(res => {
          idCarrito = res.idCarrito
          console.log(`no habia carrito se creo uno nuevo id ${idCarrito}`)
        })
    } else {
      idCarrito = res.cart
      console.log(`carrito existente id ${idCarrito}`)
    }

    if (admin) {
      const viewController = Handlebars.compile(view)
      const viewHtml = viewController()
      document.getElementById('divCargaProductos').innerHTML = viewHtml

    } else {
      formMesajesUsuario()
    }
    chatInit()
  });



const mostrarCarrito = () => {

  fetch(`/api/carrito/${idCarrito}/productos`)
    .then((response) => response.json())
    .then((json) => {
      const prodController = Handlebars.compile(viewCarrito)
      const prodHtml = prodController({ carrito:json })
      document.getElementById('divProductos').innerHTML = prodHtml
      botonCompra()
      botonesQuitar()
      botonVaciar()
    });
}
const mostrarProductos = () => {
  fetch('/api/productos')
    .then((response) => response.json())
    .then((json) => {
      const productos = Object.assign({}, json)
      const prodController = Handlebars.compile(viewProductos)
      const prodHtml = prodController({ productos })
      document.getElementById('divProductos').innerHTML = prodHtml
      botonesAgregar()
    });
}

verCarrito.addEventListener('click', (e) => {
  e.preventDefault();
  mostrarCarrito()
})
verProductos.addEventListener('click', (e) => {
  e.preventDefault();
  mostrarProductos()
})

mostrarProductos()


//////////////////////////////////////////////

const formMesajesUsuario = () => {
  const msgController = Handlebars.compile(viewMensajes)
  const msgHtml = msgController()
  document.getElementById('divMensaje').innerHTML = msgHtml

}


let enviarMensaje,enviarRespuesta
let objMensajes={}



const chatInit = () => {
  socket = io.connect({
    extraHeaders: {
      email,
    }
  })
  
  socket.on('mensajes', (datosEmit) => {
    if(admin==false){
    const msgListController = Handlebars.compile(viewListaMensajes)
    const msgListHtml = msgListController({ mensajes: datosEmit })
    document.getElementById('divHistorialMensajes').innerHTML = msgListHtml
  }
})
enviarMensaje = (event) => {
    
      const mensaje = document.getElementById('mensajeChat')
      const text = mensaje.value.trim()
    
       if (text && email) {
         socket.emit('new-msj', {
          email,
          sistema: admin ? true : false,
          text
        }) 
        
        mensaje.value = ''
        return false
      }
      
    }
    socket.on('mensajesdeUsuario', (socket,email, mensajes) => {
      objMensajes[email] = { msj: mensajes, socket: socket }
      let arrMensajes=[]
      Object.entries(objMensajes).forEach(([socket, value]) => {
      arrMensajes.push(value)
    });
    const adminMsgListController = Handlebars.compile(viewListaMensajesAdmin)
    adminMsgListHtml = adminMsgListController({arrMensajes} )
    document.getElementById('divHistorialMensajes').innerHTML = adminMsgListHtml
    
    const respBotones = document.getElementsByClassName("responder")
    for (let i = 0; i < respBotones.length; i++) {
      respBotones[i].addEventListener('click', (e) => {
        e.preventDefault()
        let id = e.target.id;
        enviarRespuesta(id)
      })
    } 
  })
  
  enviarRespuesta = (id) => {
    const inputText = document.getElementById(`id${id}`)
    const text = inputText.value.trim()
    if(text){
      socket.emit("respMensaje", {
      id,
      text
    })
    inputText.value = ''
    return false
    }else window.alert('escriba un msj')
    
  }
  socket.on('update',(datosEmit)=>{
    if(admin==false){
      const msgListController = Handlebars.compile(viewListaMensajes)
      const msgListHtml = msgListController({ mensajes: datosEmit })
      document.getElementById('divHistorialMensajes').innerHTML = msgListHtml
    }
  })
  
  
}




