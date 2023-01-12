import { useNavigate } from "react-router-dom";
import { Roles } from "../../API/Types/Tipos";
import { RolFormato, RolMinimo } from "../../functions/functions";
import { useAppSelector } from "../../store/hooks";

export function ShowIfLogged({children}:{children:JSX.Element}) {
  let User = useAppSelector((state) => state.Token);

   if(User.Token.length==0||User.Token ==undefined){
    
    return <></>
   }else{
    return children
   }

   
}