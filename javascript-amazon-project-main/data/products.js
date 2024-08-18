import {formatCurrency} from  "../Script/utils/money.js";


export function getProduct(productId)
{
  let matchingProduct ;
  products.forEach((product) =>
  {
    if(product.id === productId)
    {
      matchingProduct = product;
    }
  });
  return matchingProduct;
};


class Products
{
  constructor(productDetails)
  {
  this.id = productDetails.id;
  this.image = productDetails.image;
  this.name = productDetails.name;
  this.rating = productDetails.rating;
  this.priceCents = productDetails.priceCents;    
  }
  id;
  image;
  name;
  rating;
  priceCents;

  GetStartsUrl()
  {
    return`images/ratings/rating-${this.rating.stars * 10}.png`;
  }
  GetPrice()
  {
    return `$${formatCurrency(this.priceCents)}`;
  }
  extraInfoHTML()
  {
    return ``;
  }

}

class Clothing extends Products
{
  sizeChartLink;
  
  constructor(productDetails)
  {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }
  extraInfoHTML()
  {
    return `<a href="${this.sizeChartLink}" target="_blnak">Size chart</a>`;
  }

}

export let products = [];


export function LoadProductsFetch()
{
 const promise =  fetch(
  "https://supersimplebackend.dev/products"
).
  then((response)=>
  {
    return response.json();
  }).then((productData)=>
  {
    products = productData.map((productData)=>
    {
      if(productData.type === 'clothing')
      {
        return new Clothing(productData)
      }
       return new Products(productData);
    });
  });
  return promise;

}



export function LoadProducts(fun)
{
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load',()=>
  {
    products = JSON.parse( xhr.response).map((productDetails)=>
    {
      if(productDetails.type === 'clothing')
      {
        return new Clothing(productDetails)
      }
       return new Products(productDetails);
    });
    fun();
  });

  
  xhr.open("GET","https://supersimplebackend.dev/products")
  xhr.send();

}