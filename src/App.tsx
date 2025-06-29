import React, { useState } from 'react';
import { Header } from './components/Header';
import { VibeSelector } from './components/VibeSelector';
import { KeywordInput } from './components/KeywordInput';
import { GenerateButton } from './components/GenerateButton';
import { BioResults } from './components/BioResults';
import { Footer } from './components/Footer';
import { generateBios } from './services/bioGenerator';

function App() {
  const [selectedVibe, setSelectedVibe] = useState('');
  const [keywords, setKeywords] = useState('');
  const [bios, setBios] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!selectedVibe) {
      setError('Please select a vibe first!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const generatedBios = await generateBios(selectedVibe, keywords);
      setBios(generatedBios);
    } catch (err) {
      setError('Failed to generate bios. Please try again!');
      console.error('Bio generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
          <VibeSelector 
            selectedVibe={selectedVibe}
            onVibeSelect={setSelectedVibe}
          />
          
          <KeywordInput 
            keywords={keywords}
            onKeywordsChange={setKeywords}
          />
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}
          
          <GenerateButton 
            onGenerate={handleGenerate}
            loading={loading}
            disabled={!selectedVibe}
          />
        </div>

        <BioResults 
          bios={bios}
          onRegenerate={handleRegenerate}
          loading={loading}
        />
        
        <Footer />
      </div>
    </div>
  );
}

export default App;