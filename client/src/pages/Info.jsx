import "./../styles/Info.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { useState } from "react";
import DialCodeDropdown from "../DialCodeDropdown";

export default function About() {
    const [dialSender, setDialSender]     = useState("+1");
    const [dialCourier, setDialCourier]   = useState("+1");
    const [service, setService] = useState("regular");
    const [weight, setWeight] = useState("");
    const [length, setLength] = useState("");
    const [width,  setWidth]  = useState("");
    const [height, setHeight] = useState("");
  
    {/* fonction de calcul du pris de */}
    function calculerPrixColis() {
      const DIVISEUR_VOLUMETRIQUE = 5000;
      const BASE_PRICE = 0.0;
      const PRICE_PER_KG = 2.0;
      const SURCHARGE_EXPRESS = 7.99;   // ton Express bouton

        // si un des champs est vide ou invalide → return "Please fill all fields"

    
      const poidsVolumetrique = (length * width * height) / DIVISEUR_VOLUMETRIQUE;
      const poidsFacture = Math.max(weight, poidsVolumetrique);
    
      let total = BASE_PRICE + (poidsFacture * PRICE_PER_KG);
    
      if (service === "express") {
        total += SURCHARGE_EXPRESS;
      }
    
      return isFinite(total) ? total.toFixed(2) : "0.00";  // sécurité si champs vides
    }

  return (
    <main className="about">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-md fixed-top top-navbar py-3">
        <div className="container">
          <a className="navbar-brand" href="#" id="brand">
            CanadianCourrier
          </a>

          <button
            className="navbar-toggler text-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav text-center">
              <li className="nav-item">
                <a className="nav-link text-dark" href="#about-me">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#mail">
                  Mail
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

        <div className="container-fluid" style={{position: "fixed", inset: 0}}>
          <div className="row">
            {/* FORM */}
            <section className="col sender p-10 pt-5 mt-5 mb-6">
              <div className="container">

                {/* Nom complet */}
                <div className="input-group mb-3">
                  <span className="input-group-text">First name | Last name</span>
                  <input type="text" aria-label="First name" className="form-control" placeholder="Angelina" />
                  <input type="text" aria-label="Last name" className="form-control" placeholder="Jolie" />
                </div>

                {/* E-mail */}
                <div className="input-group mb-3">
                  <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  />
                  <span className="input-group-text">@</span>
                  <input
                  type="text"
                  className="form-control"
                  placeholder="canadiancourrier.com"
                  aria-label="Domain"
                  />
                </div>

                {/* Téléphone : indicatif + numéro */}
                <div className="input-group mb-3">
                  <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  type="button"
                  >
                  {dialSender}
                  </button>

                  {/* menu généré par map */}
                  <DialCodeDropdown onSelect={setDialSender} />

                  <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone number"
                  aria-label="Phone number"
                  />
                </div>
              </div>
            </section>
            {/* FORM Livreur*/}
            <section className="col recept pt-5 mt-5 mb-6">
              <div className="container">
                  
              {/* Nom complet */}
              <div className="input-group mb-3">
                  <span className="input-group-text">First name | Last name</span>
                  <input type="text" aria-label="First name" className="form-control" placeholder="Jhon" />
                  <input type="text" aria-label="Last name" className="form-control" placeholder="Wick" />
              </div>

              {/* E-mail */}
              <div className="input-group mb-3">
                  <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  />
                  <span className="input-group-text">@</span>
                  <input
                  type="text"
                  className="form-control"
                  placeholder="canadiancourrier.com"
                  aria-label="Domain"
                  />
              </div>

                {/* Téléphone : indicatif + numéro */}
                <div className="input-group mb-3">
                    <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    type="button"
                    >
                    {dialCourier}
                    </button>

                    {/* menu généré par map */}
                    <DialCodeDropdown onSelect={setDialCourier} />

                    <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone number"
                    aria-label="Phone number"
                    />
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Address</span>
                    <input type="text" class="form-control"  aria-describedby="inputGroup-sizing-default"/>
                </div>

                <div class="row g-2 mb-3">

                  
                  <div class="col-md">
                    <div class="form-floating">
                      <input type="number" class="form-control" id="Height" placeholder="cm"
                      value={height} onChange={(e) => setHeight(e.target.value)}/>
                      <label for="floatingInputGrid">Height (cm)</label>
                    </div>
                  </div>

                  <div class="col-md">
                      <div class="form-floating">
                        <input type="number" class="form-control" id="Lenght" placeholder="cm" 
                        value={length} onChange={(e) => setLength(e.target.value)}/>
                        <label for="floatingInputGrid">Length (cm)</label>
                      </div>
                      </div>
                  </div>
                
                <div class="row g-2">
                  <div class="col-md">
                          <div class="form-floating">
                            <input type="number" class="form-control" id="Weight" placeholder="kg"
                            value={weight} onChange={(e) => setWeight(e.target.value)}/>
                            <label for="floatingInputGrid">Weight (kg)</label>
                          </div>
                        </div>

                    <div class="col-md">
                        <div class="form-floating">
                            <input type="number" class="form-control" id="Width" placeholder="cm"
                            value={width} onChange={(e) => setWidth(e.target.value)}/>
                            <label for="floatingInputGrid">Witdth (cm)</label>
                        </div>
                    </div>
                </div>
                

                <div className="d-flex my-4">
                    <button id="btn1"
                      type="button"
                      className={`flex-fill btn ${service==="regular" ? "btn-danger" : "btn-outline-dark"}`}
                      onClick={() => setService("regular")}
                    >
                        Regular
                    </button>
                    <button id="btn1"
                        type="button"
                        className={`flex-fill btn ${service==="express" ? "btn-danger" : "btn-outline-dark"}`}
                        onClick={() => setService("express")}
                    >
                        Express&nbsp;(7.99&nbsp;$CAD)
                    </button>
                    </div>
                </div>
                <p className="mt-4 fs-5 fw-bold text-dark">
                  Total shipping price: {calculerPrixColis()} $ CAD
                </p>
                <p className="mt-4">
                    Ready to pay?&nbsp;
                    <a href="/payment" className="link-danger text-decoration-none fw-bold">
                        Go to payment page →
                    </a>
                </p>
            </section>
          </div>
        </div>      
    </main>
  );
}