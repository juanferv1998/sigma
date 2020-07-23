<template>
    
    <div class="col md-5">
      <section v-if="errored">
    <p>Lo sentimos, no es posible obtener la información del api en este momentomento.</p>
  </section>
    <p v-if="errors.length">
                <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
                <ul>
                
                </ul>
  </p>
  <section v-else>
    <div v-if="loading">Cargando...</div>

    <div>
        {{info}}
    </div>
  </section>
        <div class="card shadow p-3 mb-5 bg-white rounded">
            <form @submit.prevent="addContact"    class="formulario" > 
              
                <div class="form-group">
                    <label for="formGroupDepartamento">Departamento*</label>
                        <select v-model="selected" class="custom-select">
                      
                          <option> Antioquia </option>
                        </select>
                </div>
                <div class="form-group">
                            <label for="formGroupCiudad">Ciudad*</label>
                            <select v-model="contact.city" class="custom-select">
                            <option selected>Medellin</option>
                            <option> Envigado</option>
                            </select>
                            
                </div>
                <div class="form-group">
                        <label for="formGroupNombre">Nombre*</label>
                        <input v-model="contact.name" type="text" class="form-control" id="formGroupNombre" placeholder="Pepito de Jesús">
                        </div>
                <div class="form-group">
                        <label for="formGroupCorreo">Correo*</label>
                        <input v-model="contact.email" type="text" class="form-control" id="formGroupCorreo" placeholder="Pepitodejesus@gmail.com">
                </div>

                <input  @click="$bvModal.show('bv-modal-example')" class="btn rounded-pill btn-lg boton-enviar"  type="submit"  value="Enviar">
               
                   
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
class Contact {
    constructor(name,email,state,city){
        this.name = name;
        this.email = email;
        this.state = state;
        this.city = city;
    }
}
export default {
    
    data(){
        return{
            
            info :null,
            loading: true,
            errored: false,
            added: false,
            contact: new Contact()

              }
            

        }, 
        
         mounted () {
         axios
          .get(' https://sigma-studios.s3-us-west-2.amazonaws.com/test/colombia.json')
          .then(response => {
          this.info = response.data.test

          })
         .catch(error => {
        console.log(error)
        this.errored = true
       })
       .finally(() => this.loading = false)
     },

        
            methods: {
                
                addContact (){

                    fetch('/api/contacts',{
                        method: 'POST',
                        body: JSON.stringify(this.contact),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => console.log(data))


                    this.contact = new Contact();
                   
                    

                }
            }
    }
    

</script>