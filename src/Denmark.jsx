import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Denmark = () => {
    const navigate = useNavigate();
    const [csatahajok, setCsatahajok] = useState([])
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        axios.get(`https://localhost:7074/api/Csata/Resztvevok/Denmark%20Strait`)
        .then(response => {
            // mivel itt a response.data nem objektumot ad vissza, hanem tömböt, a hivatkozás neve lesz a lekérdezés alapja majd,
            // és nem bontjuk tovább ( mivel objektumnál kulcs-érték párok vannak, tömbnél meg értékek csak! )
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
    Denmark Strait csatában részt vevő csatahajók:
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
             Név: {csatahajo} 
               <form onSubmit={(event) => {
            event.persist();
            event.preventDefault();
            fetch(`https://localhost:7074/api/Kimenet/KimenetTorles/Denmark%20Strait/${csatahajo}`, {
                method: "DELETE",
            })
            .then(() =>
            {
                navigate("/denmark");
                window.location.reload();
            })
            .catch(console.log);
            }}>
                              <div><br />
<NavLink to={"/"}><button className="bi bi-backspace">&nbsp;Mégsem</button></NavLink>
&nbsp;&nbsp;<br />
<button className="bi bi-trash3">&nbsp;Törlés</button></div></form>   
            </h4>
          </div>

        </div>

      </div>

    ))}
  </div>

</div>
        )
    }

     </div>)};
