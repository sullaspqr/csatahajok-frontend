import React, { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import axios from 'axios'

export const Single = () => {
    const params = useParams();
    const nev = params.shipNev;
    const [csatahajo, setCsatahajo] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        axios.get(`https://localhost:7074/api/Hajo/ByName/${nev}`)
        .then(response => {
            setCsatahajo(response.data);
            setPending(false);
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            setPending(false);
        });
    }, [nev]);

    return (
     <div className="p-5 m-auto text-center content bg-ivory">
        {isPending || !csatahajo.nev ? (
            <div className="spinner-border"></div>
        ) : (
            <div className="container"> {/* Bootstrap középre igazított tartalom, fix szélességi töréspontokkal */}

  <h2 className="mb-4"> {/* mb-4 = margin-bottom 4 egység (kb 1.5rem) */}
    Csatahajó
  </h2>

  <div className="row g-4 justify-content-center"> 
      
      <div className="col-12 col-sm-10 col-md-8 col-lg-6">
        
        <div className="card shadow-lg">

       
           <div className="card-body text-center">
            {/* card-body = kártya tartalom része, automatikus padding */}

            <h5 className="card-title mb-3">
              {csatahajo.nev}
            </h5>
          
            <p className="card-text fs-5">
              Osztály: <b>{csatahajo.osztaly}</b>
            </p>
            
            <p className="card-text fs-5">
              Felavatva (év): <b>{csatahajo.felavatva} </b>
            </p>

            <p className="card-text fs-5">
                Ágyúk száma: {csatahajo.agyukSzama}
            </p>
            <p className="card-text">
              Kaliber: {csatahajo.kaliber}
            </p>
            <p className="card-text">
              Vízkiszorítás: {csatahajo.vizkiszoritas}
              <br /><br />
              <NavLink to={'/'} className="btn btn-primary">
              <i className="bi bi-arrow-left"></i>&nbsp;&nbsp; Vissza</NavLink>
            </p>
          </div>

        </div>

      </div>
  </div>

</div>
        )
    }

     </div>)};