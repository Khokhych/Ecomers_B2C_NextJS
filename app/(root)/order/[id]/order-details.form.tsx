import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'

import {
  approvePayPalOrder,
  createPayPalOrder,
} from '@/lib/actions/order.actions';

return (
  <OrderDetailsTable
    order={{
      ...order,
      shippingAddress: order.shippingAddress as ShippingAddress,
    }}
    paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
  />
);