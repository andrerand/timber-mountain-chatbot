# Timber Mountain AI Chatbot

An AI-powered chatbot designed to analyze A/B test results and provide marketing optimization insights for the Timber Mountain travel platform.

## Project Overview

This research and development project combines synthetic A/B test data with AI analysis capabilities to support data-driven marketing decisions. The chatbot can discuss test methodologies, analyze results, and provide optimization recommendations.

## Key Features

- **A/B Test Analysis**: Analyze 5 comprehensive test scenarios covering homepage personalization, AI planner features, booking flows, CTA optimization, and merchandising
- **AI-Powered Insights**: Natural language interaction for discussing test results and optimization strategies
- **Comprehensive Data**: Complete test documentation including content outlines and presentation-ready results
- **Multi-Platform Integration**: OpenAI, LangSmith, and Neo4j integration for robust AI workflows

## Test Scenarios Included

1. **Homepage Personalization**: Domestic vs. International visitor content optimization
2. **AI Planner Trust & Adoption**: Star ratings impact on user engagement
3. **Unified Booking Flow**: Seamless booking experience optimization
4. **CTA Copy Testing**: "Learn More" vs. "Explore More" engagement analysis
5. **Special Offers Carousel**: Homepage merchandising effectiveness

## Project Structure

```
├── 1 - Web Design/Images/          # Brand assets and UI elements
├── 2 - Synthetic Metadata/         # A/B test metadata and reference docs
├── 3 - Synthetic A:B Test Results/ # Test content outlines and presentations
├── 4 - Python Scripts/             # Main chatbot implementation
└── CLAUDE.md                       # AI assistant guidance
```

## Technical Stack

- **Environment**: Python virtual environment (`timber_chatbot_env/`)
- **Implementation**: Jupyter notebook-based chatbot
- **AI Services**: OpenAI API for natural language processing
- **Workflow Management**: LangSmith for AI pipeline orchestration
- **Data Storage**: Neo4j graph database for relationship mapping

## Getting Started

### Prerequisites

- Python 3.8+
- Jupyter Notebook
- API access to OpenAI, LangSmith, and Neo4j

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/andrerand/timber-mountain-chatbot.git
   cd timber-mountain-chatbot
   ```

2. Set up the virtual environment:
   ```bash
   # Activate the existing virtual environment
   source timber_chatbot_env/bin/activate  # On macOS/Linux
   # or
   timber_chatbot_env\Scripts\activate     # On Windows
   ```

3. Configure API keys:
   - Create your API key files in the `ZZ_API Keys/` directory (excluded from version control)
   - Required: OpenAI API Key, LangSmith API Key, Neo4j credentials

4. Launch Jupyter and open the main notebook:
   ```bash
   jupyter notebook "4 - Python Scripts/Timber Mountain AI Chatbot.ipynb"
   ```

## Usage

The chatbot can help you:
- Analyze A/B test performance data
- Understand test methodologies and statistical significance
- Generate optimization recommendations
- Explore relationships between different test scenarios
- Create presentation-ready insights

## Data Sources

All test data is synthetic and created for research purposes. The datasets include:
- Comprehensive A/B test metadata
- Content outlines for each test scenario
- Results presentations in PDF and PowerPoint formats
- Reference documents from previous optimization studies

## Security Note

API keys and credentials are stored locally and excluded from version control. Never commit sensitive authentication information to the repository.

## Contributing

This is a research project. For questions or collaboration opportunities, please open an issue or contact the project maintainer.

## License

This project is for research and educational purposes.