import Link from 'next/link';
import superagent from 'superagent'
import React, {useState} from 'react';




function Index(){
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [query, setQuery] = useState();

  const handleChange= (e) => {  
    e.preventDefault();
    setAddress(e.target.value);
  }

  const handleCityChange = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  }

  const handleStateChange = (e) => {
    e.preventDefault();
    setState(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    normalizeRequest(address, city, state);
  }


  const createQueryString = (input) => {
    let seperator = input.split(" ");
    let query = seperator.join('%20');
    return query;
  }

   const fetchData = async (query) => {
    console.log(query);

    const fetch = await superagent.get('http://localhost:9000/elections').query({query: query});
    console.log(fetch.body);
  }

  const normalizeRequest = (address, city, state) => {  
    let add = createQueryString(address);
    let cs = createQueryString(city);
    let st = createQueryString(state);
    let query = `${add}%20${cs}%20${st}`;
    return fetchData(query);
  }

  return (
  <div>
    <Link href="/about">
        <a  title="About" >About Page</a>
    </Link>
    <form onSubmit={(e) => handleSubmit(e)} >
      <input type="text" placeholder="Street address" value={address} onChange={(e) => handleChange(e)}/>
      <input type="text" placeholder="City" value={city} onChange={(e) => handleCityChange(e)}/>
      <input type="text" placeholder="State" value={state} onChange={(e) => handleStateChange(e)}/>
      <button type="submit">Submit</button>
    </form>
  <p> { address } </p>
  <p> {city} </p>
  <p> {state} </p>

  </div>
  );
};

export default Index;