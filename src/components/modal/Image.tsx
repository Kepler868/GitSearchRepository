import React from 'react';

const Image = ({ url}: any): JSX.Element => {
 
    return (
      <img
        style={{ width: "100px", borderRadius: "10px" }}
            src={url}
            alt=""
        
      />
    );
};

export default Image;