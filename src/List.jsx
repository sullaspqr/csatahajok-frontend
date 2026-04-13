import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

export const List = () => {
    const [csatahajok, setCsatahajok] = useState([])
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        axios.get('https://localhost:7074/api/Hajo/All')
        .then(response => {
            setCsatahajok(response.data);
            setFetchPending(false);
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            setFetchPending(false);
        });
    }, []);

    return (
     <div className="p-5 m-auto text-center content bg-ivory">
        {isFetchPending ? (
            <div className="spinner-border"></div>
        ) : (
            <div className="container"> {/* Bootstrap középre igazított tartalom, fix szélességi töréspontokkal */}

  <h2 className="mb-4"> {/* mb-4 = margin-bottom 4 egység (kb 1.5rem) */}
    Csatahajók
  </h2>

  <div className="row g-4"> 
    {/* row = Bootstrap grid sor */}
    {/* g-4 = gap (térköz) az oszlopok között, 4-es méret */}
    
    {csatahajok.map((csatahajo, index) => (
      
      <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
        {/* col-12 = mobilon teljes szélesség (1 kártya/sor) */}
        {/* col-sm-6 = kis kijelzőn (≥576px) 2 kártya/sor */}
        {/* col-md-4 = közepes kijelzőn (≥768px) 3 kártya/sor */}
        {/* col-lg-3 = nagy kijelzőn (≥992px) 4 kártya/sor */}
        
        <div className="card h-100 shadow-lg">
          {/* card = Bootstrap kártya komponens */}
          {/* h-100 = magasság 100%, minden kártya egyforma magas */}
          {/* shadow-sm = kis árnyék a kártya alatt */}
        
          <div className="card-body">
            {/* card-body = kártya tartalom része, automatikus padding */}

            <h4 className="card-title">
             <NavLink to={`/single/${csatahajo.nev}`}>Név: {csatahajo.nev}</NavLink>
            </h4>
            {/* card-title = kártya cím stílus */}

            <p className="card-text">
              Osztály: <b>{csatahajo.osztaly}</b>
            </p>
            {/* card-text = kártya szöveg formázás */}

            <p className="card-text">
              Felavatva (év): <b>{csatahajo.felavatva} </b>
            </p>

            <p className="card-text">
              Ágyúk száma: {csatahajo.agyukSzama}
            </p>
            <p className="card-text">
              Kaliber: {csatahajo.kaliber}
            </p>
            <p className="card-text">
              Vízkiszorítás: {csatahajo.vizkiszoritas}
            </p>
          </div>

        </div>

      </div>

    ))}
  </div>

</div>
        )
    }

     </div>)};