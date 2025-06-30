# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Timber Mountain AI Chatbot project containing synthetic A/B test data and a Jupyter notebook-based chatbot implementation. The project is structured as a research and development initiative for marketing optimization.

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