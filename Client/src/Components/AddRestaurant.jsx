import React, {useContext, useState} from 'react'
import RestaurantFinder from '../APIs/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantContext'

const AddRestaurant = () => {
    const { addRestaurants } = useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const response = await RestaurantFinder.post("/",{
                name,
                location,
                price_range: priceRange
            })
            console.log(response.data)
            addRestaurants(response.data.data.restaurants);
        }
        catch(err){
        }

    }
  return (
    <div className ="mb-4">
        <form action="">
            <div className="form-group row">
                <div className="col">
                    <input value ={name} 
                    onChange={(e) => setName(e.target.value)}
                    type="text" className="form-control" placeholder="name"/>

                </div>
                <div className="col">
                <input type="text"
                 value ={location} 
                onChange={(e) => setLocation(e.target.value)}
                className="form-control" placeholder = "location"/>
                </div>
                <div className="col">
                    <select 
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="custom-select my-1 mr-sm-2">
                        <option disabled>Price Range</option>
                        <option value ="1">$</option>
                        <option value ="2">$$</option>
                        <option value ="3">$$$</option>
                        <option value ="4">$$$$</option>
                    </select>
                </div>
                <div className="col">
                <button 
                onClick={ handleSubmit}
                className="btn btn-primary">Add</button>
                </div>

            </div>
        </form>

    </div>
  )
}

export default AddRestaurant