#!/usr/bin/env python3
"""
Example usage of the Grok AI Tweets Searcher

This script demonstrates different ways to use the GrokTweetSearcher class.
"""

from grok_ai_tweets import GrokTweetSearcher
import os


def example_basic_usage():
    """Basic usage example."""
    print("=== Basic Usage Example ===")
    
    # Initialize with API key
    api_key = os.getenv("XAI_API_KEY", "your_xai_api_key_here")
    searcher = GrokTweetSearcher(api_key)
    
    # Search for tweets
    result = searcher.search_tweets()
    
    if result:
        print("✅ Search completed!")
        print(result[:500] + "..." if len(result) > 500 else result)
    else:
        print("❌ Search failed")


def example_custom_model():
    """Example using a different model."""
    print("\n=== Custom Model Example ===")
    
    api_key = os.getenv("XAI_API_KEY", "your_xai_api_key_here")
    searcher = GrokTweetSearcher(api_key)
    
    # Use grok-3-mini for faster, cheaper results
    result = searcher.search_tweets(model="grok-3-mini")
    
    if result:
        print("✅ Search with grok-3-mini completed!")
        print(result[:300] + "..." if len(result) > 300 else result)
    else:
        print("❌ Search failed")


def example_custom_payload():
    """Example with custom payload parameters."""
    print("\n=== Custom Payload Example ===")
    
    api_key = os.getenv("XAI_API_KEY", "your_xai_api_key_here")
    searcher = GrokTweetSearcher(api_key)
    
    # Create custom prompt
    custom_prompt = """
    Search X for the 10 most recent tweets about ChatGPT in Portuguese from Brazil.
    Use advanced search: lang:pt place_country:BR filter:safe -filter:replies
    For each tweet, show: username, tweet text, like count, and link.
    Format as a simple list.
    """
    
    # Create payload with custom parameters
    payload = searcher.create_payload(
        prompt=custom_prompt,
        model="grok-3-mini",
        temperature=0.5,
        max_tokens=1000
    )
    
    print("Custom payload created:")
    print(f"Model: {payload['model']}")
    print(f"Temperature: {payload['temperature']}")
    print(f"Max tokens: {payload['max_tokens']}")


def example_error_handling():
    """Example showing error handling."""
    print("\n=== Error Handling Example ===")
    
    # Try with invalid API key
    searcher = GrokTweetSearcher("invalid_key")
    result = searcher.search_tweets()
    
    if result is None:
        print("✅ Error handling working correctly - invalid key detected")


if __name__ == "__main__":
    print("🚀 Grok AI Tweets Searcher - Example Usage")
    print("=" * 60)
    
    # Run examples
    example_basic_usage()
    example_custom_model()
    example_custom_payload()
    example_error_handling()
    
    print("\n" + "=" * 60)
    print("✅ All examples completed!")
    print("\nTo run the main script:")
    print("python grok_ai_tweets.py")
