import ItemPedido from "../components/ItemPedido";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import OrdersService from "../services/orders_service";

export default function Orders() {
  const [statePedido, setStatePedido] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const ordersService = new OrdersService();
      const orders = await ordersService.list();
      setOrders(orders);
    }
    fetchOrders();
  }, []);

  // console.log(orders);
  const data = [
    {
      id: 1,
      codPdo: "136268",
      cliente: "Wilfredo sala ruperto",
      estado: 0,
    },
    {
      id: 2,
      codPdo: "136234",
      cliente: "Robert Tolemtnoio",
      estado: 0,
    },
    {
      id: 3,
      codPdo: "136244",
      cliente: "Kathy Jara Larcon",
      estado: 0,
    },
  ];
  return (
    <StyleDiv>
      <h1>Pedidos</h1>
      <List>
        <ItemPedido type={"header"}>
          <div>
            <h5>#CodPdo</h5>
          </div>
          <div>
            <h5>Cliente</h5>
          </div>
          <div>
            <h5>Estado</h5>
          </div>
        </ItemPedido>
        
        {orders.map((pedido) => {
          return (
            <ItemPedido
              key={pedido.id}
              id={pedido.id}
              cod={pedido.numPdo}
              cliente={pedido.nomCliente}
              estado={pedido.estado}
            />
          );
        })}
      </List>
    </StyleDiv>
  );
}

const StyleDiv = styled.div`
  text-align: center;
`

const List = styled.ul`
  margin-right: 10%;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
