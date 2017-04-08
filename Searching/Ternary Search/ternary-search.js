/*
Simple Ternary Search Implementation

Find the maximum value in a strictly increasing and then strictly decreasing list
N.B.- This method won't work if the list does not represent an unimodal function
e.g. if the maximum value present in the first or last index of the list
*/
function simpleTernarySearch(itemList){
    var left = 0, right = itemList.length - 1;

    var found = false;
    var precision = 3;

    while(left <= right){
        if((right - left) < precision){ //Here 3 is the smallest range to divide the left and right value
            found = true;
            break;
        }

        var leftThird = left + Math.floor((right - left)/3);
        var rightThird = right - Math.floor((right - left)/3);

        //To find the minimum in an unimodal function change the following comparison to >
        if(itemList[leftThird] < itemList[rightThird])
            left = leftThird;
        else
            right = rightThird;
    }

    return Math.floor((left + right)/2);
}

/*
Find maximum of unimodal function func() within [left, right]
To find the minimum, reverse the if/else statement or reverse the comparison.
*/
function ternarySearch(func, left, right, absolutePrecision){
    while(true){
        //left and right are the current bounds. the maximum is between them
        if(Math.abs(right - left) < absolutePrecision){
            return Math.floor((left + right)/2);
        }

        var leftThird = left + (right - left)/3;
        var rightThird = right - (right - left)/3;

        if(func(leftThird) < func(rightThird))
            left = leftThird;
        else
            right = rightThird;
    }
}

/*
Recursive Ternary Search Implementation
*/

function ternarySearchRecursive(func, left, right, absolutePrecision){

    //left and right are the current bounds. the maximum is between them
    if(Math.abs(right - left) < absolutePrecision)
        return Math.floor((left + right)/2);

    var leftThird = (2*left + right)/3;
    var rightThird = (left + 2*right)/3;

    if(func(leftThird) < func(rightThird))
        return ternarySearch(func, leftThird, right, absolutePrecision);
    else
        return ternarySearch(func, left, rightThird, absolutePrecision);
}



/********************* Testing Ternary Search Implementation ***********************/

// This list must be sorted. If it is not given as sorted, sort it first, then call the binarySearch method
var testList = [1, 50, 20, 10, 2, 1];
var index = simpleTernarySearch(testList);
console.log(testList[index]);

var func = function(x){
    return (-1*1*x*x + 2*x +3); // (-a*x*x + b*x + c) is an unimodal function, here a = 1, b = 2, c = 3
};

result = ternarySearch(func, 0, 1, 1e-6);
console.log(func(result));

result = ternarySearchRecursive(func, 0, 1, 1e-6);
console.log(func(result));
