import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ isAuthenticated, onSignOut, owner }) {
  const location = useLocation();
  return (
    <>
      {isAuthenticated && <button onClick={onSignOut} style={{ backgroundColor: 'red', color: 'white', padding: '8px 16px', borderRadius: '4px' , margin: '10px'}}>Sign Out</button>}

     {isAuthenticated &&
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: '8px',
        }}
      >
        <p style={{ margin: 0 }}>Owner: {owner}</p>
      </div>
      }
      <h1 className="text-4xl text-center mt-8 font-bold text-white">
        Evenity: Host Events in Decentralized Way
      </h1>
      <nav className="flex justify-center mt-4">
        <Link
          to="/"
          className={
            location.pathname === '/'
              ? 'mx-4 text-white-600 hover:text-red-900'
              : 'mx-4 text-gray-600 hover:text-gray-900'
          }
        >
          Home
        </Link>
        <Link
          to="/view-events"
          className={
            location.pathname === '/view-events'
              ? 'mx-4 text-white-600 hover:text-red-900'
              : 'mx-4 text-gray-600 hover:text-gray-900'
          }
        >
          View Events
        </Link>
        <Link
          to="/host-event"
          className={
            location.pathname === '/host-event'
              ? 'mx-4 text-white-600 hover:text-red-900'
              : 'mx-4 text-gray-600 hover:text-gray-900'
          }
        >
          Host Event
        </Link>
      </nav>
    </>
  );
}
