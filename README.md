# ENV COLLECTOR
#### A lightweight and simple way to handle environment variables for NodeJS.

----


### Installation
```bash
yarn add env-collector
```

### Usage
```typescript
import EnvCollector from 'env-collector';

// Simple use case.
const myEnvVar: string = EnvCollector.collect('MY_VAR').asString();

// Defining a fallback value.
const myEnvVar: string = EnvCollector.collect('ENV')
  .fallbackTo('development')
  .asString();

// Fail if environment variable not set.
const myEnvVar: string = EnvCollector.collect('API_ENDPOINT')
  .orFailWith('Environment variable `API_ENDPOINT` not set!')
  .asString();
  
// Only fail if a certain condition is met.
const myEnvVar: string = EnvCollector.collect('PRODUCTION_SECRET')
  .orFailWith('Environment variable `PRODUCTION_SECRET` not set!'
  .onlyFailIf(isProduction)
  .asString();
```
