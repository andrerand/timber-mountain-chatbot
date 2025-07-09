# Timber Mountain AI Chatbot

A publicly accessible, proof-of-concept AI chatbot that allows users to ask complex questions about five A/B tests conducted at Timber Mountain.

🤖 **Click Here to View the Prototype:**

https://timber-mountain-chatbot.vercel.app


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
- **Next.js/React UI**: Modern ChatGPT-style interface built from Figma designs
- **TypeScript & Tailwind CSS**: Type-safe development with utility-first styling
- **Vercel Deployment**: Frontend hosted on Vercel for optimal performance
- **Modal Backend**: Serverless Python API deployment
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
├── 4 - Python Scripts/             # Jupyter notebook for data processing
├── backend/                        # Python API service (Modal deployment)
│   ├── agent.py                    # LangGraph agent implementation
│   ├── app.py                      # Main application logic
│   ├── database.py                 # Neo4j connection and vector store
│   └── modal_app.py                # Modal deployment entry point
├── frontend/                       # Next.js web application
│   ├── app/                        # Next.js app directory
│   ├── components/                 # React components
│   └── lib/                        # API client and utilities
├── processed_documents.json        # Extracted and processed data
├── CLAUDE.md                       # AI assistant guidance
└── README.md                       # This file
```

## Technical Stack

**Backend ("The Brain"):**
- **Knowledge Graph**: Neo4j database with hybrid GraphRAG architecture
- **AI Orchestration**: LangChain + LangGraph for agent workflows
- **Language Models**: OpenAI API for natural language processing
- **Monitoring**: LangSmith for tracing, debugging, and evaluation
- **Data Processing**: Jupyter notebook for Excel/PDF content extraction
- **API Deployment**: Modal serverless platform for scalable backend

**Frontend ("The Face"):**
- **UI Framework**: Next.js 15 with React 19 for modern web development
- **Type Safety**: TypeScript for robust, maintainable code
- **Styling**: Tailwind CSS v4 for utility-first design
- **State Management**: React Context API for chat state
- **Design**: Modern ChatGPT-style interface from Figma mockups
- **Deployment**: Vercel for optimized frontend hosting

**Development Environment:**
- **IDE**: Visual Studio Code with Jupyter notebook integration
- **Environment**: Isolated Python virtual environment (`timber_chatbot_env/`)
- **Version Control**: Git with GitHub integration
- **Package Management**: npm for frontend, pip for backend

## Getting Started

### Prerequisites

- Python 3.11+ (for backend)
- Node.js 18+ (for frontend)
- Jupyter Notebook (for data processing)
- API access to OpenAI, LangSmith, and Neo4j

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/andrerand/timber-mountain-chatbot.git
   cd timber-mountain-chatbot
   ```

### Data Processing Setup

1. Activate the Python virtual environment:
   ```bash
   source timber_chatbot_env/bin/activate  # On macOS/Linux
   # or
   timber_chatbot_env\Scripts\activate     # On Windows
   ```

2. Configure API keys:
   - The project uses a `.env` file in the root directory for API keys
   - Required: OpenAI API Key, LangSmith API Key, Neo4j credentials
   - Ensure your `.env` file contains all necessary environment variables

3. Run the data processing notebook:
   ```bash
   jupyter notebook "4 - Python Scripts/Timber Mountain AI Chatbot.ipynb"
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On macOS/Linux
   # or
   venv\Scripts\activate     # On Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables (copy .env.example to .env and fill in values)

5. Deploy to Modal:
   ```bash
   modal deploy modal_app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Access the application at `http://localhost:3000`

5. Deploy to Vercel:
   ```bash
   vercel
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