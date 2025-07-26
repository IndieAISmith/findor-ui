import React, { useState, useMemo } from 'react';
import { SignedIn } from '@clerk/clerk-react';
import { ApiEndpointGroup } from '../types';
import { Icon } from './Icon';
import { Badge } from './Badge';

interface SidebarProps {
  endpointGroups: ApiEndpointGroup[];
  activeId: string;
  isOpen: boolean;
  onSelect: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ endpointGroups, activeId, isOpen, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGroups = useMemo(() => {
    if (!searchTerm) {
      return endpointGroups;
    }
    return endpointGroups
      .map(group => {
        const filteredEndpoints = group.endpoints.filter(
          e =>
            e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return { ...group, endpoints: filteredEndpoints };
      })
      .filter(group => group.endpoints.length > 0);
  }, [endpointGroups, searchTerm]);

  return (
    <aside className={`fixed top-16 bottom-0 left-0 z-20 w-72 bg-background/95 backdrop-blur-sm border-r border-border flex flex-col transform transition-transform duration-300 ease-in-out lg:static lg:h-full lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="relative">
            <Icon name="search" className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-8"
              aria-label="Search endpoints"
            />
          </div>
        </div>

        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <button
              onClick={() => onSelect('overview')}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                activeId === 'overview'
                  ? 'bg-muted text-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <Icon name="home" className="h-4 w-4" />
              Home
            </button>
            <SignedIn>
              <button
                onClick={() => onSelect('api-keys')}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  activeId === 'api-keys'
                    ? 'bg-muted text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <Icon name="key" className="h-4 w-4" />
                API Keys
              </button>
            </SignedIn>

          {filteredGroups.length > 0 ? (
            filteredGroups.map(group => (
              <div key={group.group}>
                <h2 className="my-2 px-3 text-xs font-semibold text-muted-foreground tracking-wider uppercase">{group.group}</h2>
                <div className="grid grid-flow-row auto-rows-max text-sm gap-y-1">
                    {group.endpoints.map(endpoint => (
                    <button
                        key={endpoint.id}
                        onClick={() => onSelect(endpoint.id)}
                        className={`group flex w-full items-center justify-start gap-x-3 rounded-md px-3 py-2 transition-colors text-left ${
                            activeId === endpoint.id
                            ? 'bg-muted text-foreground font-medium'
                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                        }`}
                    >
                        <Badge method={endpoint.method} />
                        <span className="truncate">{endpoint.title}</span>
                    </button>
                    ))}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              <p>No results found for "{searchTerm}".</p>
            </div>
          )}
        </nav>
      </div>

      <div className="mt-auto border-t p-4">
        <div className="text-xs text-muted-foreground">
            <p>&copy; 2024 Findor. All rights reserved.</p>
        </div>
      </div>
    </aside>
  );
};