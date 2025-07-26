import React, { useState, useMemo, useEffect } from 'react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/clerk-react';
import { API_ENDPOINTS, API_OVERVIEW } from './constants';
import { Sidebar } from './components/Sidebar';
import { ApiContent } from './components/ApiContent';
import { ApiEndpoint, ApiOverview } from './types';
import { Icon } from './components/Icon';
import { CodeBlock } from './components/CodeBlock';
import { ApiKeysPage } from './components/ApiKeysPage';

// --- Inlined Header Component ---
interface HeaderProps {
  onTitleClick: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onTitleClick, onToggleSidebar, isSidebarOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between" aria-label="Global">
        <div className="flex items-center gap-4">
          <button
              className="lg:hidden p-2 -ml-2 text-muted-foreground"
              onClick={onToggleSidebar}
              aria-label="Toggle menu"
          >
              {isSidebarOpen ? <Icon name="x" className="w-6 h-6" /> : <Icon name="menu" className="w-6 h-6" />}
          </button>
          <button onClick={onTitleClick} className="text-lg font-medium text-foreground">
            API Docs
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <a href="https://github.com/google-gemini/cookbook/tree/main/frontend-docs-style-guide" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" className="text-muted-foreground hover:text-foreground">
            <Icon name="github" className="h-5 w-5" />
          </a>
          <SignedOut>
            <div className="flex items-center gap-2">
              <SignInButton>
                <button className="px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-foreground border border-border rounded-md hover:bg-accent transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};


// --- Inlined ApiOverviewComponent ---

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <section className="mb-8 p-6 bg-card border border-border rounded-lg shadow-sm">
    <h3 className="text-xl font-semibold text-zinc-200 mb-4">{title}</h3>
    <div className="text-zinc-400 space-y-3">{children}</div>
  </section>
);

interface ApiOverviewProps {
  overview: ApiOverview;
}

const ApiOverviewComponent: React.FC<ApiOverviewProps> = ({ overview }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-12">
        <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-400">
          {overview.title}
        </h2>
        <p className="mt-4 text-lg text-zinc-400 max-w-3xl">{overview.description}</p>
      </header>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
            <Section title="Base URL">
                <p>All API requests should be made to the following base URL:</p>
                <CodeBlock language="text" code={overview.baseUrl} smallText={true} />
            </Section>
            
            <Section title="Authentication">
                <p>{overview.authentication}</p>
                <CodeBlock language="bash" code="Authorization: Bearer <your_api_token>" smallText={true} />
            </Section>

            <Section title="Rate Limiting & Support">
                <p className="mb-2">{overview.rateLimiting}</p>
                <p>{overview.support}</p>
            </Section>
        </div>

        <div className="xl:col-span-1">
            <div className="sticky top-8 self-start space-y-8">
                <Section title="Best Practices">
                    <ul className="list-disc list-inside space-y-2">
                        {overview.bestPractices.map((practice, index) => <li key={index}>{practice}</li>)}
                    </ul>
                </Section>
                <Section title="Notes">
                    <ul className="list-disc list-inside space-y-2">
                        {overview.notes.map((note, index) => <li key={index}>{note}</li>)}
                    </ul>
                </Section>
            </div>
        </div>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const selectedEndpoint = useMemo((): ApiEndpoint | undefined => {
    if (selectedId === 'overview' || selectedId === 'api-keys') return undefined;
    const allEndpoints = API_ENDPOINTS.flatMap(group => group.endpoints);
    return allEndpoints.find(endpoint => endpoint.id === selectedId);
  }, [selectedId]);
  
  // Effect to handle window resizing
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleResize = () => {
      if (mediaQuery.matches) {
        setIsSidebarOpen(false); // Close sidebar when switching to desktop view
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    // Close sidebar on selection in mobile view
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };


  const renderContent = () => {
    if (selectedId === 'overview') {
      return <ApiOverviewComponent overview={API_OVERVIEW} />;
    }
    if (selectedId === 'api-keys') {
      return (
        <SignedIn>
          <ApiKeysPage />
        </SignedIn>
      );
    }
    if (selectedEndpoint) {
      return <ApiContent key={selectedId} endpoint={selectedEndpoint} />;
    }
    return (
      <div className="flex flex-col items-center justify-center h-full text-zinc-500 text-center">
        <Icon name="search" className="w-16 h-16 mb-4" />
        <h2 className="text-2xl font-bold">Endpoint Not Found</h2>
        <p>The selected endpoint could not be found. Please select one from the sidebar.</p>
      </div>
    );
  };

  return (
    <div className="bg-background text-foreground font-sans">
      <Header 
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onTitleClick={() => handleSelect('overview')}
      />
      <div className="flex h-[calc(100vh-4rem)] mt-16">
        {isSidebarOpen && (
           <div
              className="lg:hidden fixed inset-0 bg-black/60 z-10 mt-16"
              onClick={() => setIsSidebarOpen(false)}
              aria-hidden="true"
          />
        )}

        <Sidebar
          endpointGroups={API_ENDPOINTS}
          activeId={selectedId}
          isOpen={isSidebarOpen}
          onSelect={handleSelect}
        />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;