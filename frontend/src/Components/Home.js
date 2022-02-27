import Coin from "./Coin";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

const Home = (props) => {
  // const [cryptos, setCryptos] = useState({ btc: 1, eth: 2 });
  const cryptos = {
    ada: 0.8975,
    bch: 309.3487,
    bsv: 84.9285,
    btc: 39323.7702,
    dash: 93.001,
    doge: 0.1276,
    etc: 28.139,
    eth: 2788.59,
    ltc: 109.6424,
    sol: 90.535,
    xmr: 154.3601,
    xrp: 0.7589,
    zec: 107.2972,
  };
  // const [loading, setLoading] = useState(false);
  const [coins, setCoins] = useState([<Coin id={0} choices={cryptos} />]);

  /*
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/coins");
      setCryptos(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  */

  const handleSubmit = (event) => {
    const reqString = { vals: [] };
    coins.map((coin) => {
      var crypto = document.getElementById(
        coin.props.id + " choose crypto"
      ).textContent;
      var quantity = parseFloat(
        document.getElementById(coin.props.id + " quantity").value
      );
      var usd = parseFloat(
        document.getElementById(coin.props.id + " value").textContent
      );

      reqString["vals"].push([crypto, quantity, usd]);
    });
    console.log(JSON.stringify(reqString));
    axios
      .post("http://localhost:5000/portfolio", JSON.stringify(reqString))
      .then((resp) => console.log(resp));
    /*
    axios
      .fetch("http://localhost:5000/portfolio", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
      */
  };

  const addButton = (e) => {
    setCoins([...coins, <Coin id={coins.length} choices={cryptos} />]);
  };

  const removeButton = (e) => {
    const list = [...coins];
    list.pop();
    setCoins(list);
  };

  return (
    <div>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography> Coins </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography> Quantity </Typography>
          </Grid>
          <Grid item xs>
            <Typography> USD Value </Typography>
          </Grid>
        </Grid>
        {coins}
        <Button onClick={addButton}> Add </Button>
        <Button onClick={coins.length > 1 ? removeButton : null}>
          {" "}
          Remove{" "}
        </Button>
        <Button onClick={handleSubmit}>Save Choices </Button>
      </form>
    </div>
  );
};

export default Home;
