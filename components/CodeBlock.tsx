
import React, { useState } from 'react';
import { Icon } from './Icon';

interface CodeBlockProps {
  language: string;
  code: string;
  smallText?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, code, smallText = false }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  const textClass = smallText ? 'text-xs' : 'text-sm';

  return (
    <div className="bg-zinc-900/50 rounded-lg relative group my-4">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 bg-zinc-700/50 rounded-md text-zinc-400 hover:bg-zinc-600/80 hover:text-white transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Copy code"
      >
        {isCopied ? <Icon name="check" className="w-4 h-4 text-green-400" /> : <Icon name="copy" className="w-4 h-4" />}
      </button>
      <pre className={`p-4 ${textClass} language-${language} overflow-x-auto`}>
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
};
