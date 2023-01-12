//const DominioIP= "http://localhost:3000"
const  DominioIP = "http://108.175.3.254:3000"
let Dominio:string = `${DominioIP}/archivo/ver/`
// Dominio: string = "http://108.175.3.254:3000/archivo/ver/";


export type TOKEN={ Correo: string, ID: number}

export let ACCESS_TOKEN_SECRET='3f72c738d378c2b14e4a13b853559852497fd06b6faa71441deefdfb00943287700c298db1ddff846f85f6b797e771522ec055f6d8427b7003910d2efdaa9e6e';
export let REFRESH_TOKEN_SECRET='0887efa4968f194e927723bf051e3f7d7a419e7ce7b520e9ca1ef4c930e8b735a599decd241100ad46671e4992634d828bb55bd2c8c2a2392a729119a731b92b';
export {Dominio,DominioIP}