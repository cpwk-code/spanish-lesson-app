import { useState, useRef, useEffect } from 'react';
import MicButton from './MicButton';
import { getSystemPrompt } from '../lessons';
var NAVY = '#1B3A6B'; var GOLD = '#F5A623';

export default function PhaseChat(props) {
  var day = props.day; var phase = props.phase;
  var savedMessages = props.savedMessages; var savedAttempts = props.savedAttempts;
  var onUpdate = props.onUpdate;

  var [messages, setMessages] = useState(savedMessages && savedMessages.length ? savedMessages : [{ role:'assistant', text:phase.prompt }]);
  var [input, setInput] = useState('');
  var [loading, setLoading] = useState(false);
  var [attempts, setAttempts] = useState(savedAttempts || 0);
  var [micError, setMicError] = useState('');
  var chatRef = useRef(null);

  useEffect(function() {
    if (chatRef.current) chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(function() {
    if (onUpdate) onUpdate({ messages: messages, attempts: attempts });
  }, [messages, attempts]);

  async function sendMessage(userText) {
    var text = userText && userText.trim();
    if (!text || loading) return;
    setMicError('');
    var newMessages = messages.concat([{ role:'user', text:text }]);
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    var newAttempts = attempts + 1;
    setAttempts(newAttempts);
    var systemPrompt = getSystemPrompt(phase, day, newAttempts);
    var apiMessages = newMessages.map(function(m) { return { role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text }; });
    try {
      var res = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ messages:apiMessages, systemPrompt:systemPrompt }) });
      var data = await res.json();
      setMessages(newMessages.concat([{ role:'assistant', text: data.reply || 'Muy bien! Keep going!' }]));
    } catch(e) {
      setMessages(newMessages.concat([{ role:'assistant', text:'Tu puedes! Try again.' }]));
    }
    setLoading(false);
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
      <div ref={chatRef} style={{ minHeight:200, maxHeight:300, overflowY:'auto', display:'flex', flexDirection:'column', gap:10, padding:'12px 16px', background:'#F7F9FC', borderRadius:10, border:'1px solid #E0E8F4' }}>
        {messages.map(function(m, i) {
          return (
            <div key={i} style={{ display:'flex', justifyContent: m.role==='user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth:'84%', padding:'10px 14px', borderRadius:12, fontSize:15, lineHeight:1.5,
                background: m.role==='user' ? NAVY : '#fff',
                color: m.role==='user' ? '#fff' : NAVY,
                border: m.role==='user' ? 'none' : '1px solid #E0E8F4',
                whiteSpace:'pre-line' }}>
                {m.text}
              </div>
            </div>
          );
        })}
        {loading && <div style={{ display:'flex', justifyContent:'flex-start' }}><div style={{ background:'#fff', border:'1px solid #E0E8F4', borderRadius:12, padding:'10px 14px', fontSize:14, color:'#888' }}>Thinking...</div></div>}
      </div>
      <div style={{ background: GOLD+'18', border:'1px solid '+GOLD+'55', borderRadius:8, padding:'8px 14px', fontSize:13, color:'#6B4A00' }}>{phase.hint}</div>
      {micError && <div style={{ background:'#FFF3CD', border:'1px solid #FFD93D', borderRadius:8, padding:'8px 12px', fontSize:13, color:'#8A5700' }}>{micError}</div>}
      <div style={{ display:'flex', gap:8 }}>
        <input value={input} onChange={function(e){ setInput(e.target.value); }}
          onKeyDown={function(e){ if(e.key==='Enter') sendMessage(input); }}
          placeholder="Type your Spanish answer..." disabled={loading}
          style={{ flex:1, padding:'12px 14px', borderRadius:10, border:'1.5px solid #D0D8E8', fontSize:15, outline:'none', background:'#FAFBFD' }} />
        <MicButton onResult={function(t){ sendMessage(t); }} onError={function(m){ setMicError(m); }} disabled={loading} />
        <button onClick={function(){ sendMessage(input); }} disabled={loading || !input.trim()}
          style={{ padding:'12px 18px', borderRadius:10, border:'none', background: input.trim()&&!loading ? NAVY : '#CDD4E0', color:'#fff', fontSize:15, fontWeight:500, cursor: input.trim()&&!loading ? 'pointer' : 'not-allowed' }}>
          Send
        </button>
      </div>
      <div style={{ fontSize:12, color:'#999', textAlign:'right' }}>Attempts: {attempts}</div>
    </div>
  );
}