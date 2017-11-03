import React from "react";

export const BikeOrMetro = props =>{
    if(props.comparison===true){
      return (
            <p>You should metro</p>

        ) 

    }

    else{return (
            <p>You can Bike</p>

        ) }
    

  };