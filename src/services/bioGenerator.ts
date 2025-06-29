import Groq from 'groq-sdk';

// Initialize Groq client
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true // Required for client-side usage
});

export const generateBios = async (vibe: string, keywords: string): Promise<string[]> => {
  try {
    // Construct the prompt based on vibe and keywords
    const vibeDescriptions: Record<string, string> = {
      techie: 'tech-savvy, coding-focused, innovative, and digital-native',
      hustler: 'ambitious, driven, entrepreneurial, and success-oriented',
      creative: 'artistic, imaginative, expressive, and visually-minded',
      funny: 'humorous, witty, entertaining, and lighthearted',
      mysterious: 'enigmatic, intriguing, deep, and thought-provoking',
      minimalist: 'simple, clean, essential, and purposeful',
      adventurer: 'travel-loving, exploring, wanderlust, and experience-seeking',
      spiritual: 'faith-based, purposeful, grateful, and mindful',
      gamer: 'gaming-focused, competitive, digital culture, and achievement-oriented',
      entrepreneur: 'business-minded, innovative, risk-taking, and vision-driven',
      artist: 'creative, expressive, aesthetic, and passionate about art',
      savage: 'bold, unapologetic, confident, and authentically fierce'
    };

    const vibeDescription = vibeDescriptions[vibe] || 'unique and authentic';
    
    const systemPrompt = `You are a creative social media bio generator. Create short, catchy, and engaging bios that are perfect for social media profiles. Each bio should be:
- Under 150 characters
- Authentic and relatable
- Memorable and shareable
- Appropriate for platforms like Twitter, Instagram, TikTok
- Free of hashtags or @ mentions

Generate exactly 3 different bio options, each on a new line. Make them distinct from each other while maintaining the requested vibe.`;

    const userPrompt = keywords.trim() 
      ? `Create 3 ${vibeDescription} social media bios incorporating these details: ${keywords}`
      : `Create 3 ${vibeDescription} social media bios`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.9, // Higher creativity
      max_tokens: 300,
      top_p: 0.9
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response from Groq API');
    }

    // Split the response into individual bios and clean them up
    const bios = response
      .split('\n')
      .map(bio => bio.trim())
      .filter(bio => bio.length > 0)
      .map(bio => bio.replace(/^\d+\.\s*/, '')) // Remove numbering like "1. "
      .map(bio => bio.replace(/^[-*]\s*/, '')) // Remove bullet points
      .filter(bio => bio.length > 10) // Filter out very short responses
      .slice(0, 3); // Ensure we only return 3 bios

    // Fallback if we don't get enough bios
    if (bios.length === 0) {
      throw new Error('Failed to generate valid bios');
    }

    return bios;

  } catch (error) {
    console.error('Groq API error:', error);
    
    // Fallback to mock bios if API fails
    const fallbackBios = getFallbackBios(vibe, keywords);
    return fallbackBios;
  }
};

// Fallback function for when API fails
const getFallbackBios = (vibe: string, keywords: string): string[] => {
  const bioTemplates: Record<string, string[]> = {
    techie: [
      "Code warrior by day, debugging dreams by night ⚡",
      "Building the future one commit at a time 💻",
      "Turning caffeine into code since forever ☕"
    ],
    hustler: [
      "Sleep is for those who lack ambition 💪",
      "While you're dreaming, I'm scheming 🚀",
      "The grind never stops, success never sleeps ⚡"
    ],
    creative: [
      "Painting life with bold strokes and wild imagination 🎨",
      "Creating magic from chaos, one idea at a time ✨",
      "Art is my language, creativity is my compass 🌟"
    ],
    funny: [
      "Professional overthinker with a minor in dad jokes 😂",
      "I put the 'fun' in dysfunctional 🤪",
      "Making awkward situations even more awkward since birth 😅"
    ],
    mysterious: [
      "Some stories are better left untold 🌙",
      "Walking in shadows, dancing with secrets ✨",
      "What you see is just the beginning 🔮"
    ],
    minimalist: [
      "Less stuff. More life. ✨",
      "Quality over quantity, always 🤍",
      "Finding beauty in the essential 🌿"
    ],
    adventurer: [
      "Passport full of stamps, heart full of stories 🌍",
      "Life's an adventure, I'm the main character 🗺️",
      "Collecting memories, not things ✈️"
    ],
    spiritual: [
      "Walking in faith, guided by purpose 🙏",
      "Blessed and grateful, living with intention ✨",
      "Finding peace in prayer, strength in surrender 💫"
    ],
    gamer: [
      "Level 25 in life, still grinding for the perfect build 🎮",
      "Achievement unlocked: Turning passion into lifestyle 🏆",
      "Main character energy in a world full of NPCs ⚡"
    ],
    entrepreneur: [
      "Building empires from ideas 🚀",
      "Vision without execution is hallucination 💡",
      "Risk-taker, game-changer, future-maker ⚡"
    ],
    artist: [
      "Creating beauty in a chaotic world 🎭",
      "Art is my voice when words fail 🎨",
      "Making the world more beautiful, one piece at a time ✨"
    ],
    savage: [
      "No apologies for my authenticity 🔥",
      "Built different, think different, act different ⚡",
      "Zero tolerance for fake energy 💯"
    ]
  };

  const vibeBios = bioTemplates[vibe] || bioTemplates.techie;
  
  // If keywords provided, try to incorporate them
  if (keywords.trim()) {
    const customBio = `${keywords} | Living life on my own terms ✨`;
    return [customBio, ...vibeBios.slice(0, 2)];
  }
  
  return vibeBios;
};