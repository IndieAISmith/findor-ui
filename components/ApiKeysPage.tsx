import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { ApiKey } from '../types';
import { Icon } from './Icon';
import { createApiKey, listApiKeys, deleteApiKey, createUser } from '../services/api';

interface ApiKeysPageProps {}

const generateApiKey = () => `sk_${[...Array(32)].map(() => Math.random().toString(36)[2]).join('')}`;

const Modal: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({ children, onClose }) => (
  <div 
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" 
    aria-modal="true" 
    role="dialog"
    onClick={onClose}
  >
    <div className="bg-popover text-popover-foreground rounded-lg border border-border shadow-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>
);

const CreateKeyModal: React.FC<{
  onClose: () => void;
  onCreate: (name: string) => Promise<void>;
}> = ({ onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && !isCreating) {
      setIsCreating(true);
      try {
        await onCreate(name.trim());
      } finally {
        setIsCreating(false);
      }
    }
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="p-6">
          <h3 className="text-lg font-semibold">Create new secret key</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Give your key a name to help you identify it later.
          </p>
          <div className="mt-4">
            <label htmlFor="key-name" className="sr-only">Key name</label>
            <input
              id="key-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., My Test App"
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
              autoFocus
            />
          </div>
        </div>
        <div className="bg-muted/50 px-6 py-4 flex justify-end gap-3 rounded-b-lg">
          <button 
            type="button" 
            onClick={onClose} 
            disabled={isCreating}
            className="px-4 py-2 text-sm font-medium rounded-md border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isCreating || !name.trim()}
            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isCreating && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
            {isCreating ? 'Creating...' : 'Create key'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

const ShowKeyModal: React.FC<{ keyInfo: ApiKey; onClose: () => void }> = ({ keyInfo, onClose }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(keyInfo.key);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      };

  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        <h3 className="text-lg font-semibold">Secret key created</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Here is your new secret key. This is the only time you will see it. Please copy and store it in a secure place.
        </p>
        <div className="mt-4 bg-zinc-900/50 rounded-lg relative group my-4 p-4 pr-12 font-mono text-sm text-foreground break-all">
          {keyInfo.key}
          <button
            onClick={handleCopy}
            className="absolute top-1/2 -translate-y-1/2 right-2 p-1.5 bg-zinc-700/50 rounded-md text-zinc-400 hover:bg-zinc-600/80 hover:text-white"
            aria-label="Copy key"
          >
            {isCopied ? <Icon name="check" className="w-5 h-5 text-green-400" /> : <Icon name="copy" className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <div className="bg-muted/50 px-6 py-4 flex justify-end rounded-b-lg">
        <button onClick={onClose} className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90">Done</button>
      </div>
    </Modal>
  );
};

const DeleteKeyModal: React.FC<{
  keyInfo: ApiKey;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}> = ({ keyInfo, onClose, onConfirm, isDeleting }) => {
  const handleConfirm = async () => {
    if (!isDeleting) {
      await onConfirm();
    }
  };

  return (
    <Modal onClose={isDeleting ? () => {} : onClose}>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-destructive-foreground">Delete API Key</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Are you sure you want to delete the key named <strong className="text-foreground">{keyInfo.name}</strong>?
          This action is irreversible.
        </p>
      </div>
      <div className="bg-muted/50 px-6 py-4 flex justify-end gap-3 rounded-b-lg">
        <button 
          onClick={onClose} 
          disabled={isDeleting}
          className="px-4 py-2 text-sm font-medium rounded-md border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button 
          onClick={handleConfirm}
          disabled={isDeleting}
          className="px-4 py-2 text-sm font-medium bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isDeleting && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
          {isDeleting ? 'Deleting...' : 'Delete Key'}
        </button>
      </div>
    </Modal>
  );
};

export const ApiKeysPage: React.FC<ApiKeysPageProps> = () => {
  const { user } = useUser();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<ApiKey | null>(null);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<ApiKey | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreatingKey, setIsCreatingKey] = useState(false);
  const [isDeletingKey, setIsDeletingKey] = useState(false);
  const [backgroundRefreshing, setBackgroundRefreshing] = useState(false);

  // Create user on first load if needed and fetch API keys
  useEffect(() => {
    const initializeUser = async () => {
      if (!user?.emailAddresses?.[0]?.emailAddress) return;
      
      const email = user.emailAddresses[0].emailAddress;
      
      try {
        setLoading(true);
        setError(null);
        
        // Try to create user (will succeed if user doesn't exist, fail silently if exists)
        try {
          await createUser(email);
        } catch (err) {
          // User might already exist, continue to fetch keys
          console.log('User might already exist, continuing...');
        }
        
        // Fetch existing API keys
        await fetchApiKeys();
      } catch (err) {
        console.error('Error initializing user:', err);
        setError('Failed to initialize user data');
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, [user]);

  // Background refresh every 30 seconds when component is visible
  useEffect(() => {
    if (!user?.emailAddresses?.[0]?.emailAddress || loading) return;

    const interval = setInterval(() => {
      fetchApiKeys(true);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [user, loading]);

  const fetchApiKeys = async (isBackground = false) => {
    if (!user?.emailAddresses?.[0]?.emailAddress) return;
    
    const email = user.emailAddresses[0].emailAddress;
    
    try {
      if (isBackground) {
        setBackgroundRefreshing(true);
      }
      
      const keys = await listApiKeys(email);
      const formattedKeys: ApiKey[] = keys.map((key, index) => ({
        id: `key_${index}_${Date.now()}`,
        name: `API Key ${index + 1}`, // Since backend doesn't return names
        key: key.key,
        createdAt: key.created_at,
      }));
      setApiKeys(formattedKeys);
      
      if (!isBackground) {
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching API keys:', err);
      if (!isBackground) {
        setError('Failed to fetch API keys');
      }
    } finally {
      if (isBackground) {
        setBackgroundRefreshing(false);
      }
    }
  };
  
  const handleCreateKey = async (name: string) => {
    if (!user?.emailAddresses?.[0]?.emailAddress || isCreatingKey) return;
    
    const email = user.emailAddresses[0].emailAddress;
    
    try {
      setIsCreatingKey(true);
      setError(null);
      const response = await createApiKey(email);
      
      const newKey: ApiKey = {
        id: `key_${Date.now()}`,
        name,
        key: response.secret,
        createdAt: new Date(response.created_at * 1000).toISOString(),
      };
      
      setCreateModalOpen(false);
      setNewlyCreatedKey(newKey);
      
      // Refresh the API keys list from server to ensure consistency
      await fetchApiKeys(true);
    } catch (err) {
      console.error('Error creating API key:', err);
      setError('Failed to create API key');
    } finally {
      setIsCreatingKey(false);
    }
  };
  
  const handleDeleteKey = async () => {
    if (!keyToDelete || !user?.emailAddresses?.[0]?.emailAddress || isDeletingKey) return;
    
    const email = user.emailAddresses[0].emailAddress;
    
    try {
      setIsDeletingKey(true);
      setError(null);
      await deleteApiKey(email, keyToDelete.key);
      setKeyToDelete(null);
      
      // Refresh the API keys list from server to ensure consistency
      await fetchApiKeys(true);
    } catch (err) {
      console.error('Error deleting API key:', err);
      setError('Failed to delete API key');
    } finally {
      setIsDeletingKey(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your API keys...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight">API Keys</h2>
            {backgroundRefreshing && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-muted-foreground"></div>
                <span>Syncing...</span>
              </div>
            )}
          </div>
          <p className="mt-1 text-muted-foreground">Manage your secret keys for accessing the API.</p>
        </div>
        <button
          onClick={() => setCreateModalOpen(true)}
          disabled={loading || isCreatingKey}
          className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 self-start sm:self-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Create new secret key
        </button>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      )}

      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-medium">Your Keys</h3>
        </div>
        <div>
          {apiKeys.length > 0 ? (
            apiKeys.map(apiKey => (
              <div key={apiKey.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b border-border last:border-b-0">
                <div>
                  <p className="font-medium text-foreground">{apiKey.name}</p>
                  <p className="text-sm text-muted-foreground font-mono mt-1">{apiKey.key.startsWith('qsk-') ? `${apiKey.key.slice(0, 8)}...${apiKey.key.slice(-4)}` : `sk...${apiKey.key.slice(-4)}`}</p>
                </div>
                <div className="flex items-center gap-4 self-end sm:self-center">
                    <p className="text-sm text-muted-foreground">
                        Created on {new Date(apiKey.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <button onClick={() => setKeyToDelete(apiKey)} className="text-muted-foreground hover:text-destructive-foreground p-1" aria-label={`Delete key ${apiKey.name}`}>
                        <Icon name="trash" className="w-5 h-5"/>
                    </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-12 text-muted-foreground">
              <p>You haven't created any API keys yet.</p>
            </div>
          )}
        </div>
      </div>
      
      {isCreateModalOpen && <CreateKeyModal onClose={() => setCreateModalOpen(false)} onCreate={handleCreateKey} />}
      {newlyCreatedKey && <ShowKeyModal keyInfo={newlyCreatedKey} onClose={() => setNewlyCreatedKey(null)} />}
      {keyToDelete && <DeleteKeyModal keyInfo={keyToDelete} onClose={() => setKeyToDelete(null)} onConfirm={handleDeleteKey} isDeleting={isDeletingKey} />}
    </div>
  );
};
