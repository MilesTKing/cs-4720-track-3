import { neon } from '@neondatabase/serverless';
import {sendForm, getInventory} from './actions'
export default async function Home() {
    const orders = await getInventory();
    const order_list = orders.map(order => {
        <li>id: ${order.id}, wheels: ${order.wheels} windshield wipers: ${order.windshield_wipers}, radios: ${order.radios}</li>
    })
  return (
      <div>
          <h1>Miles's Auto Parts</h1>
          <form action={sendForm}>
              <input type='text' id={'wheels'} name={'wheels'}></input>
              <label htmlFor={'wheels'}>Wheels</label>
              <input type='text' id={'windshield-wipers'} name={'windshield-wipers'}></input>
              <label htmlFor={'windshield-wipers'}>Windshield Wipers</label>
              <input type='text' id={'radios'} name={'radios'}></input>
              <label htmlFor={'radios'}>Radios</label>
              <input type={'submit'} value={'Submit'}></input>
          </form>
          <br/>
          <h1>Inventory</h1>
          <ol>
              {orders.map(order => (
                  <li key={order.id}>id: {order.id}, wheels: {order.wheels} windshield wipers: {order.windshield_wipers}, radios: {order.radios}</li>
                  ))}
          </ol>

      </div>
  );
}
