
const ver = `
<div class="container  mt-3">
        <h1>Variables de entorno Actual</h1>
       
        <form  onsubmit=""  class="row g-3">
        <div>
        DB Mongo 
            <input id="dbMongo" type="text" placeholder="DB Mongo " name="dbMongo" class="form-control" value="{{dbMongo}}"required>
            DB Sesion
            <input id="dbSesion" type="text" placeholder="DB Sesion " name="dbSesion" class="form-control" value="{{dbSesion}}"required>
            tipoBD
            <input id="tipo" type="text" placeholder="tipoBD" name="tipo" class="form-control" value="{{tipo}}"required>
            Email Admin 
            <input id="mailAdmin" type="text" placeholder="Email Admin " name="mailAdmin" class="form-control" value="{{mailAdmin}}"required>
            Email Servidor 
            <input id="mailServidor" type="text" placeholder="Email Servidor " name="mailServidor" class="form-control" value="{{mailServidor}}"required>
            Pasword Email Servidor
            <input id="passServidor" type="text" placeholder="Pasword Email Servidor" name="passServidor" class="form-control" value="{{passServidor}}"required>
            Modo Funcionamiento (dev o production)
            <input id="modo" type="text" placeholder="Modo Funcionamiento" name="modo" class="form-control" value="{{modo}}"required>
            Puerto
            <input id="port" type="text" placeholder="Puerto" name="port" class="form-control" value="{{port}}"required>

            <input class="btn btn-primary mb-3" id="submitconfig"  value="Actualizar" >
          </div>
        </form>

`




const verConfig = document.getElementById('divVer')




fetch('/config?reqData=data')
  .then((response) => response.json())
  .then((res) => {
      const viewController = Handlebars.compile(ver)
      const viewHtml = viewController(res)
      verConfig.innerHTML = viewHtml
      const botonSubmit = document.getElementById('submitconfig')
      botonSubmit.addEventListener('click',()=>actualizar())
  
  });


  actualizar = () => {
   
   
    const dbMongo = document.getElementById('dbMongo').value
    const dbSesion = document.getElementById('dbSesion').value
    const tipo = document.getElementById('tipo').value
    const mailAdmin = document.getElementById('mailAdmin').value
    const mailServidor = document.getElementById('mailServidor').value
    const passServidor = document.getElementById('passServidor').value
    const modo = document.getElementById('modo').value
    const port = document.getElementById('port').value
    
    fetch(`/config`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({dbMongo,dbSesion,tipo,mailAdmin,mailServidor,passServidor,modo,port})
    })
      .then(window.alert('listo')).then(window.location.href = "/")
      
  
    }
    
  





