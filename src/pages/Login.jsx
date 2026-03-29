import { useState } from 'react';
import { supabase } from '../supabaseClient';

var NAVY = '#1B3A6B';

export default function Login() {
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  var [error, setError] = useState('');
  var [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    var result = await supabase.auth.signInWithPassword({ email: email, password: password });
    if (result.error) setError("Hmm, that didn't work. Ask a grown-up for help!");
    setLoading(false);
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#F7F9FC', padding:'1.5rem' }}>
      <div style={{ textAlign:'center', marginBottom:32 }}>
        <div style={{ fontSize:56, marginBottom:12 }}>🌟</div>
        <h1 style={{ fontSize:28, fontWeight:600, color:NAVY, marginBottom:6 }}>Hola!</h1>
        <p style={{ color:'#666', fontSize:16 }}>Sign in to continue your Spanish lessons</p>
      </div>
      <div style={{ background:'#fff', borderRadius:16, padding:'2rem', width:'100%', maxWidth:360, border:'1px solid #E0E8F4' }}>
        <form onSubmit={handleLogin} style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div>
            <label style={{ fontSize:13, color:'#555', fontWeight:500, display:'block', marginBottom:6 }}>Email</label>
            <input type="email" value={email} onChange={function(e){ setEmail(e.target.value); }} placeholder="your@email.com" required
              style={{ width:'100%', padding:'12px 14px', borderRadius:10, border:'1.5px solid #D0D8E8', fontSize:16, outline:'none', background:'#FAFBFD' }} />
          </div>
          <div>
            <label style={{ fontSize:13, color:'#555', fontWeight:500, display:'block', marginBottom:6 }}>Password</label>
            <input type="password" value={password} onChange={function(e){ setPassword(e.target.value); }} placeholder="password" required
              style={{ width:'100%', padding:'12px 14px', borderRadius:10, border:'1.5px solid #D0D8E8', fontSize:16, outline:'none', background:'#FAFBFD' }} />
          </div>
          {error && <div style={{ background:'#FFF3CD', border:'1px solid #FFD93D', borderRadius:8, padding:'10px 14px', fontSize:14, color:'#8A5700' }}>{error}</div>}
          <button type="submit" disabled={loading}
            style={{ padding:'14px', borderRadius:10, border:'none', background:loading?'#ccc':NAVY, color:'#fff', fontSize:16, fontWeight:600, cursor:loading?'not-allowed':'pointer' }}>
            {loading ? 'Signing in...' : 'Vamos!'}
          </button>
        </form>
      </div>
      <p style={{ marginTop:24, fontSize:13, color:'#999' }}>Need help? Ask a grown-up</p>
    </div>
  );
}