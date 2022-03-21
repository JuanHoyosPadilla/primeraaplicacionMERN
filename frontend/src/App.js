import {useState,useEffect} from 'react'
import axios from 'axios'


function App() {
  const [notas, setNotas] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editando, setEditando] = useState(false)
  const [notaeditada, setNotaeditada] = useState({
    id: null, title: '', description:''
  })
  

  const obtener = () => {
    axios
      .get('http://localhost:4000/')
      .then(response => {
        const notase = response.data.noteDB;
        setNotas(notase)
       // console.log(notas)
      })
  }
  const eliminar = (id) => {
    axios
    .delete(`http://localhost:4000/deleteNota/${id}`)
    .then(response => {
      obtener()
      console.log(response.data.Messages)
    })
  }

  
  const editar = (nota) => {
    // console.log(nota)
    setNotaeditada({id: nota._id, title: nota.title, description: nota.description})
    setEditando(true)
  }
  
  const actualizar = (id) =>  {
   // e.preventDefault();
    const data = {
      title: title,
      description: description
    }

    axios.put(`http://localhost:4000/editNota/${id}`, data)
    .then(response => {
      console.log(response.data.mesage)
    })
    setEditando(false)
    obtener()
    setTitle('')
    setDescription('')
  }
  useEffect(() => {
    obtener()
  },[])

  const addNota = (e) => {
    e.preventDefault();
    const newnota = {
      title,
      description
    }
    axios.post('http://localhost:4000/newNota',newnota)
    .then(response => {
      setNotas(notas.concat(response.data.notadb))
      console.log(response.data.mesage)
      setTitle('')
      setDescription('')
    })
  }


  return (
    <div className='container'>
      <div className='card col-md-6 mt-5'>

        { 
        
          editando ? (
            <div className="card-body" >
            <h3>EDITANDO</h3>
            <div className='mb-3'>
              <input 
              value={title || notaeditada.title  }
              type="text" 
              className='form-control'
              
              onChange={(event) =>setTitle(event.target.value)}
              />
            </div>
            <div className='mb-3'>
              <input 
              value={description || notaeditada.description}
              type="text" 
              className='form-control'
              
              onChange={(event) =>setDescription(event.target.value)}
              />
            </div>
            <button type='button' onClick={ () => { actualizar(notaeditada.id)}} className='btn btn-success'>Editar</button>
          </div>
          ) : (
            <form onSubmit={addNota} className="card-body" >
              <h3>AGREGAR NUEVA NOTA</h3>
              <div className='mb-3'>
                <input 
                value={title}
                type="text" 
                className='form-control'
                placeholder="Titulo"
                onChange={(event) =>setTitle(event.target.value)}
                />
              </div>
              <div className='mb-3'>
                <input 
                value={description}
                type="text" 
                className='form-control'
                placeholder="Description"
                onChange={(event) =>setDescription(event.target.value)}
                />
              </div>
              <button type='submit' className='btn btn-success'>Send</button>
            </form>

          )
        
        }
        
      </div>
      <div className='mt-4 row'>
        {
          notas.map(nota => 
            <ul className='list-group mb-4 col-md-3 ' key={nota._id}>
              <li className='list-group-item'>{nota.title}</li>
              <li className='list-group-item'> {nota.description} </li>
              <li className='list-group-item'>{nota.date}</li>
              <button className='btn btn-danger' onClick={() => eliminar(nota._id)}>Eliminar</button>
              <button className='btn btn-primary' onClick={() => editar(nota)}>Editar</button>
            </ul>
            )
        }
      </div>
    </div>
  );
}

export default App;
