import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onGetStartedClick: () => void;
}

export function Hero({ onGetStartedClick }: HeroProps) {
  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Powered by AI</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-gray-900">
            Your Path to <span className="text-blue-600">UC & CSU</span> Starts Here
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get personalized transfer guidance from California Community College to your dream university.
            Our AI assistant helps you navigate requirements, deadlines, and applications with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onGetStartedClick}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 group"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#results"
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Sample Plan
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl mb-2">🎓</div>
              <div className="text-2xl text-blue-600 mb-1">23</div>
              <div className="text-sm text-gray-600">CSU Campuses</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl mb-2">🏛️</div>
              <div className="text-2xl text-blue-600 mb-1">9</div>
              <div className="text-sm text-gray-600">UC Campuses</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl mb-2">✨</div>
              <div className="text-2xl text-blue-600 mb-1">24/7</div>
              <div className="text-sm text-gray-600">AI Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
