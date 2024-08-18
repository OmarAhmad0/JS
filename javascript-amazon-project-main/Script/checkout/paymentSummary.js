import {Cart} from "../../data/cart.js";
import {getProduct} from "../../data/products.js";
import {getDeliveryOption} from "../../data/deliveryOptions.js"
import {formatCurrency} from "../utils/money.js"
export function renderPaymentSummary()
{
    let productPriceCents = 0;
    let ShippingPriceCents = 0;
    let NumberOfItem = 0;

    Cart.forEach((cartitem) => 
    {
        NumberOfItem += cartitem.quantity;
     const product= getProduct(cartitem.id);
     productPriceCents += product.priceCents * cartitem.quantity;

    const deliveryOption = getDeliveryOption(cartitem.deliveryOptionId);

    ShippingPriceCents += deliveryOption.priceCents;

    });
const totalBeforeTaxCents = ShippingPriceCents + productPriceCents;

const TaxCents = totalBeforeTaxCents * 0.1;

const totalCents = totalBeforeTaxCents + TaxCents;

    const paymentSummaryHTML = 
    `
    <div class="payment-summary-title">
        Order Summary
    </div>

        <div class="payment-summary-row">
            <div>Items (${NumberOfItem}):</div>
            <div class="payment-summary-money">
            $${formatCurrency(productPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            $${formatCurrency(ShippingPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalBeforeTaxCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$
            ${formatCurrency(TaxCents)}
            </div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalCents)}
            </div>
        </div>

        <button class="place-order-button button-primary js-place-order">
            Place your order
        </button>
    
    `
    document.querySelector(`.js-payment-summary`).innerHTML = paymentSummaryHTML;
};