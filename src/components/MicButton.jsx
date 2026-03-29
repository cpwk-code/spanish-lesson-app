import { useState, useRef } from 'react';
var NAVY = '#1B3A6B'; var TEAL = '#00B4A6';

export default function MicButton(props) {
  var onResult = props.onResult; var onError = props.onError; var disabled = props.disabled;
  var [state, setState] = useState('idle');
  var mediaRef = useRef(null);
  var chunksRef = useRef([]);

  async function handlePress() {
    if (state === 'recording') { if (mediaRef.current) mediaRef.current.stop(); return; }
    try {
      var stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      var recorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
      chunksRef.current = [];
      recorder.ondataavailable = function(e) { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = function() {
        stream.getTracks().forEach(function(t) { t.stop(); });
        setState('processing');
        var blob = new Blob(chunksRef.current, { type: 'audio/webm;codecs=opus' });
        var reader = new FileReader();
        reader.onloadend = async function() {
          var base64 = reader.result.split(',')[1];
          try {
            var res = await fetch('/api/speech', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ audioBase64: base64 }) });
            var data = await res.json();
            if (data.transcript) { onResult(data.transcript); }
            else { if (onError) onError('Could not understand. Try speaking more clearly!'); }
          } catch(err) { if (onError) onError('Something went wrong. Try again!'); }
          setState('idle');
        };
        reader.readAsDataURL(blob);
      };
      mediaRef.current = recorder;
      recorder.start();
      setState('recording');
      setTimeout(function() { if (mediaRef.current && mediaRef.current.state === 'recording') mediaRef.current.stop(); }, 10000);
    } catch(err) {
      console.error('Mic error:', err);
      if (onError) onError('Microphone not available. Check Chrome permissions.');
      setState('idle');
    }
  }

  var bg = state === 'recording' ? '#FFE8E8' : state === 'processing' ? '#E8F7F6' : '#fff';
  var border = state === 'recording' ? '1.5px solid #E24B4A' : state === 'processing' ? ('1.5px solid ' + TEAL) : ('1.5px solid ' + NAVY);
  var color = state === 'recording' ? '#E24B4A' : state === 'processing' ? TEAL : NAVY;
  var label = state === 'recording' ? 'Stop' : state === 'processing' ? '...' : 'Mic';

  return (
    <button onClick={handlePress} disabled={disabled || state === 'processing'}
      style={{ padding:'12px 16px', borderRadius:10, background:bg, border:border, color:color,
        fontSize:14, fontWeight:500, cursor:disabled||state==='processing'?'not-allowed':'pointer', minWidth:64 }}>
      {state === 'idle' ? '🎤' : label}
    </button>
  );
}