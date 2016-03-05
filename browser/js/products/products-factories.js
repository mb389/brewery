app.factory('ProductFactory',function($http) {

  var obj={};
  var cachedProducts=[];

  obj.getOneProduct = function(id) {
      return $http.get('/api/products/'+id)
      .then(res => res.data);
  }

  obj.getAllProducts = function() {
    return $http.get('/api/products/')
    .then(res => {
      angular.copy(res.data, cachedProducts);
      cachedProducts.forEach(function(el) {
        while (el.picture.length<3)
          el.picture.push("http://lorempixel.com/300/300/food/");
      });
      return cachedProducts;
    });
  }

  obj.getByCategory = function(category) {
    return $http.get('/api/products/category/'+category)
    .then(res => res.data);
  }

  obj.getCategoryNames = function() {
    return $http.get('/api/categories/names')
    .then(res => res.data);
  }

  obj.getCategories = function () {
    return $http.get('/api/categories/')
    .then(res => res.data)
  }

  obj.editProductDetails = function(id, body) {
    return $http.put('/api/products/'+id, body)
    .then(res => res.data);
  }

  obj.addProduct = function(newProd) {
    return $http.post('/api/products/',newProd)
    .then(res => res.data);
  }

  obj.removeProduct = function(id) {
    return $http.delete('/api/products/'+id)
    .then(res => res.data);
  }

  return obj;
});
