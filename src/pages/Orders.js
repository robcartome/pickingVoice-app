import ItemPedido from "../components/ItemPedido";
import styled from "@emotion/styled";

export default function Orders() {
  return (<div>
    <h1>Pedidos</h1>
    <List>
      <ItemPedido>
        <div><h5>#CodPdo</h5></div><div><h5>Cliente</h5></div><div><h5>Estado</h5></div><div></div>
      </ItemPedido>
      <ItemPedido>
          <div>
            <p>136268</p>
          </div>
          <div>
            <p>Wilfredo Salas Ruperto</p>
          </div>
          <div>
            <p>F</p>
          </div>
          <button>
            show
          </button>
      </ItemPedido>
    </List>

  </div>)
}

const List = styled.ul`
margin-right: 10%;
list-style-type: none;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 4px;
`;