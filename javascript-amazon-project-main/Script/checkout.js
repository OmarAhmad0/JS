import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {LoadProductsFetch} from "../data/products.js"


async function LoadPage()
{
    try
    {
        await LoadProductsFetch();
        renderOrderSummary();
        renderPaymentSummary();
    
    } 
    catch (error)
    {
        console.log(error)    
    }
}
LoadPage();