import React, { useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RestaurantFinder from '../APIs/RestaurantFinder'


const AddReview = () => {
    // adding reviews
    const navigate = useNavigate();
    const {id} = useParams();
    const [name,setName] = useState("")
    const [reviewBody,setReviewBody] = useState("")
    const [rating,setRating] = useState("")

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
        const newReview = await RestaurantFinder.post(`/${id}/addReview`,{
        name,
        body: reviewBody,
        rating
        });
        console.log(newReview)
        navigate(`/`);
    }
    catch(err){

    }

    }
    
  return (
    <div className="mb-2">
        <form action="">
            <div className="form-row">
                <div className="form-group col-8">
                    <label htmlFor="name">Name</label>
                    <input value={name} 
                    onChange ={(e) => setName(e.target.value)}
                    id="name" placeholder='name' type="text" className="form-control"/>
                </div>
                <div className="form-group col-4">
                    <label htmlFor="rating">Ratings</label>
                    <select value={rating} 
                    onChange ={(e) => setRating(e.target.value)}
                    id="rating"  className="form-ccustom-select">
                        <option disabled>Rating(1-5)</option>
                        <option value ="1">1</option>
                        <option value ="2">2</option>
                        <option value ="3">3</option>
                        <option value ="4">4</option>
                        <option value ="5">5</option>
                        </select>
                </div>
            </div>
            <div className="form-group col-8">
                    <label htmlFor="Review">Reviews</label>
                    <textarea 
                    value={reviewBody}
                    onChange ={(e) => setReviewBody(e.target.value)}
                    id="review" className="form-control"></textarea>
                </div>
                <button 
                onClick={handleSubmit}
                className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default AddReview