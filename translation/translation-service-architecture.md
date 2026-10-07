# Translation Service — Architecture (Mermaid)

This document visualizes the architecture described in
[translation-service-plan.md](./translation-service-plan.md).

## v1 request pipeline (synchronous)

High-level flow: client request through validation, normalization,
placeholder protection, orchestration, backend translation, output
validation, and response assembly.

```mermaid
flowchart LR
  subgraph Client["Caller (Docs Platform)"]
    C[HTTP Client]
  end

  subgraph API["Translation API"]
    EP["POST /v1/translate"]
  end

  subgraph Core["Core pipeline (stateless)"]
    RV[Request Validator]
    JN[JSON Normalizer]
    PL[Protection Layer]
    TO[Translation Orchestrator]
    OV[Output Validator]
    RB[Response Builder]
  end

  subgraph Backends["Backend adapters (interface)"]
    IF["TranslationBackend.translateBatch()"]
    A1[LLM Adapter A]
    A2[LLM Adapter B]
    A3[MT Adapter C]
  end

  subgraph Obs["Observability"]
    LOG[Logging]
    MET[Metrics]
  end

  C --> EP
  EP --> RV
  RV --> JN
  JN --> PL
  PL --> TO
  TO --> IF
  IF -.-> A1
  IF -.-> A2
  IF -.-> A3
  A1 & A2 & A3 -.-> TO
  TO --> OV
  OV --> RB
  RB --> EP
  EP --> C

  EP -.-> LOG
  TO -.-> LOG
  EP -.-> MET
  TO -.-> MET
```
