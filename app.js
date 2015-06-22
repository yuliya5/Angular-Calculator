var app = angular.module('app', []);

app.controller('myCtrl', ['$scope', function($scope){
	$scope.output = "0"; //will stay in the display
	$scope.newNumber = true;  //will evaluate whether to start a new number and when to concatenate 
	$scope.pendingOperation = null; //holds the pending operation so calculator knows what to do
	$scope.operationToken = ""; //bound to the view to display a token indicating the current operation
	$scope.runningTotal = null; //holds the running total as numbers are added or subtracted
	$scope.pendingValue = null; //holds the number value of the string in the display output
	
	
	//My Constants 

	var ADD = "adding";
	var ADD_TOKEN = "+";
	var SUBTRACT = "subtracting";
    var SUBTRACT_TOKEN = "-";
    var MULTIPLY = "multiplying";
	var MULTIPLY_TOKEN ="*";
    var DIVIDE = "dividing";
    var DIVIDE_TOKEN = "/";



	//This will run every time a number button is clicked. It will update the output display
	//and set a new number 

	$scope.updateOutput = function(btn){ //setting up a new function called updateOutput to update number in the window
		if($scope.output == "0" || $scope.newNumber){
			$scope.output = btn;
			$scope.newNumber = false;
		} else {
			$scope.output += String(btn); //same as $scope.output = $scope.output + String(button)
		}
		$scope.pendingValue = toNumber($scope.output);
	};

	//This will run every time the add button is clicked. If a number has been entered before the add 
	//button was clicked, set the number as a pendingValue. Here I set ADD as a pendingOperation and set the token.
	//If no number was entered but an existing calculated number is in the output display, add the last added
	//value on to the total again 

	$scope.add = function(){
        if ($scope.pendingValue) {
            if ($scope.runningTotal && $scope.pendingOperation == ADD) {
                $scope.runningTotal += $scope.pendingValue; //same as $scope.runningTotal = $scope.runningTotal + $scope.pendingValue
            } else if ($scope.runningTotal && $scope.pendingOperation == SUBTRACT) {
                $scope.runningTotal -= $scope.pendingValue; //same as $scope.runningTotal = $scope.runningTotal - $scope.pendingValue
            } else {
                $scope.runningTotal = $scope.pendingValue; //will add the last added value on to the total again 
            }
     	}
	    	setOperationToken(ADD);
			setOutput(String($scope.runningTotal));
			$scope.pendingOperation = ADD;
			$scope.newNumber = true;
			$scope.pendingValue = null;
		};

	//This will run every time the subtract button is slicked. If a number has been entered before the subtract
	//button was clicked, set the number as a pendingValue. Here I set SUBTRACT as a pendingOperation and set the token.
	//If no number was entered but an existing calculated number is in the ouptput display, subtract the last added 
	//value from the total. 

	  $scope.subtract = function() {
	        if ($scope.pendingValue) {
	            if ($scope.runningTotal && ($scope.pendingOperation == SUBTRACT)) {
	                $scope.runningTotal -= $scope.pendingValue; //same as $scope.runningTotal = $scope.runningTotal - $scope.pendingValue
	            } else if ($scope.runningTotal && $scope.pendingOperation == ADD) {
	                $scope.runningTotal += $scope.pendingValue; //same as $scope.runningTotal = $scope.runningTotal + $scope.pendingValue
	            } else {
	                $scope.runningTotal = $scope.pendingValue; //will subtract the last added value from the running total
	            }
	        }
	        setOperationToken(SUBTRACT);
	        setOutput(String($scope.runningTotal));
	        $scope.pendingOperation = SUBTRACT;
	        $scope.newNumber = true;
	        $scope.pendingValue = null;
	    };
	
	//Multiply function

	$scope.multiply = function(){
        if ($scope.pendingValue) {
            if ($scope.runningTotal && ($scope.pendingOperation == MULTIPLY)) {
                $scope.runningTotal *= $scope.pendingValue; //same as $scope.runningTotal = $scope.runningTotal + $scope.pendingValue
            } else if ($scope.runningTotal && $scope.pendingOperation == DIVIDE) {
                $scope.runningTotal /= $scope.pendingValue; //same as $scope.runningTotal = $scope.runningTotal - $scope.pendingValue
            } else {
                $scope.runningTotal = $scope.pendingValue; //will add the last added value on to the total again 
            }
     	}
	    	setOperationToken(MULTIPLY);
			setOutput(String($scope.runningTotal));
			$scope.pendingOperation = MULTIPLY;
			$scope.newNumber = true;
			$scope.pendingValue = null;
		};

	//Divide function 

	$scope.divide = function(){
        if ($scope.pendingValue) {
            if ($scope.runningTotal && ($scope.pendingOperation == DIVIDE)) {
                $scope.runningTotal /= $scope.pendingValue; //same as $scope.runningTotal = $scope.runningTotal + $scope.pendingValue
            } else if ($scope.runningTotal && $scope.pendingOperation == MULTIPLY) {
                $scope.runningTotal *= $scope.pendingValue; //same as $scope.runningTotal = $scope.runningTotal - $scope.pendingValue
            } else {
                $scope.runningTotal = $scope.pendingValue; //will add the last added value on to the total again 
            }
     	}
	    	setOperationToken(DIVIDE);
			setOutput(String($scope.runningTotal));
			$scope.pendingOperation = DIVIDE;
			$scope.newNumber = true;
			$scope.pendingValue = null;
		};



    //This will run when the eual(=) button is clicked. IF a number has been entered before the equals
	//button was clicked, it will perform the calculation based on the pendingOperation. 
	//If no number was entered but an existing calculated number is in the output display, if you hit (=) 
	//again, it will go to zero

$scope.calculate = function () {
        if (!$scope.newNumber) {
            $scope.pendingValue = toNumber($scope.output);
            $scope.lastValue = $scope.pendingValue;
        }
        	//TO ADD
        if ($scope.pendingOperation == ADD) {
            $scope.runningTotal += $scope.pendingValue;
            //TO SUBTRACT
        } else if ($scope.pendingOperation == SUBTRACT) {
            $scope.runningTotal -= $scope.pendingValue;
            //TO MULTIPLY
	    } else if ($scope.pendingOperation == MULTIPLY) {
	        $scope.runningTotal *= $scope.pendingValue;
	        //TO DIVIDE
	    } else if ($scope.pendingOperation == DIVIDE) {
	        $scope.runningTotal /= $scope.pendingValue;
	        //TO DO NOTHING    
        } else {
                $scope.runningTotal = 0;
        }
        
        setOutput($scope.runningTotal);
        setOperationToken();
        $scope.pendingOperation = null;
        $scope.pendingValue = null;
    };


	//Initializes the appropriate values when theh clear button is clicked 

	$scope.clear = function(){
		$scope.runningTotal = null;
		$scope.pendingValue = null;
		$scope.pendingOperation = null;
		setOutput("0");
	};

	//Updates the display output and resets the newNumber flag

	var setOutput = function(outputString){
		$scope.output = outputString;
		$scope.newNumber = true;
	};

	//Sets the operation token to let the user know what the pendingOperation is 

	var setOperationToken = function (operation) {
	        if (operation == ADD) {
	            $scope.operationToken = ADD_TOKEN;
	        } else if (operation == SUBTRACT) {
	            $scope.operationToken = SUBTRACT_TOKEN;
	        } else if (operation == MULTIPLY) {
	            $scope.operationToken = MULTIPLY_TOKEN;
	        } else {
	            $scope.operationToken = "";
	        }
	    };
	//This will convert a string to a number so we can perform calculations. 
	//It simply multiplies by number one to do so. 

	var toNumber = function(numberString){
		var result = 0;
		if (numberString){
			result = numberString * 1;
		}
		return result;
	};    

}]);





