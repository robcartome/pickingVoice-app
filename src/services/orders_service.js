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

  OrdersService.prototype.update = (idPdo, idItem, done) =>
  apiFetch(`${BASE_URL}/pedido/${idPdo}/item/${idItem}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ done }),
  });
export default OrdersService;
