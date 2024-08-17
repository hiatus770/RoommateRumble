import React from 'react';

interface GroupViewerPageProps {
  params: {
    slug: string;
  };
}

const GroupViewerPage = ({ params: { slug } }: GroupViewerPageProps) => {
   

    // website:3000/groups/12 

    const id = decodeURI(slug); 
    console.log("ID FROM SLUG URL: ", id);

  return (
    <p>
      Group ID: <strong>{decodeURI(slug)}</strong>  
    </p>
  );
};

export default GroupViewerPage;