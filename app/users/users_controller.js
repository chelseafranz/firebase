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