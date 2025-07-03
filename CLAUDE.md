# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Timber Mountain AI Chatbot project designed to build a publicly accessible, proof-of-concept AI chatbot that allows users to ask complex questions about a set of five A/B tests conducted at Timber Mountain.

### Project Goal

The core objective is to create a sophisticated "digital brain" that transforms the A/B test results—currently stored across a metadata spreadsheet and five separate PDF presentations—into a single, intelligent, and interconnected knowledge base.

### Technical Architecture

**Backend Technology (The "Brain"):**

- **Approach**: Hybrid GraphRAG system combining semantic search and structured graph traversal for highly accurate, context-aware answers
- **Knowledge Base**: Neo4j graph database serving as the central knowledge graph, enriched by:
  - Structured data from Excel spreadsheet creating factual properties (test owner, dates, primary KPIs) on graph nodes
  - Unstructured text extracted from PDF presentations creating nodes for key findings and recommendations with established relationships
- **AI Orchestration**: Agent powered by LangChain and LangGraph for understanding user questions, querying the Neo4j graph, and synthesizing retrieved information
- **Monitoring**: LangSmith integration for tracing, debugging, and evaluating AI agent performance

**Frontend & Deployment (The "Face"):**

- **User Interface**: Next.js/React-based chatbot website with modern AI assistant design (ChatGPT-style)
- **Technologies**: TypeScript, Tailwind CSS for styling, React Context for state management
- **Development**: Code assistant-accelerated creation from Figma designs
- **Deployment**: Frontend on Vercel, Backend API on Modal (serverless platform)

**Development Workflow:**

- Local development in Visual Studio Code using Jupyter Notebook for scripting and experimentation
- Dedicated Python virtual environment for clean dependency management

## Key Architecture

- **Data Processing**: `4 - Python Scripts/Timber Mountain AI Chatbot.ipynb` - Jupyter notebook for initial data extraction and Neo4j population
- **Backend API**: `backend/` - Python API service with LangChain/LangGraph agent, deployed on Modal
- **Frontend Application**: `frontend/` - Next.js web application with React components, deployed on Vercel
- **Environment**: `timber_chatbot_env/` - Python virtual environment for the project
- **Data Sources**: 
  - `2 - Synthetic Metadata/` - Contains A/B test metadata and reference documents
  - `3 - Synthetic A:B Test Results Decks/` - Content outlines and presentation results
- **Assets**: `1 - Web Design/Images/` - Brand assets and UI elements

## Development Environment

This project uses a Python virtual environment located at `timber_chatbot_env/`. The main development is done in Jupyter notebooks.

### API Keys and Credentials

API keys are stored in `ZZ_API Keys/` directory:
- OpenAI API Key
- LangSmith API Key  
- Neo4j credentials

**Security Note**: API keys are stored in plain text files - these should not be committed to version control.

## Working with the Chatbot

The project has three main components:

### 1. Data Processing (Jupyter Notebook)
- Use `Timber Mountain AI Chatbot.ipynb` for initial data extraction and Neo4j graph population
- Processes PDFs and Excel metadata into the knowledge graph

### 2. Backend Development
- Navigate to `backend/` directory
- Python API with LangChain/LangGraph agent
- Deploy to Modal using `modal deploy modal_app.py`

### 3. Frontend Development
- Navigate to `frontend/` directory
- Install dependencies: `npm install`
- Run development server: `npm run dev`
- Deploy to Vercel using `vercel` CLI or GitHub integration

## Data Structure

The project contains synthetic A/B test data organized by:
- Content outlines for different test scenarios (homepage personalization, AI planner features, booking flows, CTA copy, special offers)
- Corresponding results presentations in PDF and PowerPoint formats
- Reference documents from previous optimization tests