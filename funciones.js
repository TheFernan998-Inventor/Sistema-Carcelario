import { eliminar, getData, obtener, save, update } from "./firebase.js"

let id = 0

document.getElementById('btnGuardar').addEventListener('click', async () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            const preso = {
                'run': document.getElementById('run').value,
                'nombre': document.getElementById('nombre').value.trim(),
                'apellido': document.getElementById('apellido').value.trim(),
                'grado': document.getElementById('grado').value,
                'fecha_ingreso': document.getElementById('fecha_ingreso').value,
                'fecha_salida': document.getElementById('fecha_salida').value,
                'sexo': document.querySelector('input[name="sexo"]:checked').value
            }
            save(preso)
                    limpiar()
        } else {
            const preso = {
                'run': document.getElementById('run').value,
                'nombre': document.getElementById('nombre').value.trim(),
                'apellido': document.getElementById('apellido').value.trim(),
                'grado': document.getElementById('grado').value,
                'fecha_ingreso': document.getElementById('fecha_ingreso').value,
                'fecha_salida': document.getElementById('fecha_salida').value,
                'sexo': document.querySelector('input[name="sexo"]:checked').value
            }
            await update(id, preso)
            limpiar()
            Swal.fire({
                title: 'Actualizado',
                text: 'El registro ha sido actualizado correctamente',
                icon: 'success'
            })
            id = 0
        }
    }
})


window.addEventListener('DOMContentLoaded', () => {
    getData((collection) => {
        let tabla = ''
        collection.forEach((doc) => {
            const item = doc.data()
            tabla += `<tr>
                <td>${item.run}</td>
                <td>${item.nombre}</td>
                <td>${item.apellido}</td>
                <td>${item.grado}</td>
                <td>${item.fecha_ingreso}</td>
                <td>${item.fecha_salida}</td>
                <td>${item.sexo}</td>
                <td nowrap>
                    <button class="btn btn-warning" id="${doc.id}">Editar</button>
                    <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
                </td>
            </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla;
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        eliminar(btn.id)
                        Swal.fire({
                            title: "Eliminado",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })

        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const doc = await obtener(btn.id)
                const d = doc.data()
                document.getElementById('run').value = d.run
                document.getElementById('nombre').value = d.nombre
                document.getElementById('apellido').value = d.apellido
                document.getElementById('grado').value = d.grado
                document.getElementById('fecha_ingreso').value = d.fecha_ingreso
                document.getElementById('fecha_salida').value = d.fecha_salida
                document.querySelector(`input[name="sexo"][value="${d.sexo}"]`).checked = true
                document.getElementById('btnGuardar').value = 'Modificar'
                id = btn.id
            })
        })
    })
})

document.querySelectorAll('.btn-danger').forEach(btn => {
    btn.addEventListener('click', () => {
        Swal.fire({
            title: "¿Estás seguro de eliminar el registro?",
            text: "No podrás revertir los cambios",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                eliminar(btn.id)
                    .then((message) => {
                        alert(message);
                    })
                    .catch((error) => {
                        alert(error);
                    });
            }
        })
    })
})




