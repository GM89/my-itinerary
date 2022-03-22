import React, { useEffect } from 'react';
import {fetchAllItineraries} from '../store/actions/itineraryActions.js';
import { useSelector, useDispatch } from "react-redux";

import {fetchAllActivities} from '../store/actions/activityActions.js';
import {ItineraryItem} from './ItineraryItem'
            /*   console.log(dispatch, 'el dispatch') */
            // Los estados se cargan antes que el componente se cargue, 
            //const [filter, setFilter] = useState('')
                /* useEffect(() => {
                    getData()
                    }, [])*/
              
            // Dentro del map hay código html. Neceistaríamos indicar el resultado dentro de un return? No es necesario.
            /* Dado que map ya está dentro de un return.
            Analizamos el siguiente pedazo de código:
            filter(objectitineraries => data[objectitineraries].itineraries.toLowerCase().includes(filter.toLowerCase()))
            objectitineraries es cada object que está en la array data.
            Queremos ir a la propiedad itineraries de cada objeto 
            data[objectitineraries].itineraries Ssnos permite hacer eso. Aqui data[objectitineraries] actúa como un índice. 
            //const [data, setData] = useState('')
            */

function AllItineraries() {

/* Note! There could have been asyncrony troubles here. itineraryData intitial data is read and mounted before useEffect, meaning that fetch has not been done
therefore we don't have access to entire state object, but just partially. 
state.itineraries.itineraries.data.data (where the itineraries are) can't be read right now because fetch hasn't download it. 
So initialy itineraryData is dummy variable that only gets itineraries.itineraries.data*/
const itineraryData = useSelector(state => state.itineraries.itineraries.data)
//const activitiesData = useSelector(state => state.activities.activities)


const dispatch = useDispatch();
console.log(itineraryData,'itineraryData here');

/*UseEffect invoked immediately after a component is mounted.it is also called everytime its dispatch change its values, that is, when there's a new fetch
On the previous section topic, here we have access to whole already fetched state, so we could go itineraries.itineraries.data.data. Where do we do this?
In the itinerariesActions fetchitineraries() downloads the whole state as 'fetchedData', and now we can access to where the itineraries are.
that is the ".data" key-value, and we do this when we write fetchedData.data.
 */


  

  useEffect( () => {
   const loadItineraries = async()=> {
   await dispatch(fetchAllItineraries())
   };
   loadItineraries();


   const loadAct= async()=> {
    await dispatch(fetchAllActivities())
    };

    loadAct()
   

   
  },[dispatch] );

 let mapping =  ((itineraryData  && itineraryData.map(x=>{
      return (
 
            <ItineraryItem itineraryId={x._id}
                  title={x.title}
                  price={x.price}
                  rating={x.rating}
                  picture={x.picture}/>
           
              
       
      )
        })) ) 
        

  return (
   <div>
    <h1>Itineraries</h1>
    <div class="row row-cols-1 row-cols-md-2 g-4  px-5">

      {mapping}
   </div>
  </div>  

  )
} 

  



export  {AllItineraries};


