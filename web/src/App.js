import "./App.css";
import ColorField from "./ColorField";
import { hexToHsl, hslToHex, interpolateHsl } from "./colorUtils";
import { useState } from "react";

function App() {

  const blueOptions = ["#0e48c7", "#1e3e82", "#668ee3", "#4077ed", "#6193ff"];
  const greyOptions = ["#3e3e40","#88898c", "#c3c8d4", "#313233", "#c9cbd1"];
   const [t, setT] = useState(.4);
   const [minBlue, setMinBlue] = useState(blueOptions[Math.floor(Math.random() * blueOptions.length)]);
   const [minGrey, setMinGrey] = useState(greyOptions[Math.floor(Math.random() * greyOptions.length)]);
   const [ colorChoices, setColorChoices] = useState({grey: [], blue: []});
   const [isPlaying, setIsPlaying] = useState(true);
  

   let currentColor = hslToHex(interpolateHsl(hexToHsl(minBlue), hexToHsl(minGrey), t));

  const selectedBlue = async () => {
    setColorChoices({...colorChoices, blue: [...colorChoices.blue, currentColor]});
    if(t > .5){
      await sendColorChoices({...colorChoices, blue: [...colorChoices.blue, currentColor]});
      setIsPlaying(false);
    }
    setMinBlue(currentColor)
    t > .5 ? setT(.4) : setT(.8);
  }

  const selectedGrey = async () => {
    setColorChoices({...colorChoices, grey: [...colorChoices.grey, currentColor]});
    if(t < .5){
      await sendColorChoices({...colorChoices, grey: [...colorChoices.grey, currentColor]});
      setIsPlaying(false);
    }
    setMinGrey(currentColor)
    t > .5 ? setT(.4) : setT(.8);
  }

  const sendColorChoices = async (ourColorChoices) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/colors`, {
      method: "POST",
      body: await JSON.stringify({colorChoices: ourColorChoices}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return (
    <>
    {isPlaying ? ( 
      <><ColorField color={currentColor} /><div className="button-container">
          <button onClick={selectedBlue}>Blue</button>
          <div className="button-separator"></div>
          <button onClick={selectedGrey}>Grey</button>
        </div></>
      ) : (
        <div>The end</div>
      )}
    </>
  );
}

export default App;
