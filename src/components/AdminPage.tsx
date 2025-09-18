import React, { useState, useEffect, useRef } from 'react';
import { Plus, Calendar, Users, MapPin, Clock, Trash2, Eye, Edit, Download, Filter, Upload, Image, X } from 'lucide-react';
import { supabase, RunningSession, Participant } from '../lib/supabase';

const AdminPage: React.FC = () => {
  const [sessions, setSessions] = useState<RunningSession[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSession, setEditingSession] = useState<RunningSession | null>(null);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'past'>('all');

  const [newSession, setNewSession] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    max_participants: 10,
    registration_open_date: '',
    image_url: ''
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [timeInput, setTimeInput] = useState('');
  const [showTimeSuggestions, setShowTimeSuggestions] = useState(false);
  const timeInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSessions();
    fetchParticipants();
  }, []);

  // 외부 클릭 시 자동완성 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timeInputRef.current && !timeInputRef.current.contains(event.target as Node)) {
        setShowTimeSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
          registration_open_date: newSession.registration_open_date || null,
          current_participants: 0
          // created_by는 제거 - NULL 허용하도록 스키마 수정 필요
        }]);

      if (error) throw error;

      setNewSession({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        max_participants: 10,
        registration_open_date: '',
        image_url: ''
      });
      setIsCreating(false);
      fetchSessions();
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const handleEditSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSession) return;
    
    try {
      console.log('🔄 세션 수정 중...', {
        id: editingSession.id,
        title: newSession.title,
        image_url: newSession.image_url
      });
      
      const { error } = await supabase
        .from('running_sessions')
        .update({
          title: newSession.title,
          description: newSession.description,
          date: newSession.date,
          time: newSession.time,
          location: newSession.location,
          max_participants: newSession.max_participants,
          registration_open_date: newSession.registration_open_date || null,
          image_url: newSession.image_url
        })
        .eq('id', editingSession.id);

      if (error) throw error;
      
      console.log('✅ 세션 수정 완료!');

      setNewSession({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        max_participants: 10,
        registration_open_date: '',
        image_url: ''
      });
      setTimeInput('');
      setShowTimeSuggestions(false);
      setIsEditing(false);
      setEditingSession(null);
      fetchSessions();
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  const startEditSession = (session: RunningSession) => {
    setEditingSession(session);
    setNewSession({
      title: session.title,
      description: session.description,
      date: session.date,
      time: session.time,
      location: session.location,
      max_participants: session.max_participants,
      registration_open_date: session.registration_open_date ? new Date(session.registration_open_date).toISOString().slice(0, 16) : '',
      image_url: session.image_url || ''
    });
    
    setTimeInput('');
    
    setShowTimeSuggestions(false);
    setIsEditing(true);
  };

  const deleteSession = async (sessionId: string) => {
    if (!window.confirm('정말로 이 세션을 삭제하시겠습니까?\n연결된 참여자 정보와 이미지도 함께 삭제됩니다.')) return;

    console.log('🗑️ 세션 삭제 시작:', sessionId);

    try {
      // 1. 먼저 세션 정보 조회 (이미지 URL 확인용)
      console.log('1️⃣ 세션 정보 조회 중...');
      const { data: sessionData, error: fetchError } = await supabase
        .from('running_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      console.log('세션 데이터:', sessionData);
      console.log('조회 오류:', fetchError);

      if (fetchError) {
        console.error('Error fetching session:', fetchError);
        alert('세션 정보를 가져오는데 실패했습니다: ' + fetchError.message);
        return;
      }

      // 2. 세션에 연결된 참여자들 삭제
      console.log('2️⃣ 참여자 삭제 중...');
      const { error: participantsError } = await supabase
        .from('participants')
        .delete()
        .eq('session_id', sessionId);

      console.log('참여자 삭제 오류:', participantsError);

      if (participantsError) {
        console.error('Error deleting participants:', participantsError);
        alert('참여자 정보 삭제에 실패했습니다: ' + participantsError.message);
        return;
      }

      // 3. 이미지가 있다면 Storage에서 삭제
      if (sessionData.image_url) {
        try {
          // URL에서 파일명 추출
          const fileName = sessionData.image_url.split('/').pop();
          if (fileName) {
            const { error: storageError } = await supabase.storage
              .from('frc-session-images')
              .remove([fileName]);
            
            if (storageError) {
              console.error('Error deleting image:', storageError);
              // 이미지 삭제 실패해도 세션은 삭제 진행
            }
          }
        } catch (imageError) {
          console.error('Error processing image deletion:', imageError);
        }
      }

      // 4. 마지막으로 세션 삭제
      console.log('4️⃣ 세션 삭제 중...');
      const { error: sessionError } = await supabase
        .from('running_sessions')
        .delete()
        .eq('id', sessionId);

      console.log('세션 삭제 오류:', sessionError);

      if (sessionError) {
        console.error('Error deleting session:', sessionError);
        alert('세션 삭제에 실패했습니다: ' + sessionError.message);
        return;
      }

      // 5. 성공적으로 삭제 완료
      console.log('✅ 세션 삭제 완료!');
      alert('세션이 성공적으로 삭제되었습니다.');
      fetchSessions();
      fetchParticipants(); // 참여자 목록도 새로고침
    } catch (error) {
      console.error('Unexpected error during deletion:', error);
      alert('삭제 중 예상치 못한 오류가 발생했습니다.');
    }
  };

  const exportAllParticipants = () => {
    const csvContent = [
      ['세션명', '이름', '전화번호', '이메일', '응급연락처', '응급전화', '의료정보', '신청일시'],
      ...participants.map(p => {
        const session = sessions.find(s => s.id === p.session_id);
        return [
          session?.title || '알 수 없는 세션',
          p.name,
          p.phone,
          p.email,
          p.emergency_contact,
          p.emergency_phone,
          p.medical_conditions || '',
          new Date(p.created_at).toLocaleString()
        ];
      })
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `FRC_전체참여자_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportSessionParticipants = (sessionId: string, sessionTitle: string) => {
    const sessionParticipants = participants.filter(p => p.session_id === sessionId);
    
    if (sessionParticipants.length === 0) {
      alert('해당 세션에 참여자가 없습니다.');
      return;
    }

    const csvContent = [
      ['이름', '전화번호', '이메일', '응급연락처', '응급전화', '의료정보', '신청일시'],
      ...sessionParticipants.map(p => [
        p.name,
        p.phone,
        p.email,
        p.emergency_contact,
        p.emergency_phone,
        p.medical_conditions || '',
        new Date(p.created_at).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `FRC_${sessionTitle}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setUploadingImage(true);
      
      // 파일명을 고유하게 만들기
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('frc-session-images')
        .upload(fileName, file);
      
      if (error) throw error;
      
      // 공개 URL 가져오기
      const { data: { publicUrl } } = supabase.storage
        .from('frc-session-images')
        .getPublicUrl(fileName);
      
      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // 이미지 파일 검증
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }
    
    // 파일 크기 검증 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하만 가능합니다.');
      return;
    }
    
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setNewSession(prev => ({ ...prev, image_url: imageUrl }));
    } else {
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  // 시간 자동완성 관련 함수들
  const generateTimeSuggestions = (input: string) => {
    if (!input) return [];
    
    const num = parseInt(input);
    if (isNaN(num)) return [];
    
    const suggestions = [];
    
    // 1-12시 범위에서 오전/오후 옵션
    if (num >= 1 && num <= 12) {
      const amHour = num.toString().padStart(2, '0');
      const pmHour = (num + 12).toString().padStart(2, '0');
      
      // 오전 옵션
      suggestions.push({
        display: `오전 ${num}:00 (${amHour}:00)`,
        value: `${amHour}:00`,
        label: '오전'
      });
      
      suggestions.push({
        display: `오전 ${num}:30 (${amHour}:30)`,
        value: `${amHour}:30`,
        label: '오전'
      });
      
      // 오후 옵션 (12시는 12:00이 아니라 24:00이 되지 않도록)
      if (num !== 12) {
        suggestions.push({
          display: `오후 ${num}:00 (${pmHour}:00)`,
          value: `${pmHour}:00`,
          label: '오후'
        });
        
        suggestions.push({
          display: `오후 ${num}:30 (${pmHour}:30)`,
          value: `${pmHour}:30`,
          label: '오후'
        });
      } else {
        // 12시의 경우 오후 12시는 12:00
        suggestions.push({
          display: `오후 ${num}:00 (12:00)`,
          value: `12:00`,
          label: '오후'
        });
        
        suggestions.push({
          display: `오후 ${num}:30 (12:30)`,
          value: `12:30`,
          label: '오후'
        });
      }
    }
    
    // 13-23시 범위 (오후만)
    if (num >= 13 && num <= 23) {
      const hour24 = num.toString().padStart(2, '0');
      const hour12 = num - 12;
      
      suggestions.push({
        display: `오후 ${hour12}시 (${hour24}:00)`,
        value: `${hour24}:00`,
        label: '오후'
      });
      
      suggestions.push({
        display: `오후 ${hour12}시 30분 (${hour24}:30)`,
        value: `${hour24}:30`,
        label: '오후'
      });
    }
    
    // 0시 (자정)
    if (num === 0) {
      suggestions.push({
        display: `자정 (00:00)`,
        value: `00:00`,
        label: '자정'
      });
      
      suggestions.push({
        display: `자정 30분 (00:30)`,
        value: `00:30`,
        label: '자정'
      });
    }
    
    return suggestions.slice(0, 6); // 최대 6개 제한
  };

  const handleTimeInputChange = (value: string) => {
    setTimeInput(value);
    setShowTimeSuggestions(value.length > 0);
  };

  const selectTimeSuggestion = (timeValue: string) => {
    console.log('시간 선택:', timeValue); // 디버깅용
    console.log('현재 newSession.time:', newSession.time); // 디버깅용
    
    setNewSession(prev => {
      const updated = {...prev, time: timeValue};
      console.log('업데이트된 시간:', updated.time); // 디버깅용
      return updated;
    });
    
    setTimeInput('');
    setShowTimeSuggestions(false);
  };

  const getFilteredSessions = () => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (filterStatus) {
      case 'upcoming':
        return sessions.filter(session => session.date >= today);
      case 'past':
        return sessions.filter(session => session.date < today);
      default:
        return sessions;
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
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">FRC 관리자 대시보드</h1>
            <p className="text-gray-400">러닝 세션과 참여자를 관리하세요</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={exportAllParticipants}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              전체 참여자 내보내기
            </button>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              새 세션 만들기
            </button>
          </div>
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

        {/* Create/Edit Session Modal */}
        {(isCreating || isEditing) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg w-full max-w-md max-h-[90vh] flex flex-col">
              {/* 모달 헤더 - 고정 */}
              <div className="p-6 pb-4 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">
                  {isEditing ? '러닝 세션 수정' : '새 러닝 세션 만들기'}
                </h2>
              </div>
              
              {/* 스크롤 가능한 콘텐츠 영역 */}
              <div className="flex-1 overflow-y-auto p-6 pt-4" style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(75, 85, 99, 0.5) transparent'
              }}>
                <form id="session-form" onSubmit={isEditing ? handleEditSession : handleCreateSession} className="space-y-4">
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
                  <div className="relative" ref={timeInputRef}>
                    <label className="block text-white text-sm font-medium mb-2">시간</label>
                    <input
                      type="text"
                      value={newSession.time || timeInput}
                      onChange={(e) => {
                        // 선택된 시간이 있으면 수정 불가, 없으면 숫자 입력 가능
                        if (!newSession.time) {
                          handleTimeInputChange(e.target.value);
                        }
                      }}
                      onFocus={() => {
                        // 선택된 시간이 있으면 클리어하고 입력 모드로 전환
                        if (newSession.time) {
                          setNewSession({...newSession, time: ''});
                          setTimeInput('');
                        }
                      }}
                      placeholder="9, 21 등 숫자 입력"
                      className={`w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 ${
                        newSession.time ? 'text-green-400 font-medium' : ''
                      }`}
                      required
                    />
                    
                    {/* 시간 자동완성 드롭다운 */}
                    {showTimeSuggestions && timeInput && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {generateTimeSuggestions(timeInput).map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              selectTimeSuggestion(suggestion.value);
                            }}
                            className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors flex items-center justify-between"
                          >
                            <span>{suggestion.display}</span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              suggestion.label === '오전' 
                                ? 'bg-blue-500/20 text-blue-300' 
                                : suggestion.label === '자정'
                                ? 'bg-gray-500/20 text-gray-300'
                                : 'bg-purple-500/20 text-purple-300'
                            }`}>
                              {suggestion.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-400 mt-1">
                      {newSession.time 
                        ? '시간이 선택되었습니다. 다시 선택하려면 입력 필드를 클릭하세요.' 
                        : '숫자 입력 후 자동완성 선택'
                      }
                    </p>
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
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    📅 신청 오픈 예정일시
                  </label>
                  <input
                    type="datetime-local"
                    value={newSession.registration_open_date}
                    onChange={(e) => setNewSession({...newSession, registration_open_date: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    비워두면 즉시 신청 가능합니다. 미래 시간 설정 시 "오픈 예정" 상태로 표시됩니다.
                  </p>
                </div>
                
                {/* 이미지 업로드 섹션 */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <Image className="w-4 h-4 inline mr-2" />
                    세션 이미지
                  </label>
                  
                  {newSession.image_url && (
                    <div className="mb-3">
                      <div className="w-full aspect-[3/4] overflow-hidden rounded-lg border border-gray-600">
                        <img 
                          src={newSession.image_url} 
                          alt="세션 이미지 미리보기" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setNewSession({...newSession, image_url: ''})}
                        className="mt-2 text-red-400 hover:text-red-300 text-sm"
                      >
                        이미지 제거
                      </button>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      disabled={uploadingImage}
                    />
                    <label
                      htmlFor="image-upload"
                      className={`flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors ${
                        uploadingImage ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {uploadingImage ? '업로드 중...' : '이미지 선택'}
                    </label>
                    <span className="text-gray-400 text-xs">
                      JPG, PNG, GIF (최대 5MB)
                    </span>
                  </div>
                </div>
                </form>
              </div>
              
              {/* 모달 푸터 - 고정 */}
              <div className="p-6 pt-4 border-t border-gray-700">
                <div className="flex gap-4">
                  <button
                    type="submit"
                    form="session-form"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    {isEditing ? '수정하기' : '생성하기'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      setIsEditing(false);
                      setEditingSession(null);
                      setTimeInput('');
                      setShowTimeSuggestions(false);
                      setNewSession({
                        title: '',
                        description: '',
                        date: '',
                        time: '',
                        location: '',
                        max_participants: 10,
                        registration_open_date: '',
                        image_url: ''
                      });
                    }}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sessions List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sessions */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">러닝 세션</h2>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'all' | 'upcoming' | 'past')}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm"
                >
                  <option value="all">전체</option>
                  <option value="upcoming">예정</option>
                  <option value="past">지난</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              {getFilteredSessions().map((session) => (
                <div key={session.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-white">{session.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedSession(selectedSession === session.id ? null : session.id)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        title="참여자 보기"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => startEditSession(session)}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors"
                        title="세션 수정"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteSession(session.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="세션 삭제"
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
              {getFilteredSessions().length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  {filterStatus === 'all' ? '아직 생성된 세션이 없습니다.' : 
                   filterStatus === 'upcoming' ? '예정된 세션이 없습니다.' : 
                   '지난 세션이 없습니다.'}
                </div>
              )}
            </div>
          </div>

          {/* Session Participants */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">세션별 참여자</h2>
            <div className="space-y-6 max-h-96 overflow-y-auto">
              {sessions.map((session) => {
                const sessionParticipants = participants.filter(p => p.session_id === session.id);
                
                return (
                  <div key={session.id} className="bg-gray-800 rounded-lg border border-gray-700">
                    {/* 세션 헤더 */}
                    <div className="p-4 border-b border-gray-700 bg-gray-750 rounded-t-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-white font-bold text-lg">{session.title}</h3>
                          <p className="text-gray-400 text-sm">
                            {session.date} {session.time} | {session.location}
                          </p>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                          <div>
                            <span className="text-blue-400 font-medium">
                              {sessionParticipants.length}/{session.max_participants}명
                            </span>
                            <p className="text-xs text-gray-500">참여자</p>
                          </div>
                          {sessionParticipants.length > 0 && (
                            <button
                              onClick={() => exportSessionParticipants(session.id, session.title)}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs flex items-center gap-1 transition-colors"
                            >
                              <Download className="w-3 h-3" />
                              내보내기
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* 참여자 목록 */}
                    <div className="p-4">
                      {sessionParticipants.length > 0 ? (
                        <div className="space-y-3">
                          {sessionParticipants.map((participant) => (
                            <div key={participant.id} className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="text-white font-medium">{participant.name}</h4>
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
                        </div>
                      ) : (
                        <div className="text-center py-6 text-gray-500">
                          아직 신청한 참여자가 없습니다.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {sessions.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  생성된 세션이 없습니다.
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
