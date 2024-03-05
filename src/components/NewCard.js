import React from "react";
import "./NewCard.css";
function NewCard() {
  const listing = {
    imageUrl: "https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1687866128/catalog/1673638354082381824/glwp0wyjvfu1bfggvazk.jpg", // Replace with your image URL
    featured: true,
    beds: 2,
    baths: 1,
    title: "Modern 2 Bedroom Apartment",
    address: "123 Main Street, Anytown, CA 12345",
    type: "Apartment",
    furnishing: "Unfurnished",
    price: 2500,
    sqft: 1000,
    pricePerSqft: 2.5,
    realtor: "John Doe",
    rent: null,
  };

  return (
    <div className="card">
      <img className="card-image" src={listing.imageUrl} alt={listing.title} />
      <div className="card-header">
        <div className="card-id-container">ID:24</div>
        <p className="featured">Equal Opportunity policy</p>
        <div className="card-info">
          <p className="beds">This is equal opportunity policy.</p>
        </div>
      </div>
      <div className="policy-card-body">
        <div className="card-flex-1">
          <span className="cons-pro-card-heading">Policy Type:</span>
          <p className="project-name-span">Official</p>
        </div>
        <div className="card-flex-2">
          <span className="cons-pro-card-heading">Total Rating:</span>
          <p className="project-name-span">4 out of 10</p>
        </div>
      </div>
      <div className="policy-card-body">
        <div className="card-flex-1">
          <span className="cons-pro-card-heading">Created on:</span>
          <p className="project-name-span">22-03-2006</p>
        </div>
        <div className="card-flex-2">
          <span className="cons-pro-card-heading">Updated on:</span>
          <p className="project-name-span">22-03-2010</p>
        </div>
      </div>
      <hr/>
       <div className="policy-card-body" style={{marginTop:"8px", textAlign:"center"}}>
        <div className="card-flex-1">
          <span className="cons-pro-card-heading" style={{textAlign:"center"}}>Consultants</span>
          <p className="project-name-span">Keshav Tayal, Amarjeet Kumar</p>
        </div>
      </div>
    </div>
  );
}

export default NewCard;
