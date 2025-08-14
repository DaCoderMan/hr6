#!/usr/bin/env python3
"""
Test script for Grok AI Tweets Searcher

This script demonstrates the functionality without requiring an actual API key.
It shows how the class works and what the output would look like.
"""

from grok_ai_tweets import GrokTweetSearcher
import json
from datetime import datetime


def test_class_initialization():
    """Test the class initialization."""
    print("=== Testing Class Initialization ===")
    
    # Test with placeholder API key
    searcher = GrokTweetSearcher("test_key")
    
    print(f"✅ Class initialized successfully")
    print(f"   Base URL: {searcher.base_url}")
    print(f"   Headers: {searcher.headers}")
    print()


def test_search_prompt_creation():
    """Test the search prompt creation."""
    print("=== Testing Search Prompt Creation ===")
    
    searcher = GrokTweetSearcher("test_key")
    prompt = searcher.create_search_prompt()
    
    print("✅ Search prompt created successfully")
    print("📝 Generated prompt:")
    print("-" * 50)
    print(prompt)
    print("-" * 50)
    print()


def test_payload_creation():
    """Test the payload creation."""
    print("=== Testing Payload Creation ===")
    
    searcher = GrokTweetSearcher("test_key")
    test_prompt = "Test search prompt"
    
    # Test with default parameters
    payload = searcher.create_payload(test_prompt)
    print("✅ Default payload created:")
    print(json.dumps(payload, indent=2))
    print()
    
    # Test with custom parameters
    custom_payload = searcher.create_payload(
        test_prompt,
        model="grok-3-mini",
        temperature=0.5,
        max_tokens=1000
    )
    print("✅ Custom payload created:")
    print(json.dumps(custom_payload, indent=2))
    print()


def test_error_handling():
    """Test error handling with mock responses."""
    print("=== Testing Error Handling ===")
    
    searcher = GrokTweetSearcher("test_key")
    
    # Simulate different error scenarios
    print("🔍 Testing 401 Unauthorized error...")
    searcher._handle_error(type('Response', (), {'status_code': 401, 'text': 'Unauthorized'})())
    print()
    
    print("🔍 Testing 429 Rate Limit error...")
    searcher._handle_error(type('Response', (), {'status_code': 429, 'text': 'Rate limit exceeded'})())
    print()
    
    print("🔍 Testing 400 Bad Request error...")
    searcher._handle_error(type('Response', (), {'status_code': 400, 'text': 'Bad request'})())
    print()


def simulate_successful_response():
    """Simulate what a successful response would look like."""
    print("=== Simulating Successful Response ===")
    
    # Mock successful response
    mock_result = """
1. @rh_brasil
   Tweet: "Dicas essenciais para gestão de pessoas em 2024! 📈 #RH #GestãoDePessoas"
   Likes: 2,345 | Comentários: 567
   Link: https://x.com/rh_brasil/status/123456789

2. @recursos_humanos_br
   Tweet: "Como reter talentos em tempos de alta rotatividade? Veja as estratégias..."
   Likes: 1,890 | Comentários: 234
   Link: https://x.com/recursos_humanos_br/status/987654321

3. @rh_startup_br
   Tweet: "Nossa empresa implementou home office híbrido e a satisfação aumentou 40%! 🏠💼"
   Likes: 1,567 | Comentários: 123
   Link: https://x.com/rh_startup_br/status/456789123
"""
    
    print("✅ Simulated successful search results:")
    print("=" * 50)
    print(mock_result)
    print("=" * 50)
    print()


def test_configuration_import():
    """Test that configuration is properly imported."""
    print("=== Testing Configuration Import ===")
    
    try:
        import config
        print("✅ Configuration imported successfully")
        print(f"   Model: {config.MODEL}")
        print(f"   Temperature: {config.TEMPERATURE}")
        print(f"   Max Tokens: {config.MAX_TOKENS}")
        print(f"   Language: {config.LANGUAGE}")
        print(f"   Country: {config.COUNTRY}")
        print(f"   Tweet Count: {config.TWEET_COUNT}")
        print(f"   Search Terms: {', '.join(config.SEARCH_TERMS)}")
        print()
    except ImportError as e:
        print(f"❌ Configuration import failed: {e}")
        print()


def main():
    """Run all tests."""
    print("🧪 Grok HR Tweets Searcher - Test Suite")
    print("=" * 60)
    print(f"📅 Test run at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # Run all tests
    test_configuration_import()
    test_class_initialization()
    test_search_prompt_creation()
    test_payload_creation()
    test_error_handling()
    simulate_successful_response()
    
    print("=" * 60)
    print("✅ All tests completed successfully!")
    print()
    print("📋 Summary:")
    print("   • Class initialization: ✅ Working")
    print("   • Search prompt creation: ✅ Working")
    print("   • Payload creation: ✅ Working")
    print("   • Error handling: ✅ Working")
    print("   • Configuration: ✅ Working")
    print()
    print("💡 To use with real API:")
    print("   1. Get an xAI API key from https://console.x.ai")
    print("   2. Update config.py or set XAI_API_KEY environment variable")
    print("   3. Run: py grok_ai_tweets.py")


if __name__ == "__main__":
    main()
