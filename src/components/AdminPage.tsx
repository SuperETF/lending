import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Users, MapPin, Clock, Edit, Trash2, Eye } from 'lucide-react';
import { supabase, RunningSession, Participant } from '../lib/supabase';

const AdminPage: React.FC = () => {
  const [sessions, setSessions] = useState<RunningSession[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [newSession, setNewSession] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    max_participants: 10
  });

  useEffect(() => {
    fetchSessions();
    fetchParticipants();
  }, []);

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('running_sessions')
        .select('*')
        .order('date', { ascending: true });
      
      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const fetchParticipants = async () => {
    try {
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setParticipants(data || []);
    } catch (error) {
      console.error('Error fetching participants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('running_sessions')
        .insert([{
          ...newSession,
          current_participants: 0,
          created_by: 'admin' // In a real app, this would be the authenticated user's ID
        }]);

      if (error) throw error;

      setNewSession({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        max_participants: 10
      });
      setIsCreating(false);
      fetchSessions();
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const deleteSession = async (sessionId: string) => {
    if (!window.confirm('정말로 이 세션을 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase
        .from('running_sessions')
        .delete()
        .eq('id', sessionId);

      if (error) throw error;
      fetchSessions();
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  const getSessionParticipants = (sessionId: string) => {
    return participants.filter(p => p.session_id === sessionId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">FRC 관리자 대시보드</h1>
            <p className="text-gray-400">러닝 세션과 참여자를 관리하세요</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            새 세션 만들기
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">총 세션</p>
                <p className="text-2xl font-bold text-white">{sessions.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">총 참여자</p>
                <p className="text-2xl font-bold text-white">{participants.length}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">이번 달 신청</p>
                <p className="text-2xl font-bold text-white">
                  {participants.filter(p => {
                    const created = new Date(p.created_at);
                    const now = new Date();
                    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
              <Eye className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Create Session Modal */}
        {isCreating && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-white mb-4">새 러닝 세션 만들기</h2>
              <form onSubmit={handleCreateSession} className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">제목</label>
                  <input
                    type="text"
                    value={newSession.title}
                    onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">설명</label>
                  <textarea
                    value={newSession.description}
                    onChange={(e) => setNewSession({...newSession, description: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    rows={3}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">날짜</label>
                    <input
                      type="date"
                      value={newSession.date}
                      onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">시간</label>
                    <input
                      type="time"
                      value={newSession.time}
                      onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">장소</label>
                  <input
                    type="text"
                    value={newSession.location}
                    onChange={(e) => setNewSession({...newSession, location: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">최대 참여자 수</label>
                  <input
                    type="number"
                    value={newSession.max_participants}
                    onChange={(e) => setNewSession({...newSession, max_participants: parseInt(e.target.value)})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    min="1"
                    required
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    생성하기
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    취소
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Sessions List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sessions */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">러닝 세션</h2>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-white">{session.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedSession(selectedSession === session.id ? null : session.id)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteSession(session.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4">{session.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      {session.date}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-4 h-4" />
                      {session.time}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="w-4 h-4" />
                      {session.location}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Users className="w-4 h-4" />
                      {session.current_participants}/{session.max_participants}
                    </div>
                  </div>
                  
                  {/* Session Participants */}
                  {selectedSession === session.id && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <h4 className="text-white font-medium mb-2">참여자 목록</h4>
                      <div className="space-y-2">
                        {getSessionParticipants(session.id).map((participant) => (
                          <div key={participant.id} className="text-sm text-gray-300 bg-gray-700/50 rounded p-2">
                            {participant.name} - {participant.phone}
                          </div>
                        ))}
                        {getSessionParticipants(session.id).length === 0 && (
                          <p className="text-gray-500 text-sm">아직 참여자가 없습니다.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {sessions.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  아직 생성된 세션이 없습니다.
                </div>
              )}
            </div>
          </div>

          {/* All Participants */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">전체 참여자</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {participants.map((participant) => (
                <div key={participant.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-medium">{participant.name}</h3>
                    <span className="text-xs text-gray-500">
                      {new Date(participant.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>📞 {participant.phone}</p>
                    <p>📧 {participant.email}</p>
                    <p>🚨 {participant.emergency_contact} ({participant.emergency_phone})</p>
                    {participant.medical_conditions && (
                      <p>🏥 {participant.medical_conditions}</p>
                    )}
                  </div>
                  <div className="flex gap-2 mt-2">
                    {participant.privacy_consent && (
                      <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded">개인정보동의</span>
                    )}
                    {participant.marketing_consent && (
                      <span className="text-xs bg-blue-900/30 text-blue-400 px-2 py-1 rounded">마케팅동의</span>
                    )}
                  </div>
                </div>
              ))}
              {participants.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  아직 신청한 참여자가 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
