import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import iconVoice from "../assets/voice.svg";
import iconPlay from "../assets/play.svg";
import OrdersService from "../services/orders_service";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function ItemPedido(props) {
  const [isOpened, setIsOpened] = useState(false);
  const [order, setOrder] = useState([]);
  const [item, setItem] = useState(0);
  const [dataProducto, setDataProducto] = useState({});
  let totalProductos = order.length;
  /* Para traer el Pedido seleccionado */
  useEffect(() => {
    async function fetchOrders() {
      const ordersService = new OrdersService();
      const order = await ordersService.showOrder(props.id);
      setOrder(order);
    }
    fetchOrders();
  }, []);

  const showModal = () => {
    setIsOpened(!isOpened);
    console.log(isOpened);
    resetTranscript();
    setDataProducto({});
    setItem(0);
  };

  // Lee datos Producto por Producto que sigue
  function readProducto() {
    const data = order[item]
      ? {
          codProd: order[item].codProducto,
          producto: order[item].nomProducto,
          rack: order[item].numRack,
          posicion: order[item].posicion,
          nivel: order[item].numNivel,
          estado: order[item].estado,
        }
      : "";
    const ubicacion = {
      producto: data.producto,
      rack: data.rack,
      posicion: data.posicion,
      nivel: data.nivel,
    };
    let i = 0;
    if (data.estado == 0) {
      activeVoice(`ubicar`, [ubicacion] || [{ producto: "No Hay" }]);
      setDataProducto(data);
      i = item + 1;
      setItem(i);
    } else {
      activeVoice(`completo`, [{ "": "" }]);
      i = item + 1;
      setItem(i);
      //setItem(totalProductos);
    }
    if (totalProductos == item) {
      setItem(0);
      activeVoice(`completo`, [{ Pedido: "" }]);
      alert("Pedido Completado");
    }
  }

  // Verificaremos si es el codigo Producto es correcto
  function confirmCodeProducto() {
    const code = finalTranscript;
    order.forEach((element) => {
      if (element.codProducto == code) {
        console.log(code, "Correcto");
        resetTranscript();
      }
    });
  }

  /* Pasar Texto A Voz  */
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
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
    for (let indice = 0; indice < data.length; indice++)
      for (let [key, value] of Object.entries(data[indice])) {
        speech = new SpeechSynthesisUtterance(key);
        speech.lang = "es-ES";
        speech.volume = 1;
        speech.rate = 1;
        window.speechSynthesis.speak(speech);
        speech = new SpeechSynthesisUtterance(value);
        speech.lang = "es-ES";
        speech.rate = 1;
        window.speechSynthesis.speak(speech);
      }
  }

  /* Pasar Voz a Texto  */
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
  };

  const listenCodProducto = () => {
    start();
    setTimeout(() => {
      SpeechRecognition.stopListening();
      SpeechRecognition.abortListening();
      console.log("Apagar micro");
    }, 3500);
  };
  /* Fin Pasar Voz a Texto */

  /* Controla: mostrar Header o Items de la Tabla*/
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
          <p>{props.estado == 0 ? "Falta" : <b>Listo</b>}</p>
        </div>
        <button onClick={(e) => showModal()}>show</button>
      </>
    );

  return (
    <ProductoItem>
      {props.children}
      {showButton}
      <Modal state={isOpened ? "flex" : "none"}>
        <ModalWrapper>
          <div>
            <h4>Picking Voice</h4>
            <h3>
              PDO: {props.cod} ({item}/{totalProductos})
            </h3>
            <p> Escuchar y Responder</p>
          </div>
          <div>
            <ButtonVoice onClick={(e) => readProducto()}>
              <img src={iconPlay} />
            </ButtonVoice>

            <ButtonVoice onClick={(e) => listenCodProducto()}>
              <img src={iconVoice} />
            </ButtonVoice>
          </div>
          <p>
            {transcript} | Cod. Producto: {finalTranscript}
          </p>
          <MapWrapper>
            Mapa - Ubicacion:
            <h4>Producto : {dataProducto.producto} </h4>
            <h5>Rack : {dataProducto.rack}</h5>
            <h5>Posicion: {dataProducto.posicion}</h5>
            <h5>Nivel : {dataProducto.nivel}</h5>
          </MapWrapper>
          <button className="button--cancel" onClick={(e) => showModal()}>
            CANCEL
          </button>
        </ModalWrapper>
      </Modal>
    </ProductoItem>
  );
}

/**
 * Styles Components
 */
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
