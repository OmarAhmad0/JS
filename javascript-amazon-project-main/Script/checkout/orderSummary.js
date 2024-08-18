import {Cart , RemoveFromCart ,updateDelivreyOption} from "../../data/cart.js";
import {products ,getProduct} from "../../data/products.js";
import {formatCurrency} from "../utils/money.js";
import  dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryOptions, getDeliveryOption} from "../../data/deliveryOptions.js"
import { renderPaymentSummary } from "./paymentSummary.js";


export function renderOrderSummary()
{
  let cartSummaryHTML = ``;

  Cart.forEach((cratItem) =>
  {
      const productId = cratItem.id;
      const matchingProduct  = getProduct(productId);
      
        const deliveryOptionId = cratItem.deliveryOptionId;


        const deliveryOption = getDeliveryOption(deliveryOptionId);


        const today = dayjs();
        const deliveryDay = today.add(deliveryOption.deliveryDays, "days");
        const dateString = deliveryDay.format(`dddd, MMMM D`);

        
      cartSummaryHTML += `
              <div class="cart-item-container 
              js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
              Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
              <img class="product-image"
                  src="${matchingProduct.image}">

              <div class="cart-item-details">
                  <div class="product-name">
                  ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                  ${matchingProduct.GetPrice()}
                  </div>
                  <div class="product-quantity">
                  <span>
                      Quantity: <span class="quantity-label">${cratItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                      Update
                  </span>
                  <span class="delete-quantity-link link-primary 
                  js-delete-link" data-product-id="${matchingProduct.id}">
                      Delete
                  </span>
                  </div>
              </div>
              <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                      ${deliveryOptionsHTML(matchingProduct,cratItem)}
                  </div>
              </div>
          </div>  
      `
  });


  function deliveryOptionsHTML(matchingProduct ,cratItem) {
      let HTML = ``;
      deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDay = today.add(deliveryOption.deliveryDays, "days");
        const dateString = deliveryDay.format(`dddd, MMMM D`);
    
        const priceString = deliveryOption.priceCents === 0 ? 'FREE ' : `$${formatCurrency(deliveryOption.priceCents)} - `;
        const IsCheked =  deliveryOption.id === cratItem.deliveryOptionId;

        HTML += `
          <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
            ${IsCheked ? `checked` : ``}
                  class="delivery-option-input"
                  name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping 
              </div>
            </div>
          </div>
        `;
      });
      return HTML;
    }

  document.querySelector(`.js-order-summary`).innerHTML = cartSummaryHTML;
  document.querySelectorAll(`.js-delete-link`).forEach((link) =>
  {
      link.addEventListener(`click`,()=>{
          const productId = link.dataset.productId;
        // console.log(productId);
        RemoveFromCart(productId);
        const container = document.querySelector(`.js-cart-item-container-${productId}`)
        container.remove();
        renderPaymentSummary();

      });
  });

  document.querySelectorAll(`.js-delivery-option`).forEach((element) => 
  {
    element.addEventListener(`click`,()=>{
      const {productId, deliveryOptionId} = element.dataset;
      updateDelivreyOption(productId, deliveryOptionId);
      renderOrderSummary();     
      renderPaymentSummary(); 
    });
  });
}
