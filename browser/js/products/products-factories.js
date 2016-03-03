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
      return cachedProducts;
    });
  }

  obj.getByCategory = function(category) {
    return $http.get('/api/products/category'+category)
    .then(res => res.data);
  }

  obj.editProductDetails = function(id) {
    return $http.put('/api/products/'+id)
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
