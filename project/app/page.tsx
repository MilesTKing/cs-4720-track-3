import {getInventory} from './actions'
import OrderForm from './OrderForm'
const initialState = {
    success: false,
    message: ""
}

export default async function Home() {
    const orders = await getInventory();
  return (
      <div>
          <h1>Miles's Auto Parts</h1>
          <OrderForm></OrderForm>
          <br/>
          <h1>Inventory</h1>
          <table className="border border-black border-collapse mt-2">
              <thead>
              <tr>
                  <th className="border border-black px-2">ID</th>
                  <th className="border border-black px-2">Wheels</th>
                  <th className="border border-black px-2">Windshield Wipers</th>
                  <th className="border border-black px-2">Radios</th>
              </tr>
              </thead>

              <tbody>
              {orders.map((order) => (
                  <tr key={order.id}>
                      <td className="border border-black px-2">{order.id}</td>
                      <td className="border border-black px-2">{order.wheels}</td>
                      <td className="border border-black px-2">
                          {order.windshield_wipers}
                      </td>
                      <td className="border border-black px-2">{order.radios}</td>
                  </tr>
              ))}
              </tbody>
          </table>

      </div>
  );
}
