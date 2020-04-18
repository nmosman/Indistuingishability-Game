import random
from random import randrange 
from random import choice
from string import ascii_uppercase


def generate_key(length, digits = 1):
    #return(''.join( str(random.randint(0,1)) for i in range(length)))
    numbers = []
    for i in range(length):
        numbers.append(random.randint(0,(10**digits)-1))
    return(numbers)
                       
def generate_plaintext(length, digits = 1):
    numbers = []
    for i in range(length):
        numbers.append(random.randint(0,(10**digits)-1))
    return(numbers)

def perform_op(key, message, op, carry = 0):
  
    res = [] 
    for i in range(len(key)):
        
        if(op == "+"):
            print("eyyyyyyyyyyyyyyy")
            result = key[i] + message[i]
            print(result)
            if(carry):
                result = result % 10 
            res.append(result)
            
        elif(op == "-"):
            result = key[i] - message[i]
            if(carry):
                result = result % 10 
            res.append(result)
            
        elif(op == "*"):
            result = key[i] * message[i]
            if(carry):
                result = result % 10 
            res.append(result)
    return res 
  
plaintexts = (generate_plaintext(10), generate_plaintext(10))
b = random.randrange(0,2)

selected_text = plaintexts[b]
otp = generate_key(10)

print("key:" + str(otp))
print("b:" + str(b))
print("m0: " + str(plaintexts[0]))
print("m1: " + str(plaintexts[1]))
print("selected message" + str(selected_text))

print("\n\nmessage operation")
print(perform_op(otp, selected_text, "+", 1)) 
