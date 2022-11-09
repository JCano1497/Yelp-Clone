import React, {useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../APIs/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantContext';
import AddReview from './AddReview';
import Reviews from './Reviews';

const RestaurantDetail = () => {
    const {id} = useParams();
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);
    useEffect(() =>{
        const fetchData = async() =>{
            try{
            const response = await RestaurantFinder.get(`/${id}`)
            console.log(response)
            setSelectedRestaurant(response.data.data)
            }
            catch(err){

            }
        }
        fetchData();

    },[]) ;

  return (
    <div>
    {selectedRestaurant && (
      <>
      <h1 className="text-center display-1">
      {selectedRestaurant.restaurant.name}
        </h1>
      <div className="mt-3">
        <Reviews reviews={selectedRestaurant.reviews}/>

      </div>
      <AddReview/>
      </>
    )}
    </div>
  )
}

export default RestaurantDetail