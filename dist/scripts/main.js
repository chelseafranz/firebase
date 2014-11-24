(function() {

angular.module('Items', ['ngRoute', 'firebase'])
.constant('FIREBASE_URL', 'https://chelseascoolnewapp.firebaseio.com/');
//MAKES URL AVAILABLE ANYWHERE








}());
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
(function() {
	angular.module('Items').controller('UserController', ['$scope', '$firebaseAuth', 'FIREBASE_URL', function  ($scope, $firebaseAuth, FIREBASE_URL) {

		var usersRef= new Firebase(FIREBASE_URL);

		$scope.authObj= $firebaseAuth(usersRef);
		//creates authentication object

		$scope.register = function(newUser){
			$scope.authObj.$createUser(newUser.email,newUser.password)
			.then( function(){
				$scope.login(newUser)
			}).catch( function(error){
				console.log('this is an error', error);
			});
		};

		$scope.login= function(user){
			$scope.authObj.$authWithPassword({
				email: user.email,
				password: user.password
			}).then( function(){
				$scope.checkUser();
			}).catch( function(error){
				alert(error.message);
			})
		};

		$scope.checkUser = function(){
			var authData= $scope.authObj.$getAuth();
			$('#userForm')[0].reset;
			if(authData){
				console.log( 'User logged in as ' + authData.password.email)
			}else{
				console.log('no one is logged in');
			}
		}
	}])
}());