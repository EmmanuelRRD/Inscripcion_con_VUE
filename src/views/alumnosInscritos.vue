<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const alumnos = ref([])

onMounted(() => {
    const data = localStorage.getItem('alumnosInscritos')
    if (data) {
        alumnos.value = JSON.parse(data)
    }
})
</script>

<template>
    <div class="container mt-4">
        <h3>Alumnos Inscritos</h3>

        <table class="table table-bordered mt-3">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>No. Control</th>
                    <th>Carrera</th>
                    <th>Semestre</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="alumno in alumnos" :key="alumno.noControl">
                    <td>{{ alumno.nombres }} {{ alumno.pApellido }}</td>
                    <td>{{ alumno.noControl }}</td>
                    <td>{{ alumno.carrera }}</td>
                    <td>{{ alumno.semestre }}</td>
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