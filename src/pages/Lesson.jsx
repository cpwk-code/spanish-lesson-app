import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { WEEK1 } from '../lessons';
import PhaseChat from '../components/PhaseChat';
var NAVY='#1B3A6B'; var GOLD='#F5A623'; var TEAL='#00B4A6';

export default function Lesson(props) {
  var session = props.session;
  var [profile, setProfile] = useState(null);
  var [progressMap, setProgressMap] = useState({});
  var [activeDay, setActiveDay] = useState(0);
  var [activePhase, setActivePhase] = useState(0);
  var [sessionData, setSessionData] = useState({});
  var [saving, setSaving] = useState(false);
  var [showComplete, setShowComplete] = useState(false);
  var userId = session.user.id;
  var day = WEEK1[activeDay];
  var phase = day.phases[activePhase];
  var phaseKey = "w" + day.week + "d" + day.day + "_" + phase.id;

  useEffect(function() {
    async function load() {
      var profRes = await supabase.from('profiles').select('*').eq('id', userId).single();
      var progRes = await supabase.from('progress').select('*').eq('user_id', userId);
      var logsRes = await supabase.from('session_logs').select('*').eq('user_id', userId);
      setProfile(profRes.data);
      var pm = {};
      if (progRes.data) progRes.data.forEach(function(p) { pm["w"+p.week+"d"+p.day+"_"+p.phase] = p; });
      setProgressMap(pm);
      var sd = {};
      if (logsRes.data) logsRes.data.forEach(function(l) { sd["w"+l.week+"d"+l.day+"_"+l.phase] = { messages: l.messages, attempts: 0 }; });
      setSessionData(sd);
      var resumeDay=0; var resumePhase=0; var found=false;
      for (var d=0; d<WEEK1.length && !found; d++) {
        for (var p=0; p<WEEK1[d].phases.length && !found; p++) {
          var k = "w"+WEEK1[d].week+"d"+WEEK1[d].day+"_"+WEEK1[d].phases[p].id;
          if (!pm[k] || !pm[k].completed) { resumeDay=d; resumePhase=p; found=true; }
        }
      }
      setActiveDay(resumeDay); setActivePhase(resumePhase);
    }
    load();
  }, [userId]);

  async function markPhaseComplete() {
    setSaving(true);
    var sd = sessionData[phaseKey] || {};
    await Promise.all([
      supabase.from('progress').upsert({ user_id:userId, week:day.week, day:day.day, phase:phase.id, completed:true, attempts:sd.attempts||0, completed_at:new Date().toISOString() }, { onConflict:'user_id,week,day,phase' }),
      supabase.from('session_logs').upsert({ user_id:userId, week:day.week, day:day.day, phase:phase.id, messages:sd.messages||[], updated_at:new Date().toISOString() }, { onConflict:'user_id,week,day,phase' })
    ]);
    var newPm = Object.assign({}, progressMap);
    newPm[phaseKey] = { completed: true };
    setProgressMap(newPm);
    setSaving(false);
    if (activePhase < day.phases.length-1) setActivePhase(activePhase+1);
    else if (activeDay < WEEK1.length-1) { setActiveDay(activeDay+1); setActivePhase(0); }
    else setShowComplete(true);
  }

  var handlePhaseUpdate = useCallback(function(data) {
    setSessionData(function(prev) { var n=Object.assign({},prev); n[phaseKey]=data; return n; });
  }, [phaseKey]);

  function isPhaseComplete(d,p) { var k="w"+d.week+"d"+d.day+"_"+p.id; return !!(progressMap[k] && progressMap[k].completed); }
  function isDayComplete(d) { return d.phases.every(function(p){ return isPhaseComplete(d,p); }); }
  async function handleSignOut() { await supabase.auth.signOut(); }

  if (!profile) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh' }}><div style={{ fontSize:32 }}>Loading...</div></div>;

  if (showComplete) return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#F7F9FC', padding:'2rem', textAlign:'center' }}>
      <div style={{ fontSize:64, marginBottom:16 }}>🏆</div>
      <h1 style={{ fontSize:28, color:NAVY, marginBottom:8 }}>Increible, {profile.display_name}!</h1>
      <p style={{ color:'#555', fontSize:16, maxWidth:320, marginBottom:24 }}>You finished all of Week 1! Week 2 coming soon!</p>
      <button onClick={function(){ setActiveDay(0); setActivePhase(0); setShowComplete(false); }}
        style={{ padding:'12px 28px', borderRadius:10, border:'none', background:NAVY, color:'#fff', fontSize:16, cursor:'pointer' }}>
        Review Week 1 Again
      </button>
    </div>
  );

  return (
    <div style={{ maxWidth:640, margin:'0 auto', padding:'1rem', minHeight:'100vh' }}>
      <div style={{ background:NAVY, borderRadius:12, padding:'12px 18px', marginBottom:14, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ color:GOLD, fontSize:11, fontWeight:600, letterSpacing:1 }}>WEEK {day.week} DAY {day.day}</div>
          <div style={{ color:'#fff', fontSize:17, fontWeight:500, marginTop:2 }}>{day.focus}</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ color:GOLD, fontSize:13 }}>Hi {profile.display_name}</div>
          <button onClick={handleSignOut} style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.3)', color:'#fff', borderRadius:6, padding:'5px 10px', fontSize:12, cursor:'pointer' }}>Sign out</button>
        </div>
      </div>
      <div style={{ display:'flex', gap:6, marginBottom:14, overflowX:'auto', paddingBottom:4 }}>
        {WEEK1.map(function(d,i){
          return <button key={i} onClick={function(){ setActiveDay(i); setActivePhase(0); }}
            style={{ padding:'6px 12px', borderRadius:20, border:'none', cursor:'pointer', whiteSpace:'nowrap', fontSize:12, fontWeight:500,
              background: i===activeDay ? TEAL : isDayComplete(d) ? NAVY : '#E8EDF4',
              color: i===activeDay ? '#fff' : isDayComplete(d) ? GOLD : '#555' }}>
            Day {d.day}{isDayComplete(d)?' checkmark':''}
          </button>;
        })}
      </div>
      <div style={{ display:'flex', gap:6, marginBottom:14, overflowX:'auto', paddingBottom:4 }}>
        {day.phases.map(function(p,i){
          return <button key={p.id} onClick={function(){ setActivePhase(i); }}
            style={{ padding:'6px 12px', borderRadius:20, border:'none', cursor:'pointer', whiteSpace:'nowrap', fontSize:12, fontWeight:500,
              background: i===activePhase ? TEAL : isPhaseComplete(day,p) ? NAVY : '#E8EDF4',
              color: i===activePhase ? '#fff' : isPhaseComplete(day,p) ? GOLD : '#555' }}>
            {p.icon} {p.label}
          </button>;
        })}
      </div>
      <div style={{ background:TEAL+'18', border:'1px solid '+TEAL+'44', borderRadius:10, padding:'10px 16px', marginBottom:14, fontSize:14, color:'#004A44' }}>
        <strong>Example:</strong> {day.example}
      </div>
      <div style={{ background:'#fff', borderRadius:12, border:'1px solid #E0E8F4', marginBottom:14, overflow:'hidden' }}>
        <div style={{ background:TEAL+'18', borderBottom:'1px solid #E0E8F4', padding:'10px 16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontWeight:500, color:NAVY, fontSize:15 }}>{phase.icon} {phase.label}</span>
          <span style={{ fontSize:12, color:'#888' }}>{phase.duration}</span>
        </div>
        <div style={{ padding:'12px 16px 16px' }}>
          <PhaseChat key={phaseKey} day={day} phase={phase}
            savedMessages={sessionData[phaseKey] && sessionData[phaseKey].messages}
            savedAttempts={sessionData[phaseKey] && sessionData[phaseKey].attempts}
            onUpdate={handlePhaseUpdate} />
        </div>
      </div>
      <div style={{ display:'flex', justifyContent:'flex-end' }}>
        <button onClick={markPhaseComplete} disabled={saving}
          style={{ padding:'12px 24px', borderRadius:10, border:'none', background:saving?'#ccc':NAVY, color:'#fff', fontSize:15, fontWeight:500, cursor:saving?'not-allowed':'pointer' }}>
          {saving ? 'Saving...' : isPhaseComplete(day,phase) ? 'Next' : 'Done with '+phase.label}
        </button>
      </div>
    </div>
  );
}