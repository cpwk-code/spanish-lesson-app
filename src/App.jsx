import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Login from './pages/Login';
import Lesson from './pages/Lesson';

export default function App() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(function(r) { setSession(r.data.session); });
    var sub = supabase.auth.onAuthStateChange(function(_e, s) { setSession(s); });
    return function() { sub.data.subscription.unsubscribe(); };
  }, []);

  if (session === undefined) {
    return React.createElement('div', { style: { display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh' } },
      React.createElement('div', { style: { fontSize: 32 } }, '🌟')
    );
  }

  return (
    React.createElement(Routes, null,
      React.createElement(Route, { path: '/login', element: !session ? React.createElement(Login) : React.createElement(Navigate, { to: '/' }) }),
      React.createElement(Route, { path: '/', element: session ? React.createElement(Lesson, { session: session }) : React.createElement(Navigate, { to: '/login' }) })
    )
  );
}