import styled from "@emotion/styled";
import {  useState } from "react";
import iconVoice from '../assets/voice.svg';

export default function ItemPedido(props) {
  const [isOpened, setIsOpened] = useState(false)
  const showModal = () => {
    setIsOpened(!isOpened);
    console.log(isOpened)
  }

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
        <button onClick={(e)=>showModal()}>show</button>
      </>
    );
  return (
    <ProductoItem>
      {props.children}
      {showButton}
      <Modal state={isOpened?"flex":"none"} >
        <ModalWrapper>
          <div>
            <h4>Picking Voice</h4>
            <h3>PDO: 163268 (2/5)</h3>
          </div>
          <ButtonVoice ><img src={iconVoice}/></ButtonVoice>
          <p>Ubicacion Almacen</p>
          <MapWrapper>
                Mapa
          </MapWrapper>
          <button className="button--cancel" onClick={(e)=>showModal()}>CANCEL</button>
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
  background-color: rgba(0,0,0,0.2);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  transition: all .3s;
  display:${(props)=>props.state} ;
  align-items: center;
  justify-content: center;
  
`;
const ModalWrapper = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.25);
  border-radius: 16px 16px 0px 0px;
  width: 100%;
  padding: 10px;
  margin:10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  & > div {
    text-align: center;
  }
  & p,h4 {
    color: green;
  }
  & .button--cancel {
    background: #C4C4C4;
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
  width:60px;
  height:60px;
  margin: 5px;
  padding-right:8px;
  border: 2px solid #4B9460;
  box-sizing: border-box;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline:none;
  :active {
    background-color:rgb(153,255,204,0.9);
  }
`;

const MapWrapper = styled.div`
  background: #f6f6f9;
  width: 100%;
  max-width:485px;
  height: 192px;
`;