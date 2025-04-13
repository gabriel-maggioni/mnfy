
import {randomInt} from "crypto";

function getRandomChar():string{
    const charset:string = "abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ç!@ã="
    const index:number = randomInt(0, charset.length);
    return charset[index];
}

function generateRandomID(length:number = 7){ // 67^7 = 6.060.711.605.323
    return Array.from({length}, getRandomChar).join("");
}

 export default generateRandomID;