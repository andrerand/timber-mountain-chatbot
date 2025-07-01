# Timber Mountain AI Chatbot

A publicly accessible, proof-of-concept AI chatbot that allows users to ask complex questions about five A/B tests conducted at Timber Mountain.

## Project Overview

This project creates a sophisticated "digital brain" that transforms A/B test results—currently stored across a metadata spreadsheet and five separate PDF presentations—into a single, intelligent, and interconnected knowledge base.

### Project Goal

Build a publicly accessible chatbot that enables users to explore complex A/B test data through natural language queries, providing insights that would traditionally require manual analysis across multiple documents and datasets.

### Technical Architecture

**Backend Technology (The "Brain"):**
- **Hybrid GraphRAG System**: Combines semantic search and structured graph traversal for highly accurate, context-aware answers
- **Neo4j Knowledge Graph**: Central database enriched with structured Excel data and unstructured PDF content
- **LangChain/LangGraph**: AI orchestration for question understanding, graph querying, and response synthesis
- **LangSmith**: Performance monitoring, tracing, and debugging throughout development

**Frontend & Deployment (The "Face"):**
- **Streamlit UI**: Modern ChatGPT-style interface built from Figma designs
- **Streamlit Community Cloud**: Public deployment for universal access
- **Code Assistant Integration**: Accelerated development workflow

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

**Backend ("The Brain"):**
- **Knowledge Graph**: Neo4j database with hybrid GraphRAG architecture
- **AI Orchestration**: LangChain + LangGraph for agent workflows
- **Language Models**: OpenAI API for natural language processing
- **Monitoring**: LangSmith for tracing, debugging, and evaluation
- **Data Processing**: Python scripts for Excel/PDF content extraction

**Frontend ("The Face"):**
- **UI Framework**: Streamlit for rapid web app development
- **Design**: Modern ChatGPT-style interface from Figma mockups
- **Deployment**: Streamlit Community Cloud for public access

**Development Environment:**
- **IDE**: Visual Studio Code with Jupyter notebook integration
- **Environment**: Isolated Python virtual environment (`timber_chatbot_env/`)
- **Version Control**: Git with GitHub integration

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

All test data is synthetic and created for research purposes. The hybrid GraphRAG system processes:

**Structured Data:**
- A/B test metadata spreadsheet with factual properties (test owners, dates, primary KPIs)
- Reference documents from previous optimization studies

**Unstructured Data:**
- Five comprehensive PDF presentations containing test results and findings
- Content outlines for each test scenario
- PowerPoint presentation files with visual insights

The Neo4j knowledge graph transforms this distributed information into an interconnected, queryable knowledge base.

## Security Note

API keys and credentials are stored locally and excluded from version control. Never commit sensitive authentication information to the repository.

## Contributing

This is a research project. For questions or collaboration opportunities, please open an issue or contact the project maintainer.

## License

This project is for research and educational purposes.