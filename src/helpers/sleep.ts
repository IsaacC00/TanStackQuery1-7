
//? funcion que permite relentizar cualquier respueta que desee 
export const sleep = (miliseconds: number) => {
  return new Promise( result => {
    setTimeout( () => {
        result(true)
    }, miliseconds)
  }) 
}
