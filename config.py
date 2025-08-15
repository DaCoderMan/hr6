"""
Configuration file for Grok AI Tweets Searcher

Modify these settings to customize the behavior of the script.
"""

# API Configuration
API_KEY = "your_xai_api_key_here"  # Replace with your actual API key
MODEL = "grok-3"  # Using grok-3 as requested
TEMPERATURE = 0.7  # Creativity level (0.0 to 1.0)
MAX_TOKENS = 2000  # Maximum tokens for response

# Search Configuration
MIN_FAVES = 10  # Minimum number of likes required
LANGUAGE = "pt"  # Language filter (pt for Portuguese)
COUNTRY = "BR"  # Country filter (BR for Brazil)
TWEET_COUNT = 30  # Number of tweets to retrieve

# Output Configuration
SAVE_TO_FILE = True  # Whether to save results to file
FILE_ENCODING = "utf-8"  # File encoding for saved results

# Search Keywords (customize these for different topics)
SEARCH_TERMS = [
    "RH",
    "recursos humanos",
    "human resources",
    "gestão de pessoas",
    "people management",
    "recrutamento",
    "recruitment",
    "seleção",
    "selection",
    "treinamento",
    "training",
    "desenvolvimento",
    "development"
]

# Advanced Search Filters
ADVANCED_FILTERS = [
    "filter:safe",  # Safe content only
    "-filter:replies",  # Exclude replies
    "-filter:retweets"  # Exclude retweets (optional)
]
