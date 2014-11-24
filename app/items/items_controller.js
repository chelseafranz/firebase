(function() {
	angular.module('Items').controller('ItemsList', ['$scope', 'FIREBASE_URL', '$firebase', function ($scope, FIREBASE_URL, $firebase){

		var itemsRef= new Firebase(FIREBASE_URL + 'items');
		//create new instance of a reference to firebase--lets you create many refs to different firebase endpoints ( rather than mutating main firebase object)--would normally go in a factory
		// + items creates a new url for all item

		$scope.items= $firebase(itemsRef).$asArray();
		//tells firebase to return info as an array

		$scope.title= 'List of Items';
		

		// $scope.addItem= function(item){
		// 	$scope.items.push(item);
		// 	$('#addForm')[0].reset();
		// }

		$scope.addItem= function(item){
			$scope.items.$add(item); //rather than using push, must use firebase's method
			$('#addForm')[0].reset();
		};

		$scope.deleteItem=function(item){
			$scope.items.$remove(item);
		};
	}])
}());