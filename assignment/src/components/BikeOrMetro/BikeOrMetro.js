import React from "react";

//component which renders saying whether the user should metro or bike
export const BikeOrMetro = props =>{
    if(props.comparison===true){
      	return (
            <p>You should metro</p>
        ) 
    }
    else{
    	return (
            <p>You can Bike</p>
        ) 
	}
    

};