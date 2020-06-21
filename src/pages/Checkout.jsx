import React from 'react';
import { FaShoppingCart, FaUserEdit, FaCreditCard } from 'react-icons/fa';

const ReviewCart = (props) => {
  const { cart, totalPrice } = props;
  return (
    <ul className="list-group">
      {cart.map((product) => (
        <li
          key={product.id}
          className="list-group-item d-flex justify-content-between lh-condensed"
        >
          <div>
            <p className="my-0">{product.title}</p>
            <small className="text-muted">
              {product.cartQuantity} {product.cartQuantity === 1 ? 'unidade' : 'unidades'}
            </small>
          </div>
          <span className="text-muted ml-2">
            R${(product.cartQuantity * product.price).toFixed(2)}
          </span>
        </li>
      ))}
      <li className="list-group-item d-flex justify-content-between lh-condensed">
        <span>Total: </span><strong>R${totalPrice.toFixed(2)}</strong>
      </li>
    </ul>
  );
}

const CartReview = (props) => {
  const { cart } = props;
  const totalPrice = cart.reduce((acc, product) => (product.cartQuantity * product.price) + acc, 0);
  const totalQuantity = cart.reduce((acc, product) => (product.cartQuantity * 1) + acc, 0);
  return (
    <section className="my-3">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted d-flex align-items-center">
          <FaShoppingCart className="mr-1" /> Seu carrinho
        </span>
        <span className="badge badge-secondary badge-pill">
          {totalQuantity}
        </span>
      </h4>
      <ReviewCart cart={cart} totalPrice={totalPrice} />
    </section>
  );
};

const BuyerInfo = ({ changeFormState, formState }) => (
  <section className="mt-3 mb-5">
    <h4 className="mb-3 d-flex align-items-center">
      <FaUserEdit className="mr-1" /> Informacoes do comprador
    </h4>
    <form>
      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            name="fullName"
            data-testid="checkout-fullname"
            className="form-control"
            placeholder="Nome Completo"
            onChange={changeFormState}
            value={formState.fullName}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            name="cpf"
            data-testid="checkout-cpf"
            className="form-control"
            placeholder="CPF"
            onChange={changeFormState}
            value={formState.cpf}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            name="email"
            data-testid="checkout-email"
            className="form-control"
            placeholder="Email"
            onChange={changeFormState}
            value={formState.email}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            name="phone"
            data-testid="checkout-phone"
            className="form-control"
            placeholder="Telefone"
            onChange={changeFormState}
            value={formState.phone}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <input
            type="text"
            name="cep"
            data-testid="checkout-cep"
            className="form-control"
            placeholder="CEP"
            onChange={changeFormState}
            value={formState.cep}
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="address"
            data-testid="checkout-address"
            className="form-control"
            placeholder="Endereco"
            onChange={changeFormState}
            value={formState.address}
          />
        </div>
      </div>
    </form>
  </section>
);


const PaymentInfo = ({ changeFormState, formState }) => (
  <section className="mb-5">
    <hr className="mb-4" />
    <h4 className="mb-3 d-flex align-items-center">
      <FaCreditCard className="mr-1" /> Metodo de pagamento
    </h4>
    <form value={formState.paymentMethod}>
      <div className="form-check">
        <input
          name="paymentMethod"
          className="form-check-input"
          type="radio"
          id="a"
          value="boleto"
          onChange={changeFormState}
        />
        <label className="form-check-label" htmlFor="a">Boleto</label>
      </div>
      <div className="form-check">
        <input
          name="paymentMethod"
          className="form-check-input"
          type="radio"
          id="b"
          value="visa"
          onChange={changeFormState}
        />
        <label className="form-check-label" htmlFor="b">Visa</label>
      </div>
      <div className="form-check">
        <input
          name="paymentMethod"
          className="form-check-input"
          type="radio"
          id="c"
          value="mastercard"
          onChange={changeFormState}
        />
        <label className="form-check-label" htmlFor="c">MasterCard</label>
      </div>
      <div className="form-check">
        <input
          name="paymentMethod"
          className="form-check-input"
          type="radio"
          id="d"
          value="elo"
          onChange={changeFormState}
        />
        <label className="form-check-label" htmlFor="d">Elo</label>
      </div>
    </form>
  </section>
);

//  Preciso receber como props: estado do carrinho
class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      paymentMethod: 'boleto',
    };
    this.changeFormState = this.changeFormState.bind(this);
  }

  changeFormState(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState((state) => ({ ...state, [name]: value }));
  }

  render() {
    const { cart } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-8">
            <BuyerInfo
              changeFormState={this.changeFormState}
              formState={this.state}
            />
            <PaymentInfo changeFormState={this.changeFormState} formState={this.state} />
            <button className="btn btn-primary btn-block btn-lg">Comprar</button>
          </div>
          <div className="col-4">
            <CartReview cart={cart} />
          </div>
        </div>


      </div>
    );
  }
}

export default Checkout;
