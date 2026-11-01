# Architecture Diagram: Voice-First & Multimodal Android AI Assistants

- **Author:** Mamidi Nitesh
- **Systems Covered:** ARCHON & Project Universal

```text
+-------------------------------------------------------------------+
| ANDROID CLIENT LAYER (Kotlin / Java)                              |
|  - Voice Capture & Wake/Trigger Controller                        |
|  - Camera / Document Input Stream (Project Universal)             |
|  - Dynamic Island / Titanium Cyan UI State Renderer (ARCHON)      |
+---------------------------------+---------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
| COMMAND ROUTER & INTENT DISPATCHER                                |
|  ├── Local Device Intent ----> Android System APIs                |
|  └── Multimodal / AI Query --> HTTPS JSON Request                 |
+---------------------------------+---------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
| PYTHON FASTAPI BACKEND & AI ORCHESTRATION LAYER                   |
|  - Pydantic Schema Validation                                     |
|  - Vector Search / RAG Context Retrieval                          |
|  - LLM / Multimodal Model Inference                               |
+-------------------------------------------------------------------+