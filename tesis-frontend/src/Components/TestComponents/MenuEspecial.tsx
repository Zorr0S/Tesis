// import * as React from 'react';
// import { styled, alpha } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import Menu, { MenuProps } from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import EditIcon from '@mui/icons-material/Edit';
// import Divider from '@mui/material/Divider';
// import ArchiveIcon from '@mui/icons-material/Archive';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// // const StyledMenu = styled((props: MenuProps) => (
// //   <Menu
// //     elevation={0}
// //     anchorOrigin={{
// //       vertical: 'bottom',
// //       horizontal: 'right',
// //     }}
// //     transformOrigin={{
// //       vertical: 'top',
// //       horizontal: 'right',
// //     }}
// //     {...props}
// //   />
// // ))(({ theme }) => ({
// //   '& .MuiPaper-root': {
// //     borderRadius: 6,
// //     marginTop: theme.spacing(1),
// //     minWidth: 180,
// //     color:
// //       theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
// //     boxShadow:
// //       'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
// //     '& .MuiMenu-list': {
// //       padding: '4px 0',
// //     },
// //     '& .MuiMenuItem-root': {
// //       '& .MuiSvgIcon-root': {
// //         fontSize: 18,
// //         color: theme.palette.text.secondary,
// //         marginRight: theme.spacing(1.5),
// //       },
// //       '&:active': {
// //         backgroundColor: alpha(
// //           theme.palette.primary.main,
// //           theme.palette.action.selectedOpacity,
// //         ),
// //       },
// //     },
// //   },
// // }));

// export default function CustomizedMenus() {
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <Button
//         id="demo-customized-button"
//         aria-controls={open ? 'demo-customized-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         variant="contained"
//         color="error"
//         disableElevation
//         onClick={handleClick}
//         endIcon={<KeyboardArrowDownIcon />}
//       >
//         Options
//       </Button>
//       <Menu
//         id="demo-customized-menu"
//         MenuListProps={{
//           'aria-labelledby': 'demo-customized-button',
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={handleClose} disableRipple>
//           <EditIcon />
//           Edit
//         </MenuItem>
       
//         <Divider sx={{ my: 0.5 }} />
        
//       </Menu>
//     </div>
//   );
// }


import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Container, Grid, Paper, useMediaQuery } from "@mui/material";

import { useState } from "react";

const LIMIT_MOBILE = 3;
const LIMIT_WEB = 6;

export const Limitador = () => {
  const inititalLimit =  LIMIT_WEB;

  const [limit, setLimit] = useState(inititalLimit);


  const showMoreDocuments = () => {
    setLimit(limit + 3);
  };

  const renderRowsWithItem = (
    documentData: {
      fileName: string;
      description: string;
      contentUrl: string;
    }[]
  ) => {
    return documentData.slice(0, limit).map((documentsRow, i) => {
      return (
        <Grid item xs={12} sm={4}>
          <Paper >{documentsRow.fileName}</Paper>
        </Grid>
      );
    });
  };

  const renderDocuments = (
    documentData: {
      fileName: string;
      description: string;
      contentUrl: string;
    }[]
  ) => {
    return (
      <Grid container spacing={1}>
        {renderRowsWithItem(documentData)}
        <Grid container item xs={12}>
          <Button
            endIcon={<KeyboardArrowDownIcon />}
            onClick={showMoreDocuments}
          >
            show more documents
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <Container >
      {renderDocuments(DOCUMENTS_MOCK_DATA)}
    </Container>
  );
};


export const DOCUMENTS_MOCK_DATA = [
  {
    fileName: "This is document long filename 1",
    description:
      "This is document long description.This is document long description.This is document long description.This is document long description.This is document long description.",
    contentUrl: "http://www.africau.edu/images/default/sample.pdf"
  },
  {
    fileName: "This is document long filename 2",
    description:
      "This is document long description.This is document long description.This is document long description.This is document long description.This is document long description.",
    contentUrl: "http://www.africau.edu/images/default/sample.pdf"
  },
  {
    fileName: "This is document long filename 3",
    description:
      "This is document long description.This is document long description.This is document long description.This is document long description.This is document long description.",
    contentUrl: "http://www.africau.edu/images/default/sample.pdf"
  },
  {
    fileName: "This is document long filename 4",
    description:
      "This is document long description.This is document long description.This is document long description.This is document long description.This is document long description.",
    contentUrl: "http://www.africau.edu/images/default/sample.pdf"
  },
  {
    fileName: "This is document long filename 5",
    description:
      "This is document long description.This is document long description.This is document long description.This is document long description.This is document long description.",
    contentUrl: "http://www.africau.edu/images/default/sample.pdf"
  },
  {
    fileName: "This is document long filename 6",
    description:
      "This is document long description.This is document long description.This is document long description.This is document long description.This is document long description.",
    contentUrl: "http://www.africau.edu/images/default/sample.pdf"
  },
  {
    fileName: "This is document long filename 7",
    description:
      "This is document long description.This is document long description.This is document long description.This is document long description.This is document long description.",
    contentUrl: "http://www.africau.edu/images/default/sample.pdf"
  },
  {
    fileName: "This is document long filename 8",
    description:
      "This is document long description.This is document long description.This is document long description.This is document long description.This is document long description.",
    contentUrl: "http://www.africau.edu/images/default/sample.pdf"
  },
  {
    fileName: "This is document long filename 9",
    description:
      "This is document long description.This is document long description.This is document long description.This is document long description.This is document long description.",
    contentUrl: "http://www.africau.edu/images/default/sample.pdf"
  },
  {
    fileName: "This is document long filename 10",
    description:
      "This is document long description.This is document long description.This is document long description.This is document long description.This is document long description.",
    contentUrl: "http://www.africau.edu/images/default/sample.pdf"
  },
  {
    fileName: "This is document long filename 11",
    description:
      "This is document long description.This is document long description.This is document long description.This is document long description.This is document long description.",
    contentUrl: "http://www.africau.edu/images/default/sample.pdf"
  },
  {
    fileName: "This is document long filename 12",
    description:
      "This is document long description.This is document long description.This is document long description.This is document long description.This is document long description.",
    contentUrl: "http://www.africau.edu/images/default/sample.pdf"
  },
  {
    fileName: "This is document long filename 13",
    description:
      "This is document long description.This is document long description.This is document long description.This is document long description.This is document long description.",
    contentUrl: "http://www.africau.edu/images/default/sample.pdf"
  }
];
