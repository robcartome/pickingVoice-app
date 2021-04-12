import { apiFetch, BASE_URL } from "./api_fetch.js";

function OrdersService() {
  if (!OrdersService.instance) {
    OrdersService.instance = this;
  }
  return OrdersService.instance;
}

OrdersService.prototype.list = () =>
  apiFetch(`${BASE_URL}/pedidos`, {
    method: "GET",
  });

  OrdersService.prototype.show = (idPdo) =>
  apiFetch(`${BASE_URL}/pedido/${idPdo}`, {
    method: "GET",
  });

  OrdersService.prototype.updateItem = (idPdo, idItem, done) =>
  apiFetch(`${BASE_URL}/pedido/${idPdo}/item/${idItem}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ done }),
  });

  OrdersService.prototype.checkStatePedido = (idPdo) =>
  apiFetch(`${BASE_URL}/pedido/${idPdo}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ done }),
    // rsp { "estado": true }
  });
export default OrdersService;
