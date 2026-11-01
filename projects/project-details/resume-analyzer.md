# Project Specification: Resume Analyzer

- **Engineer:** Mamidi Nitesh
- **Category:** AI & ML / Backend Systems
- **Status:** Completed / Active Prototype
- **Repository:** https://github.com/nithesh3-code

## 1. Overview
Resume Analyzer is an AI-assisted document parsing and evaluation system built to extract structured candidate information from resumes and evaluate alignment against target software engineering or AI/ML roles.

## 2. Architecture
```text
[Client Interface] ---> [FastAPI REST Endpoint] ---> [Resume Parser] ---> [LLM/NLP Evaluator] ---> [JSON Report]