
import { ApiEndpoint, ApiEndpointGroup, ApiOverview, CodeExample, HttpMethod, Parameter } from './types';

const DOCS_DATA = {
  "title": "Findor API SaaS Documentation",
  "description": "Findor API provides AI-powered web search, question answering, search suggestions, and web scraping for SaaS integrations.",
  "base_url": "https://findor.vercel.app/",
  "authentication": "Use Bearer token in Authorization header: Authorization: Bearer <your_api_token>",
  "best_practices": [
    "Use HTTPS",
    "Handle errors gracefully",
    "Respect rate limits",
    "Cache results where appropriate",
    "Monitor usage in dashboard"
  ],
  "endpoints": [
    {
      "name": "Health Check",
      "method": "GET",
      "path": "/health",
      "description": "Check API status",
      "response_example": {
        "status": "healthy",
        "timestamp": 1703123456.789,
        "environment": "production"
      }
    },
    {
      "name": "Web Search",
      "method": "POST",
      "path": "/search",
      "description": "Perform a web search",
      "request_body": {
        "search_query": "string (required)",
        "num_of_results": "integer (optional, default: 4)"
      },
      "response_example": {
        "results": [
          {
            "url": "https://example.com/ai-trends",
            "title": "Latest AI Trends 2024",
            "published_at": "2024-01-15"
          }
        ],
        "response_id": "req_123456"
      }
    },
    {
      "name": "Search Suggestions",
      "method": "POST",
      "path": "/search/suggestions",
      "description": "Get search suggestions",
      "request_body": {
        "search_query": "string (required)"
      },
      "response_example": {
        "queries": [
          {
            "query": "Lean Python Agentic AI for Task Automation",
            "description": "Efficient automation with Lean Python and Agentic AI"
          }
        ]
      }
    },
    {
      "name": "AI Answer",
      "method": "POST",
      "path": "/search/answer",
      "description": "Get AI-generated answer",
      "request_body": {
        "search_query": "string (required)"
      },
      "response_example": {
        "result": "Quantum computing is a type of computation that harnesses..."
      }
    },
    {
      "name": "YouTube Scraper",
      "method": "POST",
      "path": "/youtube/scraper",
      "description": "This endpoint allows you to scrape YouTube for videos based on a search query.",
      "request_body": {
        "video_title": "string (required)"
      },
      "response_example": [
        {
            "id": "https://www.youtube.com/watch?v=4GDQYgxsSxo",
            "title": "हलवाई जैसा फाफड़ा बनाने का तरीका |Gujarati Fafda ki recipe ...",
            "url": "https://www.youtube.com/watch?v=4GDQYgxsSxo",
            "publishedDate": "2020-08-09T04:09:41.353Z",
            "author": null
        },
        {
            "id": "https://www.youtube.com/shorts/QAZfg-DEegI",
            "title": "Gujarati Fafda Recipe | Easy and perfect way to make Gujarati ...",
            "url": "https://www.youtube.com/shorts/QAZfg-DEegI",
            "publishedDate": "2025-07-19T04:09:41.353Z",
            "author": null
        },
        {
            "id": "https://www.youtube.com/watch?v=C5xTHQtWBDM",
            "title": "Fafda recipe|How to make Fafda| Gujrati fada recipe|Cooking ...",
            "url": "https://www.youtube.com/watch?v=C5xTHQtWBDM",
            "publishedDate": "2020-08-09T04:09:41.353Z",
            "author": null
        }
      ]
    },
	{
      "name": "Website Scraper",
      "method": "POST",
      "path": "/website/scraper",
      "description": "This endpoint allows you to scrape the content of a given website URL.",
      "request_body": {
        "website_url": "string (required)"
      },
      "response_example": [
        {
            "id": "https://copilot.microsoft.com/",
            "title": "Microsoft Copilot: Your everyday AI companion",
            "url": "https://copilot.microsoft.com",
            "publishedDate": "2010-01-01T00:00:00.000Z",
            "author": "",
            "text": "## Hi there. What should we dive into today?",
            "summary": "I am an AI companion.\n"
        }
      ]
    },
    {
      "name": "News Scraper",
      "method": "POST",
      "path": "/news/scraper",
      "description": "This endpoint allows you to scrape news articles based on a search query.",
      "request_body": {
        "search": "string (required)"
      },
      "response_example": [
        {
            "id": "https://apnews.com/article/imf-world-economy-trump-tariff-china-f384c9c165b0c7152edb53d66a9ebd6b",
            "title": "IMF upgrades outlook for global economy, citing less-than- ...",
            "url": "https://apnews.com/article/imf-world-economy-trump-tariff-china-f384c9c165b0c7152edb53d66a9ebd6b",
            "publishedDate": "2025-07-29T13:00:36.000Z",
            "author": "By PAUL WISEMAN",
            "text": "WASHINGTON (AP) — The International Monetary Fund is upgrading the economic outlook for the United States and the world this year and next because President Donald Trump’s protectionist trade policies have so far proven less damaging than expected... [Content trimmed for brevity]",
            "image": "https://dims.apnews.com/dims4/default/dcac1a4/2147483647/strip/true/crop/700x394+0+28/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F90%2F29%2F4e3c1cc7446089a9101a7bdff4c8%2Fdefaultshareimage-copy.png",
            "favicon": "https://apnews.com/apple-touch-icon.png"
        },
        {
            "id": "https://www.youtube.com/watch?v=R0pnn6dMLEU",
            "title": "Trump Tariff: China Demands US End Unilateral ...",
            "url": "https://www.youtube.com/watch?v=R0pnn6dMLEU",
            "publishedDate": "2025-05-29T00:00:00.000Z",
            "author": "WION",
            "text": "© 2025 Google LLC",
            "favicon": "https://www.youtube.com/s/desktop/ba3a814f/img/logos/favicon_32x32.png"
        },
        {
            "id": "https://fortune.com/2025/04/07/trump-tariff-china-50-percent-retaliation-trade-war-stock-selloff/",
            "title": "Trump threatens to add another 50% tariff on China ...",
            "url": "https://fortune.com/2025/04/07/trump-tariff-china-50-percent-retaliation-trade-war-stock-selloff/",
            "publishedDate": "2025-04-07T00:00:00.000Z",
            "author": "Jason Ma",
            "text": "The U.S.-China trade war could get a lot hotter as President Donald Trump threatened Beijing with an additional 50% tariff unless it backs down from retaliating against his earlier tariff... [Content trimmed for brevity]",
            "image": "https://fortune.com/img-assets/wp-content/uploads/2025/04/GettyImages-1152691919-e1744041673941.jpg?resize=1200,600",
            "favicon": "https://fortune.com/icons/favicons/favicon.ico"
        }
      ]
    },
    {
      "name": "LinkedIn Scraper",
      "method": "POST",
      "path": "/linkedin/scraper",
      "description": "This endpoint allows you to scrape LinkedIn for profiles based on a name.",
      "request_body": {
        "profile_name": "string (required)"
      },
      "response_example": [
        {
            "id": "https://in.linkedin.com/in/amitabh-bachchan-06767a23",
            "title": "Amitabh Bachchan - Bollywood",
            "url": "https://in.linkedin.com/in/amitabh-bachchan-06767a23",
            "publishedDate": "2025-01-01T00:00:00.000Z",
            "author": "",
            "text": "LinkedIn and 3rd parties use essential and non-essential cookies to provide, secure, analyze and improve our Services, and to show you relevant ads... [Content trimmed for brevity]",
            "image": "https://static.licdn.com/aero-v1/sc/h/1c5u578iilxfi4m4dvc4q810q"
        }
      ]
    },
    {
      "name": "Citation Scraper",
      "method": "POST",
      "path": "/search/scraper",
      "description": "Extract citations and references",
      "request_body": {
        "search_query": "string (required)"
      },
      "response_example": [
        {
          "id": "https://editorial.rottentomatoes.com/article/the-most-anticipated-movies-of-2025",
          "title": "The Most Anticipated Movies of 2025 - Rotten Tomatoes",
          "url": "https://editorial.rottentomatoes.com/article/the-most-anticipated-movies-of-2025",
          "publishedDate": "2025-06-24T18:44:51.544Z",
          "text": "Calendar of movies...",
          "snippet": "Plan your movies...",
          "image": "https://editorial.rottentomatoes.com/wp-content/uploads/2025/05/600_WickedForGood.jpg?w=600",
          "favicon": "https://editorial.rottentomatoes.com/wp-content/themes/RottenTomatoes/images/icons/favicon.ico"
        }
      ]
    }
  ],
  "rate_limiting": "Rate limits apply. Exceeding quota returns 429 Too Many Requests. Monitor usage in your dashboard.",
  "support": "Contact support via developer portal or email. Include API key and request details for urgent issues.",
  "notes": [
    "All requests and responses use JSON.",
    "Keep your API key secure.",
    "Designed for web apps, chatbots, and knowledge bases."
  ]
};

