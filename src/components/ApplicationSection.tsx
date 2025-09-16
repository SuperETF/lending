import React, { useState } from 'react';
import { Send, Check, AlertCircle, User, Phone, Mail, Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FormData {
  name: string;
  phone: string;
  email: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalConditions: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
}

const ApplicationSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalConditions: '',
    privacyConsent: false,
    marketingConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
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
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('올바른 이메일을 입력해주세요.');
      return false;
    }
    if (!formData.emergencyContact.trim()) {
      setErrorMessage('비상연락처 이름을 입력해주세요.');
      return false;
    }
    if (!formData.emergencyPhone.trim()) {
      setErrorMessage('비상연락처 번호를 입력해주세요.');
      return false;
    }
    if (!formData.privacyConsent) {
      setErrorMessage('개인정보 처리방침에 동의해주세요.');
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
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            emergency_contact: formData.emergencyContact,
            emergency_phone: formData.emergencyPhone,
            medical_conditions: formData.medicalConditions,
            privacy_consent: formData.privacyConsent,
            marketing_consent: formData.marketingConsent,
          }
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        emergencyContact: '',
        emergencyPhone: '',
        medicalConditions: '',
        privacyConsent: false,
        marketingConsent: false,
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
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">FRC</span> 신청하기
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            함께 달릴 준비가 되셨나요? 아래 정보를 입력해주시면 곧 연락드리겠습니다.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6"></div>
        </div>

        {/* Application Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50">
          {submitStatus === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">신청이 완료되었습니다!</h3>
              <p className="text-gray-300 mb-6">
                곧 연락드려 자세한 안내를 도와드리겠습니다. 감사합니다!
              </p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300"
              >
                다시 신청하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  이메일 *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="example@email.com"
                  required
                />
              </div>

              {/* Emergency Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    비상연락처 이름 *
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="가족 또는 지인"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">
                    비상연락처 번호 *
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="010-1234-5678"
                    required
                  />
                </div>
              </div>

              {/* Medical Conditions */}
              <div>
                <label className="block text-white font-medium mb-2">
                  건강상태 및 특이사항
                </label>
                <textarea
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                  placeholder="운동 시 주의할 점이나 건강상태를 알려주세요 (선택사항)"
                />
              </div>

              {/* Consent Checkboxes */}
              <div className="space-y-4 pt-4 border-t border-gray-600">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="privacyConsent"
                    checked={formData.privacyConsent}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    required
                  />
                  <label className="text-gray-300 text-sm">
                    <Shield className="w-4 h-4 inline mr-1" />
                    개인정보 수집 및 이용에 동의합니다. * (필수)
                    <span className="block text-xs text-gray-400 mt-1">
                      수집목적: 러닝 크루 참여 관리 및 안전한 운동 진행을 위한 연락
                    </span>
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <label className="text-gray-300 text-sm">
                    마케팅 정보 수신에 동의합니다. (선택)
                    <span className="block text-xs text-gray-400 mt-1">
                      새로운 프로그램 및 이벤트 정보를 받아보실 수 있습니다.
                    </span>
                  </label>
                </div>
              </div>

              {/* Error Message */}
              {submitStatus === 'error' && errorMessage && (
                <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    신청 중...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    신청하기
                  </span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ApplicationSection;
