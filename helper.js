const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() === '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    } else {
        input.classList.add('is-valid')
        div.innerHTML = ''
        if (id === 'fecha_ingreso') {
            const fechaSalida = document.getElementById('fecha_salida').value;
            const fechaIngreso = input.value;
            if (validarDiferenciaFechas(fechaIngreso, fechaSalida) < 730) {
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">La fecha de ingreso debe ser como mínimo 2 años antes de la fecha de salida</span>';
            }
        }        
        if (id === 'fecha_salida') {
            const fechaIngreso = document.getElementById('fecha_ingreso').value
            const fechaSalida = input.value
            if (validarDiferenciaFechas(fechaIngreso, fechaSalida) < 730 || new Date(fechaSalida) <= new Date(fechaIngreso)) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">La fecha de salida debe ser al menos 2 años después de la fecha de ingreso y mayor a la fecha de ingreso</span>'
            }
        }
        if (id === 'run') {
            if (!validarRun(input.value.trim())) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El run ingresado no es válido</span>'
            }
        }
    }
}

const validarFechaIngreso = (fecha) => {
    const hoy = new Date()
    const fechaIngresada = new Date(fecha)
    const diferencia = hoy - fechaIngresada
    const dias = diferencia / (1000 * 60 * 60 * 24)
    return dias.toFixed(0)
}

const validarDiferenciaFechas = (fechaInicio, fechaFin) => {
    const fecha1 = new Date(fechaInicio)
    const fecha2 = new Date(fechaFin)
    const diferencia = fecha2 - fecha1
    const dias = diferencia / (1000 * 60 * 60 * 24)
    return dias.toFixed(0)
}

const validarRun = (run) => {
    const Fn = {
        validaRut: function (rutCompleto) {
            rutCompleto = rutCompleto.replace("‐", "-")
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false
            const tmp = rutCompleto.split('-') 
            let digv = tmp[1] 
            const rut = tmp[0] 
            if (digv == 'K') digv = 'k'

            return (Fn.dv(rut) == digv)
        },
        dv: function (T) {
            let M = 0, S = 1
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11
            return S ? S - 1 : 'k'
        }
    }
    return Fn.validaRut(run)
}


const verificarSexo = () => {
    const div = document.getElementById('e-sexo')
    if (!document.getElementById('sexo_m').checked && !document.getElementById('sexo_f').checked && !document.getElementById('sexo_o').checked) {
        div.innerHTML = '<span class="badge bg-danger">Debe seleccionar un sexo</span>'
    } else {
        div.innerHTML = ''
    }
}

const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById(`e-${item.name}`).innerHTML = ''
    })
    document.getElementById('run').readOnly = false
    document.getElementById('btnGuardar').value = 'Guardar'
}

const soloNumeros = (evt) => {
    if (evt.keyCode >= 48 && evt.keyCode <= 57) return true
    return false
}