// --- Transformation Logic ---

const parseParam = (paramString: string): { type: string; required: boolean; description: string } => {
    const required = paramString.includes('(required)');
    const type = paramString.split(' ')[0];
    const description = paramString.replace('(required)', '').replace('(optional,', 'Optional,').trim();
    return { type, required, description };
};

const getPlaceholderValue = (type: string) => {
  switch (type) {
    case 'integer': return 4;
    case 'string': return 'your_search_query';
    default: return 'value';
  }
};

const createCodeExamples = (endpoint: any, baseUrl: string): CodeExample[] => {
    const fullUrl = `${baseUrl.slice(0, -1)}${endpoint.path}`;
    const method = endpoint.method.toUpperCase();
    const hasBody = (method === 'POST' || method === 'PUT' || method === 'PATCH') && endpoint.request_body;
    
    const bodyObject = hasBody ? Object.keys(endpoint.request_body).reduce((acc, key) => {
        const { type } = parseParam(endpoint.request_body[key]);
        acc[key] = getPlaceholderValue(type);
        return acc;
    }, {} as Record<string, any>) : {};
    
    const prettyBody = hasBody ? JSON.stringify(bodyObject, null, 2) : '';

    // cURL
    const curlBody = hasBody ? ` \\\n  -d '${prettyBody}'` : '';
    const curl = `curl -X ${method} "${fullUrl}" \\
  -H "Authorization: Bearer <your_api_token>"${hasBody ? ` \\
  -H "Content-Type: application/json"` : ''}${curlBody}`;

    // JavaScript
    const jsBody = hasBody ? `,\n  body: JSON.stringify(${prettyBody})` : '';
    const js = `fetch('${fullUrl}', {
  method: '${method}',
  headers: {
    'Authorization': 'Bearer <your_api_token>'${hasBody ? ",\n    'Content-Type': 'application/json'" : ''}
  }${jsBody}
})
.then(response => response.json())
.then(data => console.log(data));`;

    // Python
    const pythonBody = hasBody ? `data = ${JSON.stringify(bodyObject, null, 4)}` : '';
    const pythonMethod = `requests.${endpoint.method.toLowerCase()}`;
    const pythonJsonParam = hasBody ? ', json=data' : '';
    const python = `import requests
${hasBody ? '\n' : ''}
url = "${fullUrl}"
headers = {
    "Authorization": "Bearer <your_api_token>"${hasBody ? ",\n    'Content-Type': 'application/json'" : ''}
}${pythonBody ? `\n${pythonBody}` : ''}

response = ${pythonMethod}(url, headers=headers${pythonJsonParam})

print(response.json())`;

    return [
        { language: 'cURL', code: curl },
        { language: 'JavaScript', code: js },
        { language: 'Python', code: python },
    ];
};

