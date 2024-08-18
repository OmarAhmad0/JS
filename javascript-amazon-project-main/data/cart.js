export let Cart;
LoadFronStorage();
export function LoadFronStorage()
{
    Cart = JSON.parse(sessionStorage.getItem(`Cart`)); 

if(!Cart)
{
    Cart = [{
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity : 2,
        deliveryOptionId : "1"
    },
    {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity : 1,
        deliveryOptionId : "2"
    }
    ];
}
}


export function SaveToStorge()
{
    sessionStorage.setItem(`Cart`,JSON.stringify(Cart));
}

export function AddToCart( productId)
{
    let matchingItem;

    Cart.forEach((cartitem) =>
        {
            if(productId === cartitem.id)
            {
                matchingItem = cartitem;
            }
        });

        if(matchingItem)
        {
            matchingItem.quantity += 1;
        }
        else
        {
            Cart.push(
            {
                id : productId,
                quantity : 1,
                deliveryOptionID : "1"
            }
            )
        }
        SaveToStorge();
}


export function RemoveFromCart(productId)
{
    const NewCart = [];
    Cart.forEach((CartItem)=>
    {
        if(CartItem.id !== productId)
        {
            NewCart.push(CartItem);
        }
    });
    Cart = NewCart;
    SaveToStorge();
};

export function updateDelivreyOption(productId, deliveryOptionId)
{
    let matchingItem;

    Cart.forEach((cartitem) =>
        {
            if(productId === cartitem.id)
            {
                matchingItem = cartitem;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;
        
        SaveToStorge();
}