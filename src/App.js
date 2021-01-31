import React,{useState,useEffect} from 'react';
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'
function App() {

  //State de nuestra app
  const[busqueda,guardarBusqueda]=useState('');
  const[imagenes,guardarImagenes] =useState([]);
  const[paginaActual,guardarPaginaActual]=useState(1);
  const [totalPaginas,guardarTotalPaginas] =useState(1)


  useEffect(() => {
    const consultarApy = async() => {
      if(busqueda ==='')return

      const imagenesPorPagina =30;
      const key ='20091316-fd1fa11876881e76efc86d83d';
      const url =`https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
      const respuesta= await fetch(url);
      const resultado = await respuesta.json();


      guardarImagenes(resultado.hits);

      //Calcular El Total De Paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina)
       guardarTotalPaginas(calcularTotalPaginas)



       //Mover la pantalla hacia arriba
        const jumbotron = document.querySelector('.jumbotron')
        jumbotron.scrollIntoView({behavior:'smooth'})
    }
    consultarApy()
  }, [busqueda,paginaActual])
  //definir La pagina Anterior
  const paginaAnterior =() =>{
    const nuevaPaginaActual = paginaActual -1;

    if(nuevaPaginaActual === 0)return;
    guardarPaginaActual(nuevaPaginaActual)
  }
  const paginaSiguiente =() =>{
    const nuevaPaginaActual = paginaActual +1;
    if(nuevaPaginaActual > totalPaginas)return;
    guardarPaginaActual(nuevaPaginaActual)
  }

  return (
   <div className="container">
     <div className="jumbotron">
      <p className="lead text-center">Buscar Imagenes</p>
      <Formulario
        guardarBusqueda={guardarBusqueda}
      />
       
     </div>
     <div className="row justify-content-center">
       <ListadoImagenes
          imagenes={imagenes}
       />
      {(paginaActual === 1)? null:(
            <button
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaAnterior}
            >&laquo; Anterior</button>
      )}
      {(paginaActual === totalPaginas)? null :
          <button
          type="button"
          className="btn btn-info mr-1"
          onClick={paginaSiguiente}
          
         >Siguiente &raquo;</button>}
     </div>
   </div>
  );
}

export default App;
