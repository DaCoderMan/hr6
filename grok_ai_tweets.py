#!/usr/bin/env python3
"""
Grok AI Tweets Searcher

This script uses the xAI Grok API to search for trending AI-related tweets in Portuguese
from Brazilian users. It retrieves the top 30 tweets based on engagement metrics.

Requirements:
- xAI API key with credits
- requests library (pip install requests)

Usage:
1. Replace 'your_xai_api_key_here' with your actual xAI API key
2. Run: python grok_ai_tweets.py
"""

import requests
import json
import os
from typing import Dict, Any, Optional
from datetime import datetime

# Import configuration
try:
    from config import *
except ImportError:
    # Fallback configuration if config.py doesn't exist
    API_KEY = "your_xai_api_key_here"
    MODEL = "grok-3"
    TEMPERATURE = 0.7
    MAX_TOKENS = 2000
    MIN_FAVES = 10
    LANGUAGE = "pt"
    COUNTRY = "BR"
    TWEET_COUNT = 30
    SAVE_TO_FILE = True
    FILE_ENCODING = "utf-8"
    SEARCH_TERMS = ["inteligência artificial", "IA", "artificial intelligence"]
    ADVANCED_FILTERS = ["filter:safe", "-filter:replies"]


class GrokTweetSearcher:
    """Class to handle Grok API interactions for tweet searching."""
    
    def __init__(self, api_key: str):
        """
        Initialize the GrokTweetSearcher.
        
        Args:
            api_key (str): Your xAI API key
        """
        self.api_key = api_key
        self.base_url = "https://api.x.ai/v1/chat/completions"
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
    
    def create_search_prompt(self) -> str:
        """
        Create the search prompt for finding trending HR tweets.
        
        Returns:
            str: Formatted search prompt
        """
        # Build search terms string
        search_terms_str = " OR ".join([f'"{term}"' for term in SEARCH_TERMS])
        
        # Build filters string
        filters_str = " ".join(ADVANCED_FILTERS)
        
        return f"""
Liste os tweets mais populares no momento sobre RH no Brazil, os que tem mais likes, diga os {TWEET_COUNT} mais, apenas liste os tweets, e diga quantos comentarios ou likes cada tweet tem.

Use advanced search: lang:{LANGUAGE} place_country:{COUNTRY} min_faves:{MIN_FAVES} {filters_str} sort by top engagement.
Search for these terms: {search_terms_str}

Para cada tweet, mostre: username, texto do tweet, número de likes, número de comentários/retweets, e link do tweet.
Formate como uma lista numerada.
"""
    
    def create_payload(self, prompt: str, model: str = None, temperature: float = None, max_tokens: int = None) -> Dict[str, Any]:
        """
        Create the API payload for the request.
        
        Args:
            prompt (str): The search prompt
            model (str): Grok model to use (grok-3, grok-3-mini, or grok-4)
            temperature (float): Creativity level (0.0 to 1.0)
            max_tokens (int): Maximum tokens for response
            
        Returns:
            Dict[str, Any]: API payload
        """
        # Use configuration defaults if not provided
        model = model or MODEL
        temperature = temperature or TEMPERATURE
        max_tokens = max_tokens or MAX_TOKENS
        
        return {
            "model": model,
            "messages": [{"role": "user", "content": prompt}],
            "temperature": temperature,
            "max_tokens": max_tokens
        }
    
    def search_tweets(self, model: str = None) -> Optional[str]:
        """
        Search for trending AI tweets using Grok API.
        
        Args:
            model (str): Grok model to use (uses config default if None)
            
        Returns:
            Optional[str]: API response content or None if error
        """
        try:
            prompt = self.create_search_prompt()
            payload = self.create_payload(prompt, model=model)
            
            print(f"🔍 Searching for trending HR tweets using {model}...")
            print(f"📅 Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            print("-" * 50)
            
            response = requests.post(
                self.base_url, 
                headers=self.headers, 
                data=json.dumps(payload),
                timeout=60
            )
            
            if response.status_code == 200:
                result = response.json()
                content = result["choices"][0]["message"]["content"]
                return content
            else:
                self._handle_error(response)
                return None
                
        except requests.exceptions.RequestException as e:
            print(f"❌ Network error: {e}")
            return None
        except json.JSONDecodeError as e:
            print(f"❌ JSON parsing error: {e}")
            return None
        except Exception as e:
            print(f"❌ Unexpected error: {e}")
            return None
    
    def _handle_error(self, response: requests.Response) -> None:
        """
        Handle API error responses.
        
        Args:
            response (requests.Response): The API response
        """
        print(f"❌ API Error: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 401:
            print("💡 Tip: Check your API key and ensure you have credits")
        elif response.status_code == 429:
            print("💡 Tip: Rate limit exceeded. Try again later")
        elif response.status_code == 400:
            print("💡 Tip: Check your request parameters")


def load_api_key() -> str:
    """
    Load API key from environment variable or configuration.
    
    Returns:
        str: API key
    """
    # Try to get from environment variable first
    api_key = os.getenv("XAI_API_KEY")
    if api_key:
        return api_key
    
    # Fallback to configuration or placeholder
    return API_KEY


def generate_html_page(tweets_text: str, timestamp: str) -> str:
    """
    Generates an HTML page displaying the tweet results.
    
    Args:
        tweets_text (str): The text output from the Grok API.
        timestamp (str): The timestamp for the filename.
        
    Returns:
        str: HTML content.
    """
    html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <title>HR Tweets Search Results - {timestamp}</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
        }}
        .container {{
            max-width: 800px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }}
        h1 {{
            color: #333;
            text-align: center;
            margin-bottom: 20px;
        }}
        .tweet-item {{
            border: 1px solid #eee;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 5px;
            background-color: #f9f9f9;
        }}
        .tweet-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }}
        .tweet-username {{
            font-weight: bold;
            color: #007bff;
        }}
        .tweet-text {{
            margin-top: 5px;
            color: #555;
        }}
        .tweet-stats {{
            font-size: 0.9em;
            color: #666;
        }}
        .tweet-link {{
            color: #007bff;
            text-decoration: none;
        }}
        .tweet-link:hover {{
            text-decoration: underline;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>HR Tweets Search Results - {timestamp}</h1>
        <p>Search Terms: {', '.join(SEARCH_TERMS)}</p>
        <p>Filters: {', '.join(ADVANCED_FILTERS)}</p>
        <hr>
        <h2>Tweets:</h2>
        {tweets_text}
    </div>
</body>
</html>
"""
    return html_content


def main():
    """Main function to execute the tweet search."""
    print("🚀 Grok HR Tweets Searcher")
    print("=" * 50)
    
    # Load API key
    api_key = load_api_key()
    
    if api_key == "your_xai_api_key_here":
        print("⚠️  Warning: Please replace 'your_xai_api_key_here' with your actual xAI API key")
        print("   You can also set the XAI_API_KEY environment variable or update config.py")
        print()
    
    # Initialize searcher
    searcher = GrokTweetSearcher(api_key)
    
    # Search for tweets
    result = searcher.search_tweets()
    
    if result:
        print("✅ Search completed successfully!")
        print("=" * 50)
        print(result)
        print("=" * 50)
        
        # Optionally save to file
        if SAVE_TO_FILE:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"rh_tweets_{timestamp}.txt"
            html_filename = f"rh_tweets_{timestamp}.html"
            
            try:
                # Save text file
                with open(filename, 'w', encoding=FILE_ENCODING) as f:
                    f.write(f"HR Tweets Search Results - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
                    f.write("=" * 50 + "\n")
                    f.write(f"Search Terms: {', '.join(SEARCH_TERMS)}\n")
                    f.write(f"Filters: {', '.join(ADVANCED_FILTERS)}\n")
                    f.write("=" * 50 + "\n")
                    f.write(result)
                print(f"💾 Results saved to: {filename}")
                
                # Generate HTML file
                html_content = generate_html_page(result, timestamp)
                with open(html_filename, 'w', encoding=FILE_ENCODING) as f:
                    f.write(html_content)
                print(f"🌐 HTML page saved to: {html_filename}")
                
            except Exception as e:
                print(f"⚠️  Could not save results to file: {e}")
        else:
            print("💾 File saving disabled in configuration")
    else:
        print("❌ Failed to retrieve tweets. Please check your API key and try again.")


if __name__ == "__main__":
    main()
