// import React from 'react';
// import { Breadcrumb, Col, Row } from 'antd';
// import { NavLink, useLocation, useParams, useMatch } from 'react-router-dom';

// /**
//  * This component uses react-router-dom
//  * (should be used inside a Provider)
//  */
// const Breadcrumbs = () => {
//   const capitalizeChar = (str) => {
//     return str.charAt(0).toUpperCase() + str.slice(1); // Fix the syntax error here
//   };
//   const location = useLocation();
//   const params = useParams();
//   const match = useMatch('/company-projects');
//   console.log("paramssss", params)
//   console.log("locaaaa", location)
//   const pathSnippets = location.pathname.split('/').filter((i) => i);
//   const breadcrumbItems = pathSnippets.map((snippet, index) => {
//     const url = `/${pathSnippets.slice(0, index + 1).join('/')}`; // Fix the syntax error here
//     const title = snippet.replace(/-/g, ' ');
//     return (
//       <Breadcrumb.Item key={url}>
//         <NavLink to={url}>{capitalizeChar(title)}</NavLink>
//       </Breadcrumb.Item>
//     );
//   });

//   return (
//     <Row>
//       <Col className="flex items-center gap-2 p-4">
//         <Breadcrumb>
//           <Breadcrumb.Item>
//             <NavLink to="/">Home</NavLink>
//           </Breadcrumb.Item>
//           {breadcrumbItems}
//         </Breadcrumb>
//       </Col>
//     </Row>
//   );
// };

// export default Breadcrumbs ;

import React from 'react';
import { Breadcrumb, Col, Row } from 'antd';
import { NavLink, useLocation, useParams, useMatch} from 'react-router-dom';

const Breadcrumbs = () => {
  const capitalizeChar = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const location = useLocation();
  const params = useParams();
  console.log("paramssss", params);

  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const breadcrumbItems = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const title = snippet.replace(/-/g, ' ');
    if(index%2 == 0){
      return (
        <Breadcrumb.Item key={url} >
          <NavLink to={url} style={{fontWeight: index === pathSnippets.length - 1 ? 'light' : 'bold', fontSize:"16px"}}>{capitalizeChar(title)}</NavLink>
        </Breadcrumb.Item>
      );
    }
  });

  return (
  
        <Breadcrumb style={{ margin: '16px 0' }}>
          {breadcrumbItems}
        </Breadcrumb>
   
  );
};

export default Breadcrumbs;
