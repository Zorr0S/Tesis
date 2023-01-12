import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import ImageIcon from "@mui/icons-material/Image";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LinkIcon from "@mui/icons-material/Link";
import { Box } from "@mui/material";
import IconoDoc from "../../assets/Document.ico";
import IconoAudio from "../../assets/Audio.ico";
import IconoVideo from "../../assets/Video.ico";
type ElementoProp = {
  tipo: string;
};
// export function MaterialElemento(Props: ElementoProp) {

//   if (Props.tipo === "Documento") {
//     return <PictureAsPdfIcon  />;
//   } else if (Props.tipo === "Imagen") {
//     return <ImageIcon  />;
//   } else if (Props.tipo === "Video") {
//     return <VideoLibraryIcon />;
//   } else if (Props.tipo === "Audio") {
//     return <AudioFileIcon  />;
//   } else {
//     return <LinkIcon  />;
//   }
//   return <LinkIcon />;
// }

export function MaterialElemento(Props: ElementoProp) {
  if (Props.tipo === "Documento") {
    return <Box sx={{width:"2rem"}}component={"img"} src={IconoDoc}/>;
  } else if (Props.tipo === "Imagen") {
    return <ImageIcon  />;
  } else if (Props.tipo === "Video") {
    return <Box sx={{width:"2rem"}}component={"img"} src={IconoVideo}/>;
  } else if (Props.tipo === "Audio") {
    return <Box sx={{width:"2rem"}}component={"img"} src={IconoAudio}/>;
  } else {
    return <LinkIcon />;
  }
  return <LinkIcon />;
}
