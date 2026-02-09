import React, { useState, useEffect, useRef } from 'react';
import { FormStep, FormData } from '../types';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const PLACEHOLDERS = {
  intro: ['technology', 'creative industry', 'hospitality', 'real estate', 'culture', 'fashion'],
  goal: ['present my business clearly', 'attract the right clients', 'launch something new', 'build credibility', 'simplify our message'],
  scope: ['a few key pages', 'a landing page', 'contact or lead generation', 'something simple and clear'],
  existing: ['no website yet', 'an outdated website', 'something temporary', 'a clear idea but nothing built'],
  contact: ['your@email.com'],
  recap: [],
  success: []
};

const StartProject: React.FC = () => {
  const [step, setStep] = useState<FormStep>('intro');
  const [formData, setFormData] = useState<FormData>({
    industry: '',
    goal: '',
    scope: '',
    existing: '',
    email: ''
  });
  const [inputValue, setInputValue] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus management
  useEffect(() => {
    if (step !== 'success' && step !== 'recap') {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  // Placeholder rotation
  useEffect(() => {
    if (step === 'success' || step === 'recap') return;
    const currentPlaceholders = PLACEHOLDERS[step];
    if (currentPlaceholders.length <= 1) return;

    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % currentPlaceholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [step]);

  const sendEmail = async (data: FormData) => {
    try {
      const response = await fetch('/.netlify/functions/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  };

  const changeStep = async (direction: 'next' | 'back') => {
    if (isExiting || isSending) return;

    if (direction === 'next') {
        if (step !== 'recap' && !inputValue.trim()) return;
        if (step === 'contact') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(inputValue)) return;
        }
    }

    let targetStep: FormStep = step;

    if (direction === 'next') {
        if (step === 'intro') targetStep = 'goal';
        else if (step === 'goal') targetStep = 'scope';
        else if (step === 'scope') targetStep = 'existing';
        else if (step === 'existing') targetStep = 'contact';
        else if (step === 'contact') targetStep = 'recap';
        else if (step === 'recap') {
          // Send email before going to success
          setIsSending(true);
          const emailSent = await sendEmail(formData);
          setIsSending(false);

          if (!emailSent) {
            alert('Failed to send email. Please try again.');
            return;
          }
          targetStep = 'success';
        }
    } else {
        if (step === 'goal') targetStep = 'intro';
        else if (step === 'scope') targetStep = 'goal';
        else if (step === 'existing') targetStep = 'scope';
        else if (step === 'contact') targetStep = 'existing';
        else if (step === 'recap') targetStep = 'contact';
    }

    setIsExiting(true);

    setTimeout(() => {
      let currentData = { ...formData };
      if (step !== 'recap' && step !== 'success') {
         if (step === 'intro') currentData.industry = inputValue;
         if (step === 'goal') currentData.goal = inputValue;
         if (step === 'scope') currentData.scope = inputValue;
         if (step === 'existing') currentData.existing = inputValue;
         if (step === 'contact') currentData.email = inputValue;
      }
      setFormData(currentData);

      let nextInputVal = '';
      if (targetStep === 'intro') nextInputVal = currentData.industry;
      else if (targetStep === 'goal') nextInputVal = currentData.goal;
      else if (targetStep === 'scope') nextInputVal = currentData.scope;
      else if (targetStep === 'existing') nextInputVal = currentData.existing;
      else if (targetStep === 'contact') nextInputVal = currentData.email;

      setInputValue(nextInputVal);
      setStep(targetStep);
      setPlaceholderIndex(0);
      setIsExiting(false);
    }, 400);
  };

  const handleNext = () => changeStep('next');
  const handleBack = () => changeStep('back');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  const handleRecapChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const currentPlaceholders = PLACEHOLDERS[step] || [];
  const currentPlaceholder = currentPlaceholders[placeholderIndex] || '';

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-12 pt-36 md:pt-40 relative">

      {/* Background Image */}
      <div
        className="fixed inset-0 w-full h-full -z-10"
        style={{
          backgroundImage: 'url(/images/pearl-background.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.6
        }}
      />

      {/* Back Button */}
      {step !== 'intro' && step !== 'success' && !isExiting && (
        <button
          onClick={handleBack}
          className="absolute top-40 left-6 sm:left-12 md:top-auto md:bottom-12 flex items-center gap-2 text-mist hover:text-graphite transition-colors duration-500 ease-physics group z-20"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-500 ease-physics" />
          <span className="text-xs tracking-widest uppercase">Back</span>
        </button>
      )}

      {/* Content Container */}
      <div
        className={`max-w-4xl w-full transition-all duration-700 ease-physics ${
          isExiting
            ? 'opacity-0 translate-y-[-16px] blur-sm'
            : 'opacity-100 translate-y-0 blur-0'
        }`}
      >
        {/* Step Context Headers */}
        {['intro', 'goal', 'scope', 'existing'].includes(step) && (
          <div className="w-full mb-12 md:mb-16 animate-fade-in text-left">
            <span className="text-xs font-medium tracking-[0.2em] text-mist uppercase">How can we help</span>
          </div>
        )}
        {step === 'contact' && (
          <div className="w-full mb-12 md:mb-16 animate-fade-in text-left">
             <span className="text-xs font-medium tracking-[0.2em] text-mist uppercase">Contact</span>
          </div>
        )}
        {step === 'recap' && (
          <div className="w-full mb-12 md:mb-16 animate-fade-in text-left">
             <span className="text-xs font-medium tracking-[0.2em] text-mist uppercase">Confirm details</span>
          </div>
        )}

        {/* Form Inputs */}
        {step === 'intro' && (
          <QuestionBlock
            label="I'm working in"
            value={inputValue}
            placeholder={currentPlaceholder}
            onChange={setInputValue}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
          />
        )}

        {step === 'goal' && (
          <QuestionBlock
            label="The goal of the website is to"
            value={inputValue}
            placeholder={currentPlaceholder}
            onChange={setInputValue}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
          />
        )}

        {step === 'scope' && (
          <QuestionBlock
            label="It will likely include"
            value={inputValue}
            placeholder={currentPlaceholder}
            onChange={setInputValue}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
          />
        )}

        {step === 'existing' && (
          <QuestionBlock
            label="Right now, we have"
            value={inputValue}
            placeholder={currentPlaceholder}
            onChange={setInputValue}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
          />
        )}

        {step === 'contact' && (
          <div className="relative">
             <QuestionBlock
              label="You can reach me at"
              value={inputValue}
              placeholder="email@address.com"
              onChange={setInputValue}
              onKeyDown={handleKeyDown}
              inputRef={inputRef}
              type="email"
            />
            {/* Review Button */}
            {inputValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && (
              <div className="mt-12 flex justify-start animate-fade-in">
                <button
                  onClick={handleNext}
                  className="text-graphite text-sm tracking-widest uppercase hover:text-mist transition-colors duration-500 ease-physics flex items-center gap-2 group"
                >
                  Review
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-physics">
                    <ArrowRight size={14} />
                  </span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Recap View */}
        {step === 'recap' && (
          <div className="flex flex-col items-start w-full animate-fade-in">
            <div className="flex flex-col gap-6 mb-16 w-full p-8 rounded-sm bg-white/30 backdrop-blur-sm border border-white/40 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <RecapLine label="I'm working in" value={formData.industry} onChange={(v) => handleRecapChange('industry', v)} />
              <RecapLine label="The goal is to" value={formData.goal} onChange={(v) => handleRecapChange('goal', v)} />
              <RecapLine label="It will include" value={formData.scope} onChange={(v) => handleRecapChange('scope', v)} />
              <RecapLine label="Current status" value={formData.existing} onChange={(v) => handleRecapChange('existing', v)} />
              <RecapLine label="Contact email" value={formData.email} onChange={(v) => handleRecapChange('email', v)} />
            </div>

            <button
              onClick={handleNext}
              disabled={isSending}
              className="text-graphite text-lg tracking-widest uppercase hover:text-mist transition-colors duration-500 ease-physics flex items-center gap-3 group px-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? 'Sending...' : 'Send request'}
              {!isSending && (
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-physics">
                  <ArrowRight size={18} />
                </span>
              )}
            </button>
          </div>
        )}

        {/* Success View */}
        {step === 'success' && (
          <div className="flex flex-col items-start justify-center h-full w-full animate-fade-in">
            <h2 className="text-3xl md:text-4xl text-graphite font-normal leading-tight tracking-tight mb-8 drop-shadow-sm">
              Thank you. <br />
              We'll review your request carefully <br />
              and get back to you shortly.
            </h2>
          </div>
        )}

        {/* Enter Hint */}
        {['intro', 'goal', 'scope', 'existing'].includes(step) && inputValue.length > 0 && (
          <div className="mt-12 animate-fade-in pl-1">
             <p className="text-mist opacity-35 text-sm tracking-wide">Press Enter to continue</p>
          </div>
        )}
      </div>

    </div>
  );
};

// Reusable Question Component
interface QuestionBlockProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (val: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  type?: string;
}

const QuestionBlock: React.FC<QuestionBlockProps> = ({
  label, value, placeholder, onChange, onKeyDown, inputRef, type = "text"
}) => {
  return (
    <div className="flex flex-col md:block items-start w-full animate-fade-in">
      <span className="text-2xl sm:text-3xl md:text-4xl text-graphite font-normal leading-relaxed tracking-tight mr-3 md:inline-block drop-shadow-sm">
        {label}
      </span>
      <div className="relative inline-block min-w-[200px] max-w-full md:max-w-[50%] align-baseline">
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          className="w-full bg-transparent border-none outline-none p-0 m-0 text-2xl sm:text-3xl md:text-4xl text-mist placeholder-mist/30 font-normal leading-relaxed tracking-tight transition-all duration-300 drop-shadow-sm"
          spellCheck={false}
          autoComplete="off"
        />
        {value === '' && (
          <span className="absolute top-0 left-0 text-2xl sm:text-3xl md:text-4xl text-mist/20 pointer-events-none whitespace-nowrap overflow-hidden text-ellipsis w-full animate-fade-in transition-opacity duration-700">
            {placeholder}
          </span>
        )}
      </div>
    </div>
  );
};

// Editable Recap Line Component
interface RecapLineProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

const RecapLine: React.FC<RecapLineProps> = ({ label, value, onChange }) => (
  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 group border-b border-transparent hover:border-graphite/5 pb-2 transition-all duration-300">
    <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-mist/60 min-w-[200px]">
      {label}
    </p>
    <div className="flex-1">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-none outline-none text-lg sm:text-xl md:text-2xl text-graphite font-normal leading-relaxed transition-colors duration-300 pb-1"
        spellCheck={false}
      />
    </div>
  </div>
);

export default StartProject;
