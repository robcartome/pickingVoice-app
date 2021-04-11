import styled from "@emotion/styled";

export default function ItemPedido(props) {
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
        <button>show</button>
      </>
    );
  return (
    <ProductoItem>
      {props.children}
      {showButton}
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
  button {
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
