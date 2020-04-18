// Different game modes
//
//       
//
// 1st game => n = 2, if digit greater than 9 then it wraps around (e.g 10 gives 0, 11 - 1)
// 
//
//
//
//
//




function startGame(){


}

function select_encrpytion_scheme(){
	// be able to selete the type ofeencryption

}



function switch_role(){
	// To be able switch teams 	
}


// Generates a key based on length and digits defined by the user
function generate_key(length, digits = 1){
    numbers = []
    var i;
    for(i = 0; i < length; i++){
    	numbers.push(Math.floor(Math.random()*Math.pow(10,digits)))
      console.log(numbers)
    }
  
    return(numbers)
}


// Geneartes plaintexts based on the users inputs for length of key and digits
function generate_plaintext(length, digits = 1){
    numbers = []
    var i;
    for(i = 0; i < length; i++){
    	numbers.push(Math.floor(Math.random()*Math.pow(10,digits)))
      console.log(numbers)
    }
  
    return(numbers)
}


// Perform encrpytion scheme based on given operation and carry flag 
function perform_op(key, message, op, carry = 0){
  
    res = []
    var i  
    for(i = 0; i < key.length; i++){
        
          if(op == "+"){
         
            result = key[i] + message[i]
            if(carry){
                result = result % 10 
            }
            res.push(result)
           }
	        else if(op == "-"){
	            result = key[i] - message[i]
            		if(carry){
                	result = result % 10 
                	}
            	res.push(result)
            }
        	else if(op == "*"){
            	result = key[i] * message[i]
            	if(carry) {
                	result = result % 10 
            	}
            	res.push(result)
        	}
        	
        }
     
    return res 
  }