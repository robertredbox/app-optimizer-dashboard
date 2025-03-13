// Define the routing target structure
interface RoutingTarget {
  tabId: string;
  sectionId: string;
  highlightEffect?: boolean;
  dataPoint?: string; // Optional specific data point to highlight within section
}

// Map AppTweak MCP functions to dashboard routing targets
export const mcpRoutingMap: Record<string, RoutingTarget> = {
  // App Details MCPs
  "search_app": { tabId: "overview", sectionId: "app-info", highlightEffect: true },
  "get_app_details": { tabId: "overview", sectionId: "app-info", highlightEffect: true },
  
  // Review MCPs
  "get_reviews": { tabId: "reviews", sectionId: "recent-reviews", highlightEffect: true },
  "get_top_displayed_reviews": { tabId: "reviews", sectionId: "featured-reviews", highlightEffect: true },
  "search_reviews": { tabId: "reviews", sectionId: "review-search", highlightEffect: true },
  "get_review_stats": { tabId: "reviews", sectionId: "review-statistics", highlightEffect: true },
  "analyze_ratings": { tabId: "reviews", sectionId: "rating-analysis", highlightEffect: true },
  
  // Keyword MCPs
  "discover_keywords": { tabId: "keywords", sectionId: "keyword-discovery", highlightEffect: true },
  "track_keyword_rankings": { tabId: "keywords", sectionId: "ranking-trends", highlightEffect: true },
  "get_keyword_stats": { tabId: "keywords", sectionId: "keyword-performance", highlightEffect: true },
  "get_keyword_volume_history": { tabId: "keywords", sectionId: "volume-trends", highlightEffect: true },
  "analyze_top_keywords": { tabId: "keywords", sectionId: "top-keywords", highlightEffect: true },
  "get_category_top_keywords": { tabId: "keywords", sectionId: "category-analysis", highlightEffect: true },
  "get_trending_keywords": { tabId: "keywords", sectionId: "trending-keywords", highlightEffect: true },
  
  // Competitor MCPs
  "get_competitors": { tabId: "competitors", sectionId: "competitor-discovery", highlightEffect: true },
  "analyze_competitive_position": { tabId: "competitors", sectionId: "competitive-analysis", highlightEffect: true },
  "compare_apps": { tabId: "competitors", sectionId: "app-comparison", highlightEffect: true },
  
  // Download/Install MCPs
  "get_downloads": { tabId: "overview", sectionId: "download-statistics", highlightEffect: true },
  
  // Category MCPs
  "track_category_rankings": { tabId: "overview", sectionId: "category-performance", highlightEffect: true },
  
  // Additional MCPs
  "get_keyword_ranking_history": { tabId: "keywords", sectionId: "ranking-history", highlightEffect: true },
  "analyze_market_share": { tabId: "competitors", sectionId: "market-share", highlightEffect: true },
  "compare_features": { tabId: "competitors", sectionId: "feature-comparison", highlightEffect: true },
  "get_keyword_bidding_history": { tabId: "keywords", sectionId: "bidding-history", highlightEffect: true }
};