import React, {useEffect, useState} from "react";
import USDZLoaders from "./components/Loaders/USDZLoader";
const App = ({container, options}) => {
    console.log(options, "fromm APP", container);

    return <USDZLoaders container={container} options={options} />;
};

export default App;
