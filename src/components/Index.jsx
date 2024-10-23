import React, { useState } from 'react'

const Index = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    // State to store the predicted shade result
    const [predictedShade, setPredictedShade] = useState('');
    const [shadeImagePreview, setShadeImagePreview] = useState(null); // For shade image

        // Handle image input and immediately process it
        const handleImageChange = (event) => {
            const file = event.target.files[0];
            if (file) {
            setSelectedImage(file); // Save the selected file in state

            // Generate a preview URL for the image and set it in the state
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            console.log("Image selected for comparison:", file);
            }
        };


        // Handle the button click event to process the stored image
  const handlePredictClick = () => {
    if (selectedImage) {
        // You can add your image processing or comparison logic here
        console.log("Processing image:", selectedImage);
  
        // Example: Replace this with your actual prediction logic
        const shade = "Shade Example"; // Replace with actual logic
        const shadeImageUrl = "path_to_shade_image.jpg"; // Replace with the actual image URL of the predicted shade
  
        setPredictedShade(shade);  // Update the state to show the predicted shade
        setShadeImagePreview(shadeImageUrl); // Set the shade image preview
      } else {
        setPredictedShade("Please upload an image first.");
        setShadeImagePreview(null); // Clear the shade image if no image is uploaded
      }
  };

  return (
    <div>
     <div className="container">
            <div className="row">
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <div className="row g-3">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <h3><b><center>UPLOAD THE IMAGE </center></b></h3>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <input type="file" className="form-control" accept="image/*" onChange={handleImageChange}/>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <button onClick={handlePredictClick} className="btn btn-primary"><b><center>Predict the shade</center></b></button>

                        </div>
                        {/* Display images side by side */}
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-4">
                <div className="row">
                  <div className="col col-6">
                    {/* Display the uploaded image preview here */}
                    {imagePreview && (
                      <div>
                        <h4>Uploaded Image Preview</h4>
                        <img
                          src={imagePreview}
                          alt="Uploaded Preview"
                          style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="col col-6">
                    {/* Display the shade image preview here */}
                    {shadeImagePreview && (
                      <div>
                        <h4>Predicted Shade Image</h4>
                        <img
                          src={shadeImagePreview}
                          alt="Predicted Shade"
                          style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-4">
                        {/* Display the predicted shade here */}
                        {predictedShade && (
                            <div>
                            <h4>Predicted Shade:</h4>
                            <p>{predictedShade}</p>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    </div>
  )
}

export default Index