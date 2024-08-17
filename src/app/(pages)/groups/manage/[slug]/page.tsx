import React from 'react';
import ClientPage from './clientpage'

interface GroupViewerPageProps {
  params: {
    slug: string;
  };
}

const GroupViewerPage = ({ params: { slug } }: GroupViewerPageProps) => {
   

    // website:3000/groups/12 

    const id = decodeURI(slug); 
    console.log("ID FROM SLUG URL: ", id);

    /*
        <p>
      Group ID: <strong>{decodeURI(slug)}</strong>  
    </p>
    */
  return (
    <ClientPage groupId={id} />
  );
};

export default GroupViewerPage;