import React, { useState } from 'react';
import axios from 'axios';

const TranslateApp = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLang, setTargetLang] = useState('es'); // default to Spanish

  const languages = [
    /*{ code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' }, */
    { code: 'kn', name: 'Kannada' },
    { code: 'hi', name: 'Hindi' },
    { code: 'zh', name: 'Chinese' },
    // Add more languages as needed
  ];

  const handleTranslate = async () => {
    try {
      const options = {
        method: 'POST',
  url: 'https://google-translator9.p.rapidapi.com/v2',
  headers: {
    'x-rapidapi-key': 'b8576d589dmsh1a1ef65f910fc5bp1686c8jsnff08fcb5111b',
    'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
        data: new URLSearchParams({
          q: inputText,
          target: targetLang,
          source: 'en',
          "format": "text"
        }),
      };
console.log (inputText);
console.log(targetLang);
      const response = await axios.request(options);
      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error(error);
      setTranslatedText('Translation failed.');
    }
  };

  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-96 flex flex-col items-center space-y-4">
    <h1 className="text-2xl font-bold text-zinc-700">Text Translator</h1>

    <textarea
      className="w-full p-2 border border-gray-300 rounded"
      rows="4"
      placeholder="Enter English text here..."
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
    />

    <select
      className="w-full p-2 border border-gray-300 rounded"
      value={targetLang}
      onChange={(e) => setTargetLang(e.target.value)}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>

    <button
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      onClick={handleTranslate}
    >
      Translate
    </button>

    <textarea
      className="w-full p-2 border border-gray-300 rounded bg-gray-100"
      rows="4"
      readOnly
      value={translatedText}
      placeholder="Translated text will appear here..."
    />
  </div>
</div>
  );
};

export default TranslateApp;