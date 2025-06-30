import React, { useEffect, useState } from 'react'

export const Dashboard = () => {
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [fecha, setFecha] = useState('')
  const [cupos, setCupos] = useState('')
  const [experienciaIdSelected, setExperienciaIdSelected] = useState('')



  useEffect(() => {
    fetch('http://localhost:3000/api/experiencias')
      .then(res => res.json())
      .then(setData)
      .catch(() => setData([]))
  }, []);

  const guardarReserva = () => {
    return (e) => {
      e.preventDefault()
      if (!fecha || !cupos) {
        alert('Por favor, completa todos los campos.')
        return
      }

      if (cupos <= 0) {
        alert('El número de cupos debe ser mayor a 0.')
        return
      }

      // si todo es correcto, añadir la reserva
      setShowModal(false)

      // ingresar la reserva
      let id_fecha = data.filter(x => x.id_experiencia === experienciaIdSelected).map(x => x.id_fecha)[0]
      fetch('http://localhost:3000/api/reservarExperiencia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          id_experiencia: experienciaIdSelected,
          id_usuario: localStorage.getItem('user'), 
          cupos,
          id_fecha: id_fecha,
        })
      })
        .then(res => res.json())
        .then(response => {
          // Puedes manejar la respuesta si es necesario
        })
        .catch(error => {
          alert('Error al reservar la experiencia');
        });


      handleAddReserva(e)
    }
  }

  const handleAddReserva = (e) => {
    e.preventDefault()
    setData([
      ...data,
      {
        experienciaId: data.length + 1,
        nombre: "Nueva reserva",
        fecha,
        cupos
      }
    ])
    setShowModal(false)
    setFecha('')
    setCupos('')
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Reservas</h2>
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Experiencia ID</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((res, idx) => (
            <tr key={idx}>
              <td>{res.experienciaId || res.id_experiencia}</td>
              <td>{res.nombre}</td>
              <td>
                {res.fecha
                  ? new Date(res.fecha).toLocaleDateString()
                  : res.fecha_experiencia
                    ? new Date(res.fecha_experiencia).toLocaleDateString()
                    : ''}
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setExperienciaIdSelected(res.experienciaId || res.id_experiencia)
                    setFecha(res.fecha || res.fecha_experiencia || '')
                    setCupos(res.cupos || '')
                    setShowModal(true)
                  }}
                >
                  Reservar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={guardarReserva()}>
                <div className="modal-header">
                  <h5 className="modal-title">Añadir Reserva</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Fecha</label>
                    <input
                      type="text"
                      className="form-control"
                      value={fecha}
                      onChange={e => setFecha(e.target.value)}
                      required
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cupos</label>
                    <input
                      type="number"
                      className="form-control"
                      value={cupos}
                      onChange={e => setCupos(e.target.value)}
                      required
                      min={1}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary" >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}