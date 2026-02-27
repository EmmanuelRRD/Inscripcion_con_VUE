<script setup>
import { reactive, computed, ref, watch } from 'vue';

const alumnosInscritos = ref([]); //El objeto que guardara todos los alumnos

const a = () => {

  // Copia profunda para evitar referencia reactiva
  const nuevoAlumno = JSON.parse(JSON.stringify(alumnoInscrito));//Convertimos y regersamos y guardamos por que es un nuevo objeto
  //Lo clonamos para eliminar la referencia reactiva y evitar modificar el objeto guardado

  alumnosInscritos.value.push(nuevoAlumno);//Guardamos el alumno en alumnosInscritos

  // Opcional: limpiar formulario
  alumnoInscrito.noControl = "";
  alumnoInscrito.nombres = "";
  alumnoInscrito.pApellido = "";
  alumnoInscrito.sApellido = "";
  alumnoInscrito.edad = null;
  alumnoInscrito.semestre = null;
  alumnoInscrito.carrera = "";
  alumnoInscrito.materiasInscritas = [];
};

const alumnoInscrito = reactive({//El valor unitario que se va a modificar
  noControl: "01",
  nombres: "Emmanuel Rogelio",
  pApellido: "Robles",
  sApellido: "Dorado",
  edad: 17,
  semestre: 1,
  carrera: "ISC",
  materiasInscritas: []
});

watch(() => alumnoInscrito.carrera, () => {//Detecta los cambios --> watch(origen, callback)
  alumnoInscrito.materiasInscritas = [];
});

const cargaSeleccionada = computed(() => {
  const carreraEncontrada = carreras.find(
    c => c.nombre === alumnoInscrito.carrera
  );
  return carreraEncontrada ? carreraEncontrada.carga : [];
});

const carreras = [{
  nombre: "ISC", carga: [
    { nombre: "PO", especialidad: false },
    { nombre: "PW", especialidad: false },
    { nombre: "DEVOPS", especialidad: true }]
}, {
  nombre: "Alimentarias", carga: [
    { nombre: "Comida1", especialidad: false },
    { nombre: "Comida2", especialidad: false },
    { nombre: "Comida3", especialidad: true }]
}, {
  nombre: "Administracion", carga: [
    { nombre: "Recreo1", especialidad: false },
    { nombre: "Recreo2", especialidad: true },
    { nombre: "Recreo3", especialidad: true }]
}];
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-10">
        <div class="card shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Inscripciones</h2>

            <form @submit.prevent="a">

              <div class="row">
                <div class="col-md-3 mb-3">
                  <label for="noControl" class="form-label">No. Control</label>
                  <input v-model="alumnoInscrito.noControl" type="text" id="noControl" class="form-control"
                    placeholder="Ingrese número de control" required>
                </div>

                <div class="col-md-3 mb-2">
                  <label for="nombres" class="form-label">Nombres</label>
                  <input v-model="alumnoInscrito.nombres" type="text" id="nombres" class="form-control"
                    placeholder="Ingrese nombres" required>
                </div>

                <div class="col-md-3 mb-3">
                  <label for="pApellido" class="form-label">Primer Apellido</label>
                  <input v-model="alumnoInscrito.pApellido" type="text" id="pApellido" class="form-control"
                    placeholder="Primer apellido" required>
                </div>

                <div class="col-md-3 mb-3">
                  <label for="sApellido" class="form-label">Segundo Apellido</label>
                  <input v-model="alumnoInscrito.sApellido" type="text" id="sApellido" class="form-control"
                    placeholder="Segundo apellido">
                </div>
              </div>

              <div class="row">
                <div class="col-md-3 mb-3">
                  <label for="edad" class="form-label">Edad</label>
                  <input v-model="alumnoInscrito.edad" type="number" id="edad" class="form-control" min="15" required>
                </div>

                <div class="col-md-3 mb-3">
                  <label for="semestre" class="form-label">Semestre</label>
                  <input v-model="alumnoInscrito.semestre" type="number" id="semestre" class="form-control" min="1"
                    max="12" required>
                </div>

                <div class="col-md-3 mb-3">
                  <label for="carrera" class="form-label">Carrera</label>
                  <select v-model="alumnoInscrito.carrera" class="form-select">
                    <option disabled>Seleccione carrera</option>
                    <option v-for="carrera in carreras" :key="carrera.nombre" :value="carrera.nombre">{{ carrera.nombre
                    }}</option>
                  </select>
                </div>
              </div>

              <hr>
              <h4 class="text-center">Carga Academica</h4>

              <div v-for="materia in cargaSeleccionada" :key="materia.nombre" class="form-check">
                <input class="form-check-input" type="checkbox" :value="materia"
                  v-model="alumnoInscrito.materiasInscritas" :id="materia.nombre">

                <label class="form-check-label" :for="materia.nombre">
                  {{ materia.nombre }}
                  <span v-if="materia.especialidad">
                    (Especialidad)
                  </span>
                </label>
              </div>
              <hr>
              <div class="d-grid col-md-3 text-center">
                <button type="submit" class="btn btn-primary btn-lg">
                  Enviar
                </button>
              </div>

            </form>


          </div>
        </div>
      </div>
    </div>
    <hr>
    <h1>Alumnos inscritos</h1>

    <table class="table table-striped mt-3">
      <thead class="table-dark">
        <tr>
          <th>Nombre</th>
          <th>No. Control</th>
          <th>Carrera</th>
          <th>Semestre</th>
          <th>Materias Inscritas</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="alumno in alumnosInscritos" :key="alumno.noControl">
          <td>
            {{ alumno.nombres }} {{ alumno.pApellido }} {{ alumno.sApellido }}
          </td>
          <td>{{ alumno.noControl }}</td>
          <td>{{ alumno.carrera }}</td>
          <td>{{ alumno.semestre }}</td>
          <td>
            <ul class="mb-0 ps-3">
              <li v-for="m in alumno.materiasInscritas" :key="m.nombre">
                {{ m.nombre }}
                <span v-if="m.especialidad" class="text-primary">
                  (Especialidad)
                </span>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>


</template>

<style scoped>
.br {
  margin-top: 5px;
}
</style>
