module.exports = function Cart(oldCart) {
    this.date = Date.now();
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
  
    this.add = function (item, id, size) {
      let sizes = [];
      let newSize = [];
      let storedItem = this.items[id];
      if (!storedItem) {
        sizes.push(size);
        storedItem = this.items[id] = { item, qty: 0, price: 0, newSize };
      }
  
      storedItem.qty++;
      storedItem.price = storedItem.item.product.price * storedItem.qty;
      if (size) storedItem.newSize = [...storedItem.newSize, size];
      else
      {
        i = storedItem.newSize.length -1 ;
        storedItem.newSize = [...storedItem.newSize,storedItem.newSize[i] ];
      }
      console.log(storedItem.newSize);
      this.totalQty++;
      this.totalPrice += parseInt(storedItem.item.product.price);
    };
  
    this.reduceOne = function (id) {
      this.items[id].qty--;
      this.items[id].price -= this.items[id].item.product.price;
      this.items[id].newSize.splice(0, 1);
      this.totalQty--;
      this.totalPrice -= this.items[id].item.product.price;
      console.log(this.items[id].newSize);
  
      if (this.items[id].qty <= 0) delete this.items[id];
    };
  
    this.removeAll = function (id) {
      this.totalQty -= this.items[id].qty;
      this.totalPrice -= this.items[id].price;
      delete this.items[id];
    };
  
    this.generateArray = function () {
      let arr = [];
      for (let id in this.items) arr.push(this.items[id]);
      return arr;
    };
};
  