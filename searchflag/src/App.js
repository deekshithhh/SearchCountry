import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styles from "./countries.module.css";


function CountryCard({ name, flag }) {
  // console.log(name,flag)
  return (
    
      <Card
        variant="outlined"
        className={styles.CardImage}
        sx={{ maxWidth: 100 }}
      >
        <CardMedia
          component="img"
          height="100px"
          image={flag}
          alt={"Flag of " + name}
        />
        <Typography variant="body" color="text.primary">
          {name}
        </Typography>
      </Card>
    
  );
}

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching the countries", error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className={styles.inputclass}>
        <input type="text" value={search} onChange={handleChange} />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          paddingLeft: "20px",

          gap: "20px",
        }}
      >
        {countries
          .filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
          .map((country) => (
            <CountryCard
              key={country.cca3}
              name={country.name.common}
              flag={country.flags.png}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