// --- Transformed Data Exports ---

export const API_OVERVIEW: ApiOverview = {
  title: DOCS_DATA.title,
  description: DOCS_DATA.description,
  baseUrl: DOCS_DATA.base_url,
  authentication: DOCS_DATA.authentication,
  bestPractices: DOCS_DATA.best_practices,
  rateLimiting: DOCS_DATA.rate_limiting,
  support: DOCS_DATA.support,
  notes: DOCS_DATA.notes
};

const transformedEndpoints: ApiEndpoint[] = DOCS_DATA.endpoints.map(endpoint => {
  const bodyParams: Parameter[] = endpoint.request_body ? Object.entries(endpoint.request_body).map(([name, desc]) => {
    const { type, required, description } = parseParam(desc as string);
    return {
      name,
      type,
      description,
      required,
    };
  }) : [];

  return {
    id: endpoint.name.toLowerCase().replace(/\s+/g, '-'),
    title: endpoint.name,
    description: endpoint.description,
    method: endpoint.method.toUpperCase() as HttpMethod,
    path: endpoint.path,
    parameters: {
      path: [],
      query: [],
      body: bodyParams,
    },
    responses: [
      {
        status: 200,
        description: 'Successful Response',
        example: JSON.stringify(endpoint.response_example, null, 2),
      },
       {
        status: 401,
        description: 'Unauthorized - Invalid API token.',
        example: JSON.stringify({ error: 'Invalid API token.' }, null, 2),
      },
      {
        status: 429,
        description: 'Too Many Requests - Rate limit exceeded.',
        example: JSON.stringify({ error: 'Rate limit exceeded.' }, null, 2),
      }
    ],
    examples: createCodeExamples(endpoint, DOCS_DATA.base_url),
  };
});

export const API_ENDPOINTS: ApiEndpointGroup[] = [
    {
        group: 'API',
        endpoints: transformedEndpoints,
    },
];
