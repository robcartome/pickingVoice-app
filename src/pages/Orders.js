import ItemPedido from "../components/ItemPedido";
import styled from "@emotion/styled";

export default function Orders() {

  return (<div>
    <h1>Pedidos</h1>
    <List>
      <ItemPedido type={"header"}>
        <div><h5>#CodPdo</h5></div><div><h5>Cliente</h5></div><div><h5>Estado</h5></div>
      </ItemPedido>
      <ItemPedido id = {"1"} cod ={"136268"} cliente={"Wilfredo sala ruperto"} estado={"False"}>
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