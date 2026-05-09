import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AIAssistant } from './components/AIAssistant';
import { Resources } from './components/Resources';
import { Footer } from './components/Footer';
import { GetStarted } from './components/GetStarted';
import { Results } from './components/Results';

export default function App() {
  const [showGetStarted, setShowGetStarted] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onGetStartedClick={() => setShowGetStarted(true)} />
      <main>
        <Hero onGetStartedClick={() => setShowGetStarted(true)} />
        <AIAssistant />
        <Results />
        <Resources />
      </main>
      <Footer />
      {showGetStarted && <GetStarted onClose={() => setShowGetStarted(false)} />}
    </div>
  );
}