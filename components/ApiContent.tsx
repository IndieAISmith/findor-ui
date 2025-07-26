import React, { useState } from 'react';
import { ApiEndpoint, CodeExample, Parameter } from '../types';
import { Badge } from './Badge';
import { CodeBlock } from './CodeBlock';

interface ApiContentProps {
  endpoint: ApiEndpoint;
}

const ParametersTable: React.FC<{ title: string, params: Parameter[] }> = ({ title, params }) => {
  if (params.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-zinc-300 mb-3">{title}</h3>
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-3 text-left font-medium text-zinc-400">Parameter</th>
              <th className="p-3 text-left font-medium text-zinc-400">Type</th>
              <th className="p-3 text-left font-medium text-zinc-400">Description</th>
            </tr>
          </thead>
          <tbody>
            {params.map((param) => (
              <tr key={param.name} className="border-t border-border">
                <td className="p-3 font-mono text-cyan-400">
                  {param.name}
                  {param.required && <span className="text-red-400 ml-2">required</span>}
                </td>
                <td className="p-3 font-mono text-amber-400">{param.type}</td>
                <td className="p-3 text-zinc-400">{param.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export const ApiContent: React.FC<ApiContentProps> = ({ endpoint }) => {
  const [activeTab, setActiveTab] = useState<CodeExample['language']>(endpoint.examples[0].language);

  const activeExample = endpoint.examples.find(ex => ex.language === activeTab);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="p-6 bg-card border border-border rounded-lg shadow-sm">
        <div className="prose prose-invert max-w-none prose-p:text-zinc-400 prose-headings:text-zinc-100">
          <header className="mb-8">
            <h2 className="text-2xl font-bold">{endpoint.title}</h2>
            <div className="flex items-center gap-4 mt-2">
              <Badge method={endpoint.method} />
              <code className="text-base text-zinc-400 font-mono bg-zinc-800/50 px-2 py-1 rounded">{endpoint.path}</code>
            </div>
            <p className="mt-4 text-zinc-400">{endpoint.description}</p>
          </header>

          <ParametersTable title="Path Parameters" params={endpoint.parameters.path} />
          <ParametersTable title="Query Parameters" params={endpoint.parameters.query} />
          <ParametersTable title="Body Parameters" params={endpoint.parameters.body} />
          
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Responses</h3>
              {endpoint.responses.map(response => (
                  <div key={response.status} className="mb-6">
                      <p className="font-medium text-zinc-300"><span className={`font-mono mr-2 ${response.status >= 400 ? 'text-red-400' : 'text-green-400'}`}>{response.status}</span> {response.description}</p>
                      <CodeBlock language="json" code={response.example} smallText={true} />
                  </div>
              ))}
          </div>
        </div>
      </div>


      <div className="sticky top-6 lg:top-8 self-start">
        <div className="bg-zinc-900 border border-border rounded-lg">
          <div className="flex items-center border-b border-border p-2">
            {endpoint.examples.map(ex => (
              <button
                key={ex.language}
                onClick={() => setActiveTab(ex.language)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeTab === ex.language
                    ? 'bg-zinc-800 text-white'
                    : 'text-muted-foreground hover:text-white'
                }`}
              >
                {ex.language}
              </button>
            ))}
          </div>
          <div className="p-1">
             {activeExample && <CodeBlock language={activeExample.language.toLowerCase() as any} code={activeExample.code} />}
          </div>
        </div>
      </div>
    </div>
  );
};
