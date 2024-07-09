import React,{ useState } from 'react'; 

import './App.css';
import { dientes, procedimiento, partes } from './data' 

interface PropsItemDiente {
  item: any;
  onClick: (data:any) => void;
  selectDiente: any[]; 
}

const ItemDiente = ({ item, onClick, selectDiente  }: PropsItemDiente) => {
 
  const hasProdDiente = (parte:any,diente:any) => { 
    const res = selectDiente.find((item:any)=> item.diente===diente&&item.parte===parte );
    if(res){ return res; }
    const nulo = {}
    return nulo;
  } 

  const hasDiente = () => { 
    return selectDiente.find((item2:any)=> item2.diente===item.diente ); 
  }

  let dataDiente = hasDiente()  
  let hasGroup = dataDiente?.tipoDiente === 'grupo'
  let styleDiente = dataDiente?.procedimiento == 6? 'item-diente puente' : 'item-diente'
  let styleBase = dataDiente?.procedimiento == 5? 'base corona' : 'base'

  return(
    <div className={styleDiente}>
      <h3>{item.diente} </h3>

      <div className={styleBase}>
        {
          partes.map((di)=>{
            const classstyle = di.codigo==5?"p5 hoverParte":"parte hoverParte p"+di.codigo
            const infoDg = hasProdDiente(di.codigo,item.diente) 
            const backcolor = hasGroup || !infoDg ? "#fff" : infoDg?.colorDiente
            
            return(
              <div className={classstyle}  
              title={infoDg?.diente?backcolor:"Normal" }
              style={{backgroundColor:backcolor}}
              onClick={()=> hasGroup && !dataDiente ? alert('nada'):onClick({parte: di.codigo, diente: item.diente})}></div>
            )
          })
        } 
      </div>
        {
          dataDiente?.procedimiento == 3 && <div style={{position:'absolute', top:55, right:-5}}>
            <img src={require('./cross.png')} alt="Diente extraido" width={70}/>
            </div>
        }
         {
          dataDiente?.procedimiento == 7 && <div style={{position:'absolute', top:55, right:-5}}>
            <img src={require('./implant.png')} alt="Diente implante" width={70}/>
            </div>
        }
    </div>
  )
}

function App() {
  const [ selectDiente, setSelectDiente ] = useState<any[]>([]);
  const [ listDgDiente, setDgDiente ] = useState([]);
  const [ cantidad, setCantidad ] = useState(0);

  const [ selectProcedimiento, setSelectProcedimiento ] = useState(0);
  const [ colorDiente, setColorDiente ] = useState('cyan')
  const [ tipoDiente, setTipoDiente] = useState<string>('individual'); 

  const onClickDiente = ({parte, diente}: any) => {
    const data:any = selectDiente;
    data.push({ diente, parte, tipoDiente, colorDiente, procedimiento: selectProcedimiento });
    setCantidad(cantidad+1)
    setSelectDiente(data);
  }

  const loadItemDiente = (num: number) => {
    return dientes.filter((item)=> item.cuadro === num ).map((item,i)=>{
      return(<ItemDiente 
        key={i} 
        item={item} 
        onClick={onClickDiente}    
        selectDiente={selectDiente}/>)
    })
  }  

  const handleProcedimiento = (value:any) => { 
    setSelectProcedimiento(value)  
    procedimiento.map((item)=> {
      if(item.id == value ){
        setColorDiente(item.color)
        setTipoDiente(item.tipo)
      }
    })
  }

  const eliminarDiente = (item:any) => { 
    const resData = listDgDiente.filter((items:any) => !( items.diente == item.diente && items.parte == item.parte )  )
    setDgDiente(resData)
  }

  const getNameProcedimiento = (id:any) => {
    return  procedimiento.find(items => items.id == id )
  }

  const getNameParte = (id:any): any=> {
    return  partes.find(items => items.codigo == id )
  }

  return (
    <div className="container">
      
        <h1>Odontograma {cantidad}</h1>

        <div className="content"> 

          <div className="box-input">
            <label  className="form-label">Procedimiento </label>
            <select  className="form-control" onChange={(event)=>handleProcedimiento(event.target.value)}>
                <option></option> 
              {
                procedimiento.map((item)=>{
                  return(
                    <option value={item.id}> 
                      {item.nombre}
                    </option> 
                  )
                })
              }
            </select>
          </div> 

          <br></br>
          <hr/>
          <br></br>
             
          <div className="card-body row">  
            <div className='filaCuadro'>
              <div className='cuadro c1'> { loadItemDiente(1) } </div>
              <div className='cuadro c2'> { loadItemDiente(2) } </div> 
            </div>
            <div className='filaCuadro'>
              <div className='cuadro c3'> { loadItemDiente(3) } </div>
              <div className='cuadro c4'> { loadItemDiente(4) } </div> 
            </div>  
          </div>

            <br/>
            <hr/>
            <br/>

            {
            // <table className="table">
            //   <thead>
            //       <tr> 
            //           <th>Pieza</th>
            //           <th>Cara</th>
            //           <th>Procedimiento</th>
            //       </tr>
            //   </thead>
            //   <tbody>
            //     {
            //       selectDiente.map((itemDi)=>{
            //         return(
            //           <tr>
            //               <td>{itemDi.diente}</td>
            //               <td>{ getNameParte(itemDi.parte).nombre }</td>
            //               <td>{ getNameProcedimiento(itemDi.procedimiento)?.nombre}</td>
            //           </tr>
            //         )
            //       })
            //     }
                   
            //   </tbody>
            // </table>

            }

 
        </div>  
    </div>
 
  );
}

export default App;
