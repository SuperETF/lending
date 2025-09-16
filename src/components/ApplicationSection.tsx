import React, { useState } from 'react';
import { Send, Check, AlertCircle, User, Phone, Calendar, MapPin, Clock, Users, MessageCircle, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FormData {
  name: string;
  phone: string;
  medicalConditions: string;
}

interface RunningSession {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  max_participants: number;
  current_participants?: number;
}

const ApplicationSection: React.FC = () => {
  const [sessions, setSessions] = useState<RunningSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSessionForModal, setSelectedSessionForModal] = useState<RunningSession | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    medicalConditions: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  React.useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('running_sessions')
        .select('*')
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true });
      
      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const openModal = (session: RunningSession) => {
    setSelectedSessionForModal(session);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSessionForModal(null);
    setFormData({
      name: '',
      phone: '',
      medicalConditions: '',
    });
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setErrorMessage('이름을 입력해주세요.');
      return false;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('연락처를 입력해주세요.');
      return false;
    }
    if (!selectedSessionForModal) {
      setErrorMessage('세션 정보가 없습니다.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('participants')
        .insert([
          {
            session_id: selectedSessionForModal?.id,
            name: formData.name,
            phone: formData.phone,
            email: '',
            emergency_contact: '',
            emergency_phone: '',
            medical_conditions: formData.medicalConditions,
            privacy_consent: true,
            marketing_consent: false,
          }
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        name: '',
        phone: '',
        medicalConditions: '',
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
      setErrorMessage('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="application" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">FREE RUNNING CREW</span> 러닝 세션
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            참여하고 싶은 러닝 세션을 선택해보세요.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6"></div>
        </div>

        {/* Running Sessions Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-4 text-lg">러닝 세션을 불러오는 중...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {sessions.map((session) => (
                <div key={session.id} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">{session.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">{session.description}</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                      <span className="text-sm">{session.date}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Clock className="w-4 h-4 mr-2 text-blue-400" />
                      <span className="text-sm">{session.time}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                      <span className="text-sm">{session.location}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Users className="w-4 h-4 mr-2 text-blue-400" />
                      <span className="text-sm">최대 {session.max_participants}명</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => openModal(session)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
                  >
                    신청하기
                  </button>
                </div>
              ))}
            </div>
            
            {/* KakaoTalk Channel Section */}
            <div className="bg-yellow-500/10 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/30 text-center">
              <div className="mb-6">
                <MessageCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">카카오톡 채널 입장</h3>
                <p className="text-gray-300">
                  FREE RUNNING CREW 카카오톡 채널에서 실시간 소식과 추가 정보를 받아보세요!
                </p>
              </div>
              <a
                href="https://pf.kakao.com/_your_channel_id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                카카오톡 채널 입장하기
              </a>
            </div>
          </>
        )}
        
        {/* Application Modal */}
        {isModalOpen && selectedSessionForModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">러닝 세션 신청</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Selected Session Info */}
              <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-white mb-2">{selectedSessionForModal.title}</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {selectedSessionForModal.date} {selectedSessionForModal.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {selectedSessionForModal.location}
                  </div>
                </div>
              </div>
              
              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">신청이 완료되었습니다!</h4>
                  <p className="text-gray-300 mb-6">
                    선택하신 세션에 대한 자세한 안내를 곧 연락드리겠습니다.
                  </p>
                  <button
                    onClick={closeModal}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300"
                  >
                    확인
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      이름 *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="홍길동"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      연락처 *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="010-1234-5678"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">
                      특이사항
                    </label>
                    <textarea
                      name="medicalConditions"
                      value={formData.medicalConditions}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      placeholder="운동 시 주의할 점이나 특별히 알려주실 내용 (선택사항)"
                    />
                  </div>
                  
                  {submitStatus === 'error' && errorMessage && (
                    <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm">{errorMessage}</span>
                    </div>
                  )}
                  
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          신청 중...
                        </span>
                      ) : (
                        '신청하기'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ApplicationSection;
