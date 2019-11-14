import React from "react";

const inputForm = () => (
    <form onSubmit={this.getWeather}>
        <input type="text" name="city" placeholder="City..."/>
        <input type="text" name="country" placeholder="Country..."/>
        <button>Show Weather</button>
    </form>
);

export default inputForm;



