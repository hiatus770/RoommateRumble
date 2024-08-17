import React from 'react';

interface ErrorPageProps {
  params: {
    slug: string;
  };
}

const ErrorPage = ({ params: { slug } }: ErrorPageProps) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#800000',
    color: 'white',
    flexDirection: 'column' as 'column',
  };

  const headerStyle = {
    fontSize: '2rem',
    marginBottom: '1rem',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Error Page</h1>
      <p>
        ERROR: <strong>{decodeURI(slug)}</strong>
      </p>
    </div>
  );
};

export default ErrorPage;