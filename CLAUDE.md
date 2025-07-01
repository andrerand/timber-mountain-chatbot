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

- **User Interface**: Streamlit-based chatbot website with modern AI assistant design (ChatGPT-style)
- **Development**: Code assistant-accelerated creation from Figma designs
- **Deployment**: Publicly accessible via Streamlit Community Cloud

**Development Workflow:**

- Local development in Visual Studio Code using Jupyter Notebook for scripting and experimentation
- Dedicated Python virtual environment for clean dependency management

## Key Architecture

- **Main Implementation**: `4 - Python Scripts/Timber Mountain AI Chatbot.ipynb` - Jupyter notebook containing the chatbot logic
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

The primary chatbot implementation is in the Jupyter notebook. When working with this project:

1. Activate the virtual environment from `timber_chatbot_env/`
2. Launch Jupyter to work with `Timber Mountain AI Chatbot.ipynb`
3. The chatbot appears to integrate with OpenAI, LangSmith, and Neo4j services

## Data Structure

The project contains synthetic A/B test data organized by:
- Content outlines for different test scenarios (homepage personalization, AI planner features, booking flows, CTA copy, special offers)
- Corresponding results presentations in PDF and PowerPoint formats
- Reference documents from previous optimization tests