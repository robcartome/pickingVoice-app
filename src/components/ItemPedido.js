import styled from "@emotion/styled";
import { useState } from "react";
import iconVoice from "../assets/voice.svg";
import iconPlay from "../assets/play.svg";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function ItemPedido(props) {
  const [isOpened, setIsOpened] = useState(false);
  const showModal = () => {
    setIsOpened(!isOpened);
    console.log(isOpened);
  };

  const showButton =
    props.type == "header" ? (
      <div></div>
    ) : (
      <>
        <div>
          <p>{props.cod}</p>
        </div>
        <div>
          <p>{props.cliente}</p>
        </div>
        <div>
          <p>{props.estado}</p>
        </div>
        <button onClick={(e) => showModal()}>show</button>
      </>
    );
  /*  */

  function activeVoice(type, data) {
    let speech;
    let msgIntro;

    switch (type) {
      case "ubicar":
        msgIntro = "Ubicar: ";
        break;
      case "cantidad":
        msgIntro = "Cantidad: ";
        break;
      case "completo":
        msgIntro = "Completado Siguiente";
        break;
    }

    speech = new SpeechSynthesisUtterance(msgIntro);
    speech.lang = "es-ES";
    speech.rate = 0.9;
    window.speechSynthesis.speak(speech);
    for (let indice = 0; indice < data.length; indice++)
      for (let [key, value] of Object.entries(data[indice])) {
        speech = new SpeechSynthesisUtterance(key);
        speech.lang = "es-ES";
        speech.volume = 1;
        window.speechSynthesis.speak(speech);
        speech = new SpeechSynthesisUtterance(value);
        speech.lang = "es-ES";
        window.speechSynthesis.speak(speech);
      }
  }

  /* let rec;
if(!("webkitSpeechRecognition" in window)){
  alert("disclapa, no puede usar la API")
} else {
  rec = new webkitSpeechRecognition();
  rec.lang="es-ES",
  rec.continous = true;
  rec.interim = true;
  rec.addEventListener("result",iniciar);
} */
  /* function iniciar(event){
  for (let i = event.resultIndex; i< event.results.length; i++){
    console.log= event.result[i][0].transcript;
  }
} */

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    console.log("Speech no es compatible");
  }

  const start = () => {
    SpeechRecognition.startListening({
      continuous: false,
      language: "es-PE",
    });
    console.log(transcript)
  }
    

  /*  */
  return (
    <ProductoItem>
      {props.children}
      {showButton}
      <Modal state={isOpened ? "flex" : "none"}>
        <ModalWrapper>
          <div>
            <h4>Picking Voice</h4>
            <h3>PDO: 163268 (2/5)</h3>
          </div>
          <div>
            <ButtonVoice
              /* onClick={(e) => activeVoice("completo",[{ rack: 1, "": "B", nivel: 3 }])} */
              onClick={(e) => start()}
            >
              <img src={iconPlay} />
            </ButtonVoice>
            <ButtonVoice
              /* onClick={(e) => activeVoice("completo",[{ rack: 1, "": "B", nivel: 3 }])} */
              onClick={(e) => start()}
            >
              <img src={iconVoice} />
            </ButtonVoice>
          </div>
          <p>{transcript}</p> {/* Para mostrar lo que hable */}
          <p>Ubicacion Almacen</p>
          <MapWrapper>Mapa</MapWrapper>
          <button className="button--cancel" onClick={(e) => showModal()}>
            CANCEL
          </button>
        </ModalWrapper>
      </Modal>
    </ProductoItem>
  );
}

const ProductoItem = styled.li`
  background: #ffffff;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.03);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10%;
  padding: 0px 20px;
  min-width: 315px;
  width: 60%;
  border: 1px solid #f6f6f9;
  & > button {
    background: #5db075;
    color: #ffffff;
    font-size: 16px;
    border: none;
    border-radius: 30px;
    padding: 8px 10px;
    outline: none;
    cursor: pointer;
  }
`;

const Modal = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  transition: all 0.3s;
  display: ${(props) => props.state};
  align-items: center;
  justify-content: center;
`;
const ModalWrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.25);
  border-radius: 16px 16px 0px 0px;
  width: 100%;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  & > div {
    text-align: center;
  }
  & p,
  h4 {
    color: green;
  }
  & .button--cancel {
    background: #c4c4c4;
    color: #ffffff;
    font-size: 16px;
    border: none;
    border-radius: 30px;
    padding: 8px 10px;
    cursor: pointer;
  }
`;

const ButtonVoice = styled.button`
  background: rgba(75, 148, 96, 0.1);
  width: 60px;
  height: 60px;
  margin: 5px;
  padding: 8px;
  border: 2px solid #4b9460;
  box-sizing: border-box;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
  :active {
    background-color: rgb(153, 255, 204, 0.9);
  }
`;

const MapWrapper = styled.div`
  background: #f6f6f9;
  width: 100%;
  max-width: 485px;
  height: 192px;
`;
